"use client";

import { useCallback, useEffect, useState } from "react";
import type React from "react";
import styled from "styled-components";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { savedMenusAtom } from "../atoms/savedMenuts.tsx";
import { saveMenuForCurrentUser } from "../firebase/firestoreMenus.ts";
import { getMenusForCurrentUser } from "../firebase/getMenusForCurrentUser.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig.ts.ts";
import { deleteMenu } from "../firebase/deleteMenuForCurrentUser.ts";
import TemplateSelectionModal, { TemplateType } from "./TemplateSelectionModal";
import { ModalWrapper } from "./modal.tsx";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

interface Menu {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  categories: Category[];
  imageUrl?: string;
  templateType?: TemplateType;
}

const TemplatesList: React.FC = () => {
  const [savedMenus, setSavedMenus] = useAtom(savedMenusAtom);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    imageUrl: "https://foodish-api.com/images/pasta/pasta1.jpg",
  });
  const navigate = useNavigate();

  const [user, loading] = useAuthState(auth);

  const fetchMenus = useCallback(async () => {
    try {
      const menus = await getMenusForCurrentUser(user);
      setSavedMenus(menus);
    } catch (error) {
      console.error("Eroare la citirea meniurilor:", error);
    }
  }, [user, setSavedMenus]);

  useEffect(() => {
    if (!loading && user) {
      fetchMenus();
    }
  }, [user, fetchMenus, loading]);

  const handleCreateMenu = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newMenu.name.trim() && user?.uid) {
      setIsCreateModalOpen(false);
      setIsTemplateModalOpen(true);
    }
  };

  const handleTemplateSelect = async (templateType: TemplateType) => {
    const newMenuObj: Menu = {
      id: `menu${Date.now()}${user?.uid}`,
      name: newMenu.name,
      description: newMenu.description,
      lastUpdated: new Date().toISOString().split("T")[0],
      categories: [],
      imageUrl: newMenu.imageUrl,
      templateType: templateType,
    };

    try {
      await saveMenuForCurrentUser(newMenuObj);
      setNewMenu({
        name: "",
        description: "",
        imageUrl: "https://foodish-api.com/images/pasta/pasta1.jpg",
      });

      setIsTemplateModalOpen(false);
      await fetchMenus();
    } catch (error) {
      console.error("Eroare la salvare:", error);
    }
  };

  const handleEditMenu = (menuId: string) => {
    navigate(`/template?menuId=${menuId}`);
  };

  const handleDuplicateMenu = (menuId: string) => {
    const menuToDuplicate = savedMenus.find((menu) => menu.id === menuId);
    if (!menuToDuplicate) return;

    const duplicatedMenu: Menu = {
      ...menuToDuplicate,
      id: `menu${Date.now()}`,
      name: `${menuToDuplicate.name} (Copy)`,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setSavedMenus([...savedMenus, duplicatedMenu]);
  };

  const handleDeleteMenu = async (menuId: string) => {
    if (!user) return;

    const confirmDelete = confirm("Ești sigur că vrei să ștergi acest meniu?");
    if (!confirmDelete) return;

    try {
      await deleteMenu(user.uid, menuId);
      setSavedMenus((prev) => prev.filter((menu) => menu.id !== menuId));
      await fetchMenus();
    } catch (err) {
      console.error("Eroare la ștergerea meniului:", err);
    }
  };

  const getTotalItemCount = (menu: Menu) => {
    return menu.categories.reduce(
      (total, category) => total + category.items.length,
      0
    );
  };

  const handleCheckout = async () => {
    const res = await fetch("http://localhost:4242/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ name: "Pizza Mare", price: 99, quantity: 1 }],
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageContainer>
      <MainContent>
        <PageHeader>
          <PageTitle>Your Menus</PageTitle>
          <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
            <PlusIcon /> Create New Menu
          </Button>

          <Button onClick={handleCheckout}>Plătește cu cardul</Button>
          <button onClick={() => setIsModalOpen(true)}>Deschide Preview</button>

          <ModalWrapper
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
          />
        </PageHeader>

        {savedMenus.length > 0 ? (
          <MenuGrid>
            {savedMenus.map((menu) => (
              <MenuCard key={menu.id}>
                <MenuImage imageUrl={menu.imageUrl}>
                  <MenuItemCount>{getTotalItemCount(menu)} items</MenuItemCount>
                  {menu.templateType && (
                    <MenuType templateType={menu.templateType}>
                      {menu.templateType}
                    </MenuType>
                  )}
                </MenuImage>
                <MenuContent>
                  <MenuName>{menu.name}</MenuName>
                  <MenuDescription>{menu.description}</MenuDescription>
                  <MenuMeta>Last updated: {menu.lastUpdated}</MenuMeta>
                  <MenuActions>
                    <Button onClick={() => handleEditMenu(menu.id)}>
                      <EditIcon /> Edit Menu
                    </Button>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Button onClick={() => handleDuplicateMenu(menu.id)}>
                        <DuplicateIcon />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteMenu(menu.id)}
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </MenuActions>
                </MenuContent>
              </MenuCard>
            ))}
          </MenuGrid>
        ) : (
          <EmptyState>
            <EmptyStateTitle>No menus yet</EmptyStateTitle>
            <EmptyStateDescription>
              Create your first menu to get started. You can add categories and
              items to your menu, then generate a QR code for customers to view
              it.
            </EmptyStateDescription>
            <Button
              variant="primary"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <PlusIcon /> Create New Menu
            </Button>
          </EmptyState>
        )}
      </MainContent>

      {/* Create Menu Modal */}
      {isCreateModalOpen && (
        <Modal>
          <ModalContent>
            <ModalAccent />
            <ModalHeader>
              <ModalTitle>Create New Menu</ModalTitle>
              <CloseButton onClick={() => setIsCreateModalOpen(false)}>
                &times;
              </CloseButton>
            </ModalHeader>
            <Form onSubmit={handleCreateMenu}>
              <FormGroup>
                <Label htmlFor="menuName">Menu Name</Label>
                <Input
                  id="menuName"
                  value={newMenu.name}
                  onChange={(e) =>
                    setNewMenu({ ...newMenu, name: e.target.value })
                  }
                  placeholder="e.g., Dinner Menu, Happy Hour Specials"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="menuDescription">Description (optional)</Label>
                <Textarea
                  id="menuDescription"
                  value={newMenu.description}
                  onChange={(e) =>
                    setNewMenu({ ...newMenu, description: e.target.value })
                  }
                  placeholder="Briefly describe this menu..."
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="menuImage">Image URL</Label>
                <Input
                  id="menuImage"
                  value={newMenu.imageUrl}
                  onChange={(e) =>
                    setNewMenu({ ...newMenu, imageUrl: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
                <ImagePreviewContainer>
                  {newMenu.imageUrl && (
                    <ImagePreview
                      src={newMenu.imageUrl}
                      alt="Menu preview"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://foodish-api.com/images/pasta/pasta1.jpg";
                      }}
                    />
                  )}
                </ImagePreviewContainer>
              </FormGroup>
              <ModalFooter>
                <Button onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Create & Edit
                </Button>
              </ModalFooter>
            </Form>
          </ModalContent>
        </Modal>
      )}

      {/* Template Selection Modal */}
      <TemplateSelectionModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelectTemplate={handleTemplateSelect}
      />
    </PageContainer>
  );
};

export default TemplatesList;

// Styled Components

const PageContainer = styled.div`
  font-family: "DM Sans", sans-serif;
  color: #1a202c;
  background-color: #f7fafc;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10rem 2rem;

  @media (min-width: 768px) {
    width: 85%;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.25rem;
  font-weight: bold;
  color: #a0aec0;
  cursor: pointer;
  transition: color 0.2s;

  position: absolute;
  top: 1.25rem;
  right: 1.25rem;

  &:hover {
    color: #2d3748;
    transform: scale(1.1);
  }
`;

const Button = styled.button<{ variant?: "primary" | "secondary" | "danger" }>`
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  background-color: ${(props) => {
    if (props.variant === "primary") return "#3182ce";
    if (props.variant === "danger") return "#e53e3e";
    return "white";
  }};

  color: ${(props) => {
    if (props.variant === "primary" || props.variant === "danger")
      return "white";
    return "#3182ce";
  }};

  border: ${(props) => {
    if (props.variant === "primary" || props.variant === "danger")
      return "none";
    return "1px solid #3182ce";
  }};

  &:hover {
    background-color: ${(props) => {
      if (props.variant === "primary") return "#2c5282";
      if (props.variant === "danger") return "#c53030";
      return "#edf2f7";
    }};
    transform: translateY(-1px);
  }
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const MenuCard = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const MenuImage = styled.div<{ imageUrl?: string }>`
  height: 160px;
  background-image: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  background-color: #edf2f7;
  position: relative;
`;

const MenuItemCount = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const MenuType = styled.div<{ templateType: TemplateType }>`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: ${(props) => {
    if (props.templateType === "Basic") return "#4299e1";
    if (props.templateType === "Standard") return "#38a169";
    return "#805ad5";
  }};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const MenuContent = styled.div`
  padding: 1.5rem;
`;

const MenuName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const MenuDescription = styled.p`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const MenuMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #a0aec0;
  margin-bottom: 1.5rem;
`;

const MenuActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: white;
  border-radius: 12px;
  border: 2px dashed #e2e8f0;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 1rem;
`;

const EmptyStateDescription = styled.p`
  font-size: 1rem;
  color: #718096;
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 520px;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  animation: modalShow 0.25s ease-out;

  @keyframes modalShow {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  background-color: white;
  color: black;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  background-color: white;
  color: black;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
  }
`;

const ImagePreviewContainer = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #f7fafc;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;
const ModalAccent = styled.div`
  height: 6px;
  border-radius: 6px 6px 0 0;
  background: linear-gradient(90deg, #3182ce, #805ad5);
  margin: -2rem -2rem 1.5rem -2rem;
`;

// Icons (keep all your existing icon components)
const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 3.33334V12.6667"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.33331 8H12.6666"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EditIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 6H5H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DuplicateIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

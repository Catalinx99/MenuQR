"use client";
import { useState, useRef, useEffect } from "react";
import type React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { atom, useAtom } from "jotai";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { savedMenusAtom } from "../atoms/savedMenuts";
import { saveMenuForCurrentUser } from "../firebase/firestoreMenus";
import {
  saveMenuToPublic,
  unpublishMenu,
  getMenuById,
} from "../firebase/getMenuById";
import ModalQr from "./TemplateModals/ModalQr";
import ModalPreview from "./TemplateModals/ModalPreview";
import ModalEditItem from "./TemplateModals/ModalEditItem";
import ModalAddItem from "./TemplateModals/ModalAddItem";
import ModalEditCategory from "./TemplateModals/ModalEditCategory";
import ModalAddCategory from "./TemplateModals/ModalAddCategory";

// Types
type Allergen =
  | "Gluten"
  | "Crustaceans"
  | "Eggs"
  | "Fish"
  | "Peanuts"
  | "Soybeans"
  | "Milk"
  | "Nuts"
  | "Celery"
  | "Mustard"
  | "Sesame"
  | "Sulphites"
  | "Lupin"
  | "Molluscs";

interface MenuItem {
  discountPrice?: number;
  id: string;
  name: string;
  price: number;
  kcal: number;
  description: string;
  allergens: Allergen[];
  image?: string;
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
}

const allAllergensAtom = atom<Allergen[]>([
  "Gluten",
  "Crustaceans",
  "Eggs",
  "Fish",
  "Peanuts",
  "Soybeans",
  "Milk",
  "Nuts",
  "Celery",
  "Mustard",
  "Sesame",
  "Sulphites",
  "Lupin",
  "Molluscs",
]);

// Styled Components

// Component
const TemplatesDragDrop: React.FC = () => {
  const [savedMenus, setSavedMenus] = useAtom(savedMenusAtom);
  const [allAllergens] = useAtom(allAllergensAtom);
  console.log(savedMenus, "savedMenus");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const menuId = searchParams.get("menuId");

  const [currentMenu, setCurrentMenu] = useState<Menu | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("");
  console.log(currentMenu, "currentMenu");

  // Modal states
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);

  // Form states
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");

  const [newItem, setNewItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    price: 0,
    kcal: 0,
    description: "",
    allergens: [],
    image: "/placeholder.svg?height=200&width=200",
  });

  const [editItem, setEditItem] = useState<MenuItem>({
    id: "",
    name: "",
    price: 0,
    kcal: 0,
    description: "",
    allergens: [],
    image: "",
  });
  console.log(newItem, editItem, "newItem");

  // QR Code ref for downloading
  const qrCodeRef = useRef<HTMLDivElement>(null);

  // Load menu data
  useEffect(() => {
    if (menuId) {
      const menu = savedMenus.find((m) => m.id === menuId);
      console.log(menu, "menu");

      if (menu) {
        setCurrentMenu(menu);
        if (menu.categories.length > 0) {
          setActiveCategory(menu.categories[0].id);
        }
      } else {
        // Menu not found, redirect to menu list
        navigate("/menulist");
      }
    }
  }, [menuId, savedMenus, navigate]);

  // Get active category
  const currentCategory = currentMenu?.categories.find(
    (cat) => cat.id === activeCategory
  );

  // Generate a unique menu URL for QR code
  // const menuUrl = `https://qrmenu99.web.app/template?menuId=${
  //   currentMenu?.id || Date.now()
  // }`;
  // const menuUrl = `http://localhost:5173/preview?menuId=${currentMenu?.id}`;
  const menuUrl = `https://qrmenu99.web.app/preview?menuId=${currentMenu?.id}`;
  console.log(menuUrl, "currentMenu");

  // Save menu changes
  // const saveMenuChanges = () => {
  //   if (!currentMenu) return;

  //   setSavedMenus(
  //     savedMenus.map((menu) =>
  //       menu.id === currentMenu.id
  //         ? {
  //             ...currentMenu,
  //             lastUpdated: new Date().toISOString().split("T")[0],
  //           }
  //         : menu
  //     )
  //   );
  // };

  // Handlers
  // const handleAddCategory = () => {
  //   if (newCategoryName.trim() && currentMenu) {
  //     const newCategory: Category = {
  //       id: `cat${Date.now()}`,
  //       name: newCategoryName,
  //       items: [],
  //     };

  //     const updatedMenu = {
  //       ...currentMenu,
  //       categories: [...currentMenu.categories, newCategory],
  //     };

  //     setCurrentMenu(updatedMenu);
  //     setNewCategoryName("");
  //     setIsAddCategoryModalOpen(false);
  //     setActiveCategory(newCategory.id);

  //     // Save changes
  //     setSavedMenus(
  //       savedMenus.map((menu) =>
  //         menu.id === currentMenu.id ? updatedMenu : menu
  //       )
  //     );
  //   }
  // };

  const handleAddCategory = async () => {
    if (newCategoryName.trim() && currentMenu) {
      const newCategory: Category = {
        id: `cat${Date.now()}`,
        name: newCategoryName,
        items: [],
      };

      const updatedMenu = {
        ...currentMenu,
        categories: [...currentMenu.categories, newCategory],
      };

      try {
        await saveMenuForCurrentUser(updatedMenu);
        setCurrentMenu(updatedMenu);
        setNewCategoryName("");
        setIsAddCategoryModalOpen(false);
        setActiveCategory(newCategory.id);
      } catch (error) {
        console.error("Error saving menu:", error);
      }
    }
  };

  const handleEditCategory = async () => {
    if (editCategoryName.trim() && currentMenu) {
      const updatedMenu = {
        ...currentMenu,
        categories: currentMenu.categories.map((cat) =>
          cat.id === editCategoryId ? { ...cat, name: editCategoryName } : cat
        ),
      };

      try {
        await saveMenuForCurrentUser(updatedMenu);
        setCurrentMenu(updatedMenu);
        setEditCategoryName("");
        setEditCategoryId("");
        setIsEditCategoryModalOpen(false);
      } catch (error) {
        console.error("Error saving menu:", error);
      }
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!currentMenu) return;

    if (confirm("Are you sure you want to delete this category?")) {
      const updatedCategories = currentMenu.categories.filter(
        (cat) => cat.id !== categoryId
      );
      const updatedMenu = {
        ...currentMenu,
        categories: updatedCategories,
      };

      try {
        await saveMenuForCurrentUser(updatedMenu);
        setCurrentMenu(updatedMenu);
        if (activeCategory === categoryId) {
          setActiveCategory(updatedCategories[0]?.id || "");
        }
      } catch (error) {
        console.error("Error saving menu:", error);
      }
    }
  };

  const handleAddItem = async () => {
    if (!currentMenu || !newItem.name.trim() || !activeCategory) return;

    const newItemWithId: MenuItem = {
      ...newItem,
      id: `item${Date.now()}`,
    };

    const updatedMenu = {
      ...currentMenu,
      categories: currentMenu.categories.map((cat) =>
        cat.id === activeCategory
          ? { ...cat, items: [...cat.items, newItemWithId] }
          : cat
      ),
    };

    try {
      await saveMenuForCurrentUser(updatedMenu);
      setCurrentMenu(updatedMenu);
      setNewItem({
        name: "",
        price: 0,
        kcal: 0,
        description: "",
        allergens: [],
        image: "/placeholder.svg?height=200&width=200",
      });
      setIsAddItemModalOpen(false);
    } catch (error) {
      console.error("Error saving menu:", error);
    }
  };

  const handleEditItem = async () => {
    if (!currentMenu || !editItem.name.trim() || !activeCategory) return;

    const updatedMenu = {
      ...currentMenu,
      categories: currentMenu.categories.map((cat) =>
        cat.id === activeCategory
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === editItem.id ? editItem : item
              ),
            }
          : cat
      ),
    };

    try {
      await saveMenuForCurrentUser(updatedMenu);
      setCurrentMenu(updatedMenu);
      setEditItem({
        id: "",
        name: "",
        price: 0,
        kcal: 0,
        description: "",
        allergens: [],
        image: "/placeholder.svg?height=200&width=200",
      });
      setIsEditItemModalOpen(false);

      // update local (dacă ai și listă de meniuri salvate)
      setSavedMenus(
        savedMenus.map((menu) =>
          menu.id === currentMenu.id ? updatedMenu : menu
        )
      );
    } catch (error) {
      console.error("Error saving menu:", error);
    }
  };

  const handleDeleteItem = (itemId: string) => {
    console.log(currentMenu, activeCategory, "currentMenu");

    if (!currentMenu || !activeCategory) return;

    if (confirm("Are you sure you want to delete this item?")) {
      const updatedMenu = {
        ...currentMenu,
        categories: currentMenu.categories.map((cat) =>
          cat.id === activeCategory
            ? {
                ...cat,
                items: cat.items.filter((item) => item.id !== itemId),
              }
            : cat
        ),
      };

      setCurrentMenu(updatedMenu);

      // Save changes
      setSavedMenus(
        savedMenus.map((menu) =>
          menu.id === currentMenu.id ? updatedMenu : menu
        )
      );
    }
  };

  const openEditCategoryModal = (category: Category) => {
    setEditCategoryId(category.id);
    setEditCategoryName(category.name);
    setIsEditCategoryModalOpen(true);
  };

  const openEditItemModal = (item: MenuItem) => {
    setEditItem({ ...item });
    setIsEditItemModalOpen(true);
  };

  const handleAllergenChange = (
    allergen: Allergen,
    checked: boolean,
    isEdit: boolean
  ) => {
    if (isEdit) {
      if (checked) {
        setEditItem({
          ...editItem,
          allergens: [...editItem.allergens, allergen],
        });
      } else {
        setEditItem({
          ...editItem,
          allergens: editItem.allergens.filter((a) => a !== allergen),
        });
      }
    } else {
      if (checked) {
        setNewItem({ ...newItem, allergens: [...newItem.allergens, allergen] });
      } else {
        setNewItem({
          ...newItem,
          allergens: newItem.allergens.filter((a) => a !== allergen),
        });
      }
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination || !currentMenu || !currentCategory) return;

    const items = Array.from(currentCategory.items);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedMenu = {
      ...currentMenu,
      categories: currentMenu.categories.map((cat) =>
        cat.id === activeCategory ? { ...cat, items } : cat
      ),
    };

    setCurrentMenu(updatedMenu);

    // Save changes
    setSavedMenus(
      savedMenus.map((menu) =>
        menu.id === currentMenu.id ? updatedMenu : menu
      )
    );
  };

  // Logica pentru Published / Unpublished

  const [isPublished, setIsPublished] = useState(false);
  console.log(isPublished, "isPublished");

  const fetchMenu = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const menu = await getMenuById(menuId);

    if (menu) {
      setIsPublished(true);
    } else {
      setIsPublished(false);
    }
  };

  useEffect(() => {
    if (menuId) {
      fetchMenu();
    }
  }, []);

  // Funcția care comută între publicat și nepublicat
  const handleTogglePublish = async () => {
    try {
      if (isPublished) {
        await unpublishMenu(currentMenu);
        setIsPublished(false);
      } else {
        await saveMenuToPublic(currentMenu);
        setIsPublished(true);
      }
    } catch (error) {
      console.error("Eroare la publicare/nepublicare:", error);
    }
  };

  // Function to download QR code as PNG
  const downloadQRCode = (qrCodeRef) => {
    console.log(qrCodeRef, "qrCodeRef");

    if (!qrCodeRef.current) return;

    const svg = qrCodeRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `menu-qr-code-${
        currentMenu?.id || Date.now()
      }.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    img.crossOrigin = "anonymous";
  };

  // Navigate back to menu list
  const handleBackToMenus = () => {
    navigate("/menulist");
  };

  console.log(savedMenus, "savedMenus");

  if (!currentMenu) {
    return (
      <PageContainer>
        <MainContent>
          <EmptyState>
            <EmptyStateTitle>Loading menu...</EmptyStateTitle>
          </EmptyState>
        </MainContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <MainContent>
        <PageHeader>
          <TitleSection>
            <PageTitle>{currentMenu.name}</PageTitle>
            <PageDescription>{currentMenu.description}</PageDescription>
          </TitleSection>

          <BackButton onClick={handleBackToMenus}>
            <BackIcon /> Back to Menus
          </BackButton>
        </PageHeader>

        <LayoutContainer>
          <Sidebar>
            <SidebarTitle>Categories</SidebarTitle>
            <CategoryList>
              {currentMenu.categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  isActive={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <CategoryName isActive={activeCategory === category.id}>
                    {category.name}
                  </CategoryName>
                  <CategoryItemCount>{category.items.length}</CategoryItemCount>
                </CategoryItem>
              ))}
            </CategoryList>
            <AddCategoryButton onClick={() => setIsAddCategoryModalOpen(true)}>
              <PlusIcon /> Add Category
            </AddCategoryButton>
          </Sidebar>

          <ContentArea>
            <ContentHeader>
              <ContentTitle>
                {currentCategory?.name || "Select a category"}
              </ContentTitle>
              <ContentActions>
                <Button
                  variant={isPublished ? "danger" : "success"}
                  onClick={handleTogglePublish}
                >
                  {isPublished ? "Unpublish" : "Publish"}
                </Button>
                {/* <Button
                  variant="success"
                  onClick={() => saveMenuToPublic(currentMenu)}
                >
                  Publish the menu
                </Button> */}
                {/* <Button onClick={() => setIsPreviewModalOpen(true)}>
                  <EyeIcon /> Preview Menu
                </Button> */}
                <Button onClick={() => setIsQRCodeModalOpen(true)}>
                  <QRCodeIcon /> Generate QR
                </Button>
                {currentCategory && (
                  <>
                    <Button
                      onClick={() => openEditCategoryModal(currentCategory)}
                    >
                      <EditIcon /> Edit Category
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteCategory(currentCategory.id)}
                    >
                      <TrashIcon /> Delete Category
                    </Button>
                  </>
                )}
              </ContentActions>
            </ContentHeader>

            {currentCategory ? (
              <>
                <AddItemButton
                  variant="primary"
                  onClick={() => setIsAddItemModalOpen(true)}
                >
                  <PlusIcon /> Add Menu Item
                </AddItemButton>

                {currentCategory.items.length > 0 ? (
                  <DragDropContainer>
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable droppableId="menu-items">
                        {(provided) => (
                          <DragDropList
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {currentCategory.items.map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <DragItem
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    isDragging={snapshot.isDragging}
                                    style={provided.draggableProps.style}
                                  >
                                    <MenuItemCard>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div {...provided.dragHandleProps}>
                                          <DragHandle>
                                            <DragHandleIcon />
                                          </DragHandle>
                                        </div>
                                        <MenuItemImage imageUrl={item.image} />
                                      </div>
                                      <MenuItemContent>
                                        <MenuItemHeader>
                                          <MenuItemTitle>
                                            {item.name}
                                          </MenuItemTitle>
                                          <MenuItemPrice>
                                            {item.discountPrice ? (
                                              <>
                                                <span
                                                  style={{
                                                    textDecoration:
                                                      "line-through",
                                                    color: "gray",
                                                  }}
                                                >
                                                  ${item.price.toFixed(2)}
                                                </span>{" "}
                                                <span
                                                  style={{
                                                    color: "red",
                                                    fontWeight: "bold",
                                                  }}
                                                >
                                                  $
                                                  {item.discountPrice.toFixed(
                                                    2
                                                  )}
                                                </span>
                                              </>
                                            ) : (
                                              <span>
                                                ${item.price.toFixed(2)}
                                              </span>
                                            )}
                                          </MenuItemPrice>
                                        </MenuItemHeader>
                                        <MenuItemDescription>
                                          {item.description}
                                        </MenuItemDescription>
                                        <MenuItemMeta>
                                          <MenuItemKcal>
                                            <FireIcon /> {item.kcal} kcal
                                          </MenuItemKcal>
                                        </MenuItemMeta>
                                        <MenuItemAllergens>
                                          {item.allergens.map((allergen) => (
                                            <AllergenTag key={allergen}>
                                              {allergen}
                                            </AllergenTag>
                                          ))}
                                        </MenuItemAllergens>
                                        <MenuItemActions>
                                          <Button
                                            onClick={() =>
                                              openEditItemModal(item)
                                            }
                                          >
                                            <EditIcon /> Edit
                                          </Button>
                                          <Button
                                            variant="danger"
                                            onClick={() =>
                                              handleDeleteItem(item.id)
                                            }
                                          >
                                            <TrashIcon />
                                          </Button>
                                        </MenuItemActions>
                                      </MenuItemContent>
                                    </MenuItemCard>
                                  </DragItem>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </DragDropList>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </DragDropContainer>
                ) : (
                  <EmptyState>
                    <EmptyStateTitle>No menu items yet</EmptyStateTitle>
                    <EmptyStateDescription>
                      Add your first menu item to get started
                    </EmptyStateDescription>
                    <Button
                      variant="primary"
                      onClick={() => setIsAddItemModalOpen(true)}
                    >
                      <PlusIcon /> Add Menu Item
                    </Button>
                  </EmptyState>
                )}
              </>
            ) : (
              <EmptyState>
                <EmptyStateTitle>No category selected</EmptyStateTitle>
                <EmptyStateDescription>
                  Select a category from the sidebar or create a new one
                </EmptyStateDescription>
                <Button
                  variant="primary"
                  onClick={() => setIsAddCategoryModalOpen(true)}
                >
                  <PlusIcon /> Add Category
                </Button>
              </EmptyState>
            )}
          </ContentArea>
        </LayoutContainer>
      </MainContent>

      {/* Add Category Modal */}
      {isAddCategoryModalOpen && (
        <ModalAddCategory
          setIsAddCategoryModalOpen={setIsAddCategoryModalOpen}
          handleAddCategory={handleAddCategory}
          newCategoryName={newCategoryName}
          setNewCategoryName={setNewCategoryName}
        />
      )}

      {/* Edit Category Modal */}
      {isEditCategoryModalOpen && (
        <ModalEditCategory
          setIsEditCategoryModalOpen={setIsEditCategoryModalOpen}
          handleEditCategory={handleEditCategory}
          editCategoryName={editCategoryName}
          setEditCategoryName={setEditCategoryName}
        />
      )}

      {isAddItemModalOpen && (
        <ModalAddItem
          setIsAddItemModalOpen={setIsAddItemModalOpen}
          handleAddItem={handleAddItem}
          setNewItem={setNewItem}
          newItem={newItem}
          allAllergens={allAllergens}
          handleAllergenChange={handleAllergenChange}
        />
      )}

      {isEditItemModalOpen && (
        <ModalEditItem
          setEditItem={setEditItem}
          editItem={editItem}
          setIsEditItemModalOpen={setIsEditItemModalOpen}
          handleEditItem={handleEditItem}
          allAllergens={allAllergens}
          handleAllergenChange={handleAllergenChange}
        />
      )}

      {isPreviewModalOpen && (
        <ModalPreview
          currentMenu={currentMenu}
          setIsPreviewModalOpen={setIsPreviewModalOpen}
        />
      )}

      {isQRCodeModalOpen && (
        <ModalQr
          menuUrl={menuUrl}
          setIsQRCodeModalOpen={setIsQRCodeModalOpen}
          downloadQRCode={downloadQRCode}
        />
      )}
    </PageContainer>
  );
};

export default TemplatesDragDrop;

export const PageContainer = styled.div`
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
  max-width: 1600px;
  margin: 0 auto;
  padding: 10rem 0rem;
  width: 85%;
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
  margin-bottom: 0.5rem;
  color: #2d3748;
`;

const PageDescription = styled.p`
  font-size: 1rem;
  color: #718096;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4a5568;
  background-color: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #edf2f7;
  }
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
`;

// const LayoutContainer = styled.div`
//   display: grid;
//   grid-template-columns: 300px 1fr;
//   gap: 2rem;
//   width: 100%;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;
const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  width: 100%;

  @media (max-width: 1024px) {
    gap: 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// const Sidebar = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   padding: 1.5rem;
//   height: fit-content;
// `;
const Sidebar = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  height: fit-content;

  @media (max-width: 768px) {
    position: static;
    width: 100%;
    margin-bottom: 1rem;
  }
`;

const SidebarTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CategoryItem = styled.div<{ isActive: boolean; isDragging?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) => {
    if (props.isDragging) return "#edf2f7";
    return props.isActive ? "#edf2f7" : "transparent";
  }};
  border-left: 3px solid
    ${(props) => (props.isActive ? "#3182ce" : "transparent")};

  &:hover {
    background-color: #edf2f7;
  }
`;

const CategoryName = styled.div<{ isActive?: boolean }>`
  font-weight: ${(props) => (props.isActive ? "600" : "500")};
  color: #2d3748;
`;

const CategoryItemCount = styled.div`
  font-size: 0.75rem;
  color: #718096;
  background-color: #edf2f7;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
`;

const AddCategoryButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #3182ce;
  background-color: white;
  border: 1px dashed #3182ce;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;

  &:hover {
    background-color: #edf2f7;
  }
`;

// const ContentArea = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   padding: 1.5rem;
// `;
const ContentArea = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
  }
`;

const ContentTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
`;

// const ContentActions = styled.div`
//   display: flex;
//   gap: 0.75rem;
// `;
const ContentActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    button {
      flex: 1;
      min-width: 120px;
    }
  }
`;

const Button = styled.button<{
  variant?: "primary" | "secondary" | "danger" | "success";
}>`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
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
    if (props.variant === "success") return "#38a169";
    return "white";
  }};

  color: ${(props) => {
    if (
      props.variant === "primary" ||
      props.variant === "danger" ||
      props.variant === "success"
    )
      return "white";
    return "#3182ce";
  }};

  border: ${(props) => {
    if (
      props.variant === "primary" ||
      props.variant === "danger" ||
      props.variant === "success"
    )
      return "none";
    return "1px solid #3182ce";
  }};

  &:hover {
    background-color: ${(props) => {
      if (props.variant === "primary") return "#2c5282";
      if (props.variant === "danger") return "#c53030";
      if (props.variant === "success") return "#2f855a";
      return "#edf2f7";
    }};
  }
`;

const DragDropContainer = styled.div`
  margin-bottom: 2rem;
`;

const DragDropList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MenuItemActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const DragItem = styled.div<{ isDragging: boolean }>`
  background-color: white;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.isDragging ? "#3182ce" : "#e2e8f0")};
  box-shadow: ${(props) =>
    props.isDragging ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "none"};
  padding: 1rem;
  transition: box-shadow 0.2s, border-color 0.2s;

  @media (max-width: 480px) {
    padding: 0.5rem;

    ${MenuItemActions} {
      /* flex-direction: column; */
      button {
        width: 100%;
      }
    }
  }
`;

const DragHandle = styled.div`
  cursor: grab;
  color: #a0aec0;
  margin-right: 0.75rem;

  &:active {
    cursor: grabbing;
  }
`;

// const MenuItemImage = styled.div<{ imageUrl?: string }>`
//   width: 100px;
//   height: 100px;
//   border-radius: 8px;
//   background-image: ${(props) =>
//     props.imageUrl ? `url(${props.imageUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   margin-right: 1rem;
//   flex-shrink: 0;
//   border: 1px solid #e2e8f0;
// `;

// const MenuItemCard = styled.div`
//   display: flex;
//   align-items: flex-start;
// `;
const MenuItemCard = styled.div`
  display: flex;
  align-items: flex-start;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const MenuItemImage = styled.div<{ imageUrl?: string }>`
  width: 150px;
  height: 150px;
  background-image: ${({ imageUrl }) =>
    imageUrl ? `url(${imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin-right: 15px;

  @media (max-width: 480px) {
    width: 300px;
    height: 150px;
    margin-bottom: 1rem;
  }
`;

const MenuItemContent = styled.div`
  flex: 1;

  @media (max-width: 480px) {
    width: 300px;
    height: 150px;
    margin-bottom: 1rem;
    margin-left: 28px;
  }
`;

const MenuItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const MenuItemTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

const MenuItemPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #3182ce;
`;

const MenuItemDescription = styled.p`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.75rem;
  line-height: 1.5;
`;

const MenuItemMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #718096;
  margin-bottom: 0.75rem;
`;

const MenuItemKcal = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const MenuItemAllergens = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

export const AllergenTag = styled.span`
  font-size: 0.75rem;
  background-color: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const AddItemButton = styled(Button)`
  margin-bottom: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f7fafc;
  border-radius: 8px;
  border: 2px dashed #e2e8f0;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
`;

const EmptyStateDescription = styled.p`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 1.5rem;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #718096;

  &:hover {
    color: #2d3748;
  }
`;

// Icons
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

const FireIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C10.4178 3.55566 9.52335 5.53191 9.5 7.6C9.5 9.56975 10.1 10.3 11 11.5C9.36207 11.9528 7.91552 12.8642 6.82602 14.1212C5.73652 15.3782 5.05448 16.9255 4.86 18.57C6.11174 20.3562 8.01642 21.6565 10.2137 22.2526C12.411 22.8487 14.7569 22.7044 16.8563 21.8493C18.9556 20.9943 20.6567 19.4815 21.6694 17.5433C22.6822 15.6051 22.9412 13.3716 22.4 11.25C21.9065 9.01797 20.5635 7.05445 18.6666 5.75C18.3323 7.35511 17.3406 8.76484 15.9502 9.69387C14.5599 10.6229 12.8749 11.0022 11.2 10.75C12.9546 9.47192 13.9991 7.47584 14 5.33C13.9964 4.15487 13.6331 3.00848 12.95 2C12.6275 2.02426 12.3093 2.09205 12 2.2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DragHandleIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5V5.01M12 12V12.01M12 19V19.01M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13ZM12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// const EyeIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

const QRCodeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 3H9V9H3V3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 3H21V9H15V3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 15H9V21H3V15Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 15H21V21H15V15Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 10L12 15L17 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15V3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BackIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 12H5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 19L5 12L12 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// "use client";
// import { useState, useRef, useEffect } from "react";
// import type React from "react";
// import styled from "styled-components";
// import { atom, useAtom } from "jotai";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import { QRCodeSVG } from "qrcode.react";

// // Types
// type TemplateType = "basic" | "standard" | "advanced";

// type Allergen =
//   | "Gluten"
//   | "Crustaceans"
//   | "Eggs"
//   | "Fish"
//   | "Peanuts"
//   | "Soybeans"
//   | "Milk"
//   | "Nuts"
//   | "Celery"
//   | "Mustard"
//   | "Sesame"
//   | "Sulphites"
//   | "Lupin"
//   | "Molluscs";

// interface MenuItem {
//   id: string;
//   name: string;
//   price: number;
//   kcal: number;
//   description: string;
//   allergens: Allergen[];
//   image?: string;
// }

// interface Category {
//   id: string;
//   name: string;
//   items: MenuItem[];
//   image?: string;
// }

// interface Menu {
//   id: string;
//   name: string;
//   description: string;
//   lastUpdated: string;
//   categories: Category[];
//   imageUrl?: string;
//   templateType: TemplateType;
// }

// // Jotai atoms
// const savedMenusAtom = atom<Menu[]>([
//   {
//     id: "menu1",
//     name: "Main Restaurant Menu",
//     description: "Our complete food and beverage offerings",
//     lastUpdated: "2023-11-15",
//     templateType: "advanced",
//     categories: [
//       {
//         id: "cat1",
//         name: "Pizza",
//         image: "/placeholder.svg?height=300&width=800",
//         items: [
//           {
//             id: "item1",
//             name: "Margherita",
//             price: 9.99,
//             kcal: 850,
//             description:
//               "Classic pizza with tomato sauce, mozzarella, and basil",
//             allergens: ["Gluten", "Milk"],
//             image: "/placeholder.svg?height=200&width=200",
//           },
//           {
//             id: "item2",
//             name: "Pepperoni",
//             price: 11.99,
//             kcal: 1050,
//             description: "Pizza with tomato sauce, mozzarella, and pepperoni",
//             allergens: ["Gluten", "Milk"],
//             image: "/placeholder.svg?height=200&width=200",
//           },
//         ],
//       },
//       {
//         id: "cat2",
//         name: "Burgers",
//         image: "/placeholder.svg?height=300&width=800",
//         items: [
//           {
//             id: "item3",
//             name: "Classic Burger",
//             price: 8.99,
//             kcal: 750,
//             description: "Beef patty with lettuce, tomato, and special sauce",
//             allergens: ["Gluten", "Eggs", "Milk"],
//             image: "/placeholder.svg?height=200&width=200",
//           },
//         ],
//       },
//     ],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: "menu2",
//     name: "Happy Hour Menu",
//     description: "Special discounted items available from 4-7pm",
//     lastUpdated: "2023-11-10",
//     templateType: "standard",
//     categories: [
//       {
//         id: "cat3",
//         name: "Drinks",
//         items: [
//           {
//             id: "item4",
//             name: "House Wine",
//             price: 5.99,
//             kcal: 120,
//             description: "Red or white house wine",
//             allergens: ["Sulphites"],
//             image: "/placeholder.svg?height=200&width=200",
//           },
//         ],
//       },
//     ],
//     imageUrl: "/placeholder.svg?height=200&width=300",
//   },
//   {
//     id: "menu3",
//     name: "Breakfast Menu",
//     description: "Morning offerings available until 11am",
//     lastUpdated: "2023-11-05",
//     templateType: "basic",
//     categories: [
//       {
//         id: "cat4",
//         name: "Eggs",
//         items: [
//           {
//             id: "item5",
//             name: "Eggs Benedict",
//             price: 12.99,
//             kcal: 650,
//             description:
//               "English muffin topped with poached eggs, ham and hollandaise sauce",
//             allergens: ["Eggs", "Gluten", "Milk"],
//           },
//         ],
//       },
//     ],
//   },
// ]);

// const allAllergensAtom = atom<Allergen[]>([
//   "Gluten",
//   "Crustaceans",
//   "Eggs",
//   "Fish",
//   "Peanuts",
//   "Soybeans",
//   "Milk",
//   "Nuts",
//   "Celery",
//   "Mustard",
//   "Sesame",
//   "Sulphites",
//   "Lupin",
//   "Molluscs",
// ]);

// // Styled Components
// const PageContainer = styled.div`
//   font-family: "DM Sans", sans-serif;
//   color: #1a202c;
//   background-color: #f7fafc;
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
// `;

// const HeaderWrapper = styled.header`
//   background-color: #ffffff;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
// `;

// const HeaderContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1.25rem 2rem;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const Logo = styled.div`
//   font-size: 1.5rem;
//   font-weight: 700;
//   display: flex;
//   align-items: center;
//   cursor: pointer;

//   span {
//     color: #3182ce;
//     margin-left: 0.25rem;
//   }
// `;

// const LogoIcon = styled.div`
//   width: 24px;
//   height: 24px;
//   background-color: #3182ce;
//   border-radius: 6px;
//   margin-right: 0.5rem;
//   position: relative;

//   &::before {
//     content: "";
//     position: absolute;
//     top: 6px;
//     left: 6px;
//     width: 12px;
//     height: 12px;
//     border-radius: 3px;
//     background-color: white;
//   }
// `;

// const MainContent = styled.main`
//   flex: 1;
//   max-width: 1600px;
//   margin: 0 auto;
//   padding: 2rem;
//   width: 100%;

//   @media (max-width: 768px) {
//     padding: 1.5rem;
//   }

//   @media (max-width: 480px) {
//     padding: 1rem;
//   }
// `;

// const PageHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 2rem;

//   @media (max-width: 640px) {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 1rem;
//   }
// `;

// const PageTitle = styled.h1`
//   font-size: 2rem;
//   font-weight: 700;
//   margin-bottom: 0.5rem;
//   color: #2d3748;
// `;

// const PageDescription = styled.p`
//   font-size: 1rem;
//   color: #718096;
//   margin-bottom: 2rem;
// `;

// const TemplateTag = styled.span<{ templateType: TemplateType }>`
//   display: inline-block;
//   padding: 0.25rem 0.75rem;
//   border-radius: 9999px;
//   font-size: 0.75rem;
//   font-weight: 600;
//   margin-left: 0.75rem;
//   background-color: ${(props) => {
//     if (props.templateType === "basic") return "#4299e1";
//     if (props.templateType === "standard") return "#38a169";
//     return "#805ad5";
//   }};
//   color: white;
//   text-transform: capitalize;
// `;

// const BackButton = styled.button`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.5rem 1rem;
//   font-size: 0.875rem;
//   font-weight: 600;
//   color: #4a5568;
//   background-color: transparent;
//   border: 1px solid #e2e8f0;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: all 0.2s;

//   &:hover {
//     background-color: #edf2f7;
//   }
// `;

// const TitleSection = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const TitleRow = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const LayoutContainer = styled.div`
//   display: grid;
//   grid-template-columns: 300px 1fr;
//   gap: 2rem;
//   width: 100%;

//   @media (max-width: 1024px) {
//     grid-template-columns: 250px 1fr;
//     gap: 1.5rem;
//   }

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//     gap: 1.5rem;
//   }
// `;

// const Sidebar = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   padding: 1.5rem;
//   height: fit-content;
// `;

// const SidebarTitle = styled.h2`
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: #2d3748;
//   margin-bottom: 1.5rem;
// `;

// const CategoryList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const CategoryItem = styled.div<{ isActive: boolean; isDragging?: boolean }>`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0.75rem 1rem;
//   border-radius: 6px;
//   cursor: pointer;
//   background-color: ${(props) => {
//     if (props.isDragging) return "#edf2f7";
//     return props.isActive ? "#edf2f7" : "transparent";
//   }};
//   border-left: 3px solid
//     ${(props) => (props.isActive ? "#3182ce" : "transparent")};

//   &:hover {
//     background-color: #edf2f7;
//   }
// `;

// const CategoryName = styled.div<{ isActive?: boolean }>`
//   font-weight: ${(props) => (props.isActive ? "600" : "500")};
//   color: #2d3748;
// `;

// const CategoryItemCount = styled.div`
//   font-size: 0.75rem;
//   color: #718096;
//   background-color: #edf2f7;
//   padding: 0.25rem 0.5rem;
//   border-radius: 9999px;
// `;

// const AddCategoryButton = styled.button`
//   width: 100%;
//   padding: 0.75rem 1rem;
//   font-size: 0.95rem;
//   font-weight: 600;
//   color: #3182ce;
//   background-color: white;
//   border: 1px dashed #3182ce;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: all 0.2s;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;
//   margin-top: 1rem;

//   &:hover {
//     background-color: #edf2f7;
//   }
// `;

// const ContentArea = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   padding: 1.5rem;
// `;

// const ContentHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 2rem;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 1rem;
//   }
// `;

// const ContentTitle = styled.h2`
//   font-size: 1.5rem;
//   font-weight: 600;
//   color: #2d3748;
// `;

// const ContentActions = styled.div`
//   display: flex;
//   gap: 0.75rem;
//   flex-wrap: wrap;

//   @media (max-width: 480px) {
//     width: 100%;
//     justify-content: space-between;
//   }
// `;

// const Button = styled.button<{ variant?: "primary" | "secondary" | "danger" }>`
//   padding: 0.5rem 1rem;
//   font-size: 0.875rem;
//   font-weight: 600;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: all 0.2s;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;

//   background-color: ${(props) => {
//     if (props.variant === "primary") return "#3182ce";
//     if (props.variant === "danger") return "#e53e3e";
//     return "white";
//   }};

//   color: ${(props) => {
//     if (props.variant === "primary" || props.variant === "danger")
//       return "white";
//     return "#3182ce";
//   }};

//   border: ${(props) => {
//     if (props.variant === "primary" || props.variant === "danger")
//       return "none";
//     return "1px solid #3182ce";
//   }};

//   &:hover {
//     background-color: ${(props) => {
//       if (props.variant === "primary") return "#2c5282";
//       if (props.variant === "danger") return "#c53030";
//       return "#edf2f7";
//     }};
//   }
// `;

// const DragDropContainer = styled.div`
//   margin-bottom: 2rem;
// `;

// const DragDropList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

// const DragItem = styled.div<{ isDragging: boolean }>`
//   background-color: white;
//   border-radius: 8px;
//   border: 1px solid ${(props) => (props.isDragging ? "#3182ce" : "#e2e8f0")};
//   box-shadow: ${(props) =>
//     props.isDragging ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "none"};
//   padding: 1rem;
//   transition: box-shadow 0.2s, border-color 0.2s;
// `;

// const DragHandle = styled.div`
//   cursor: grab;
//   color: #a0aec0;
//   margin-right: 0.75rem;
//   padding: 0.5rem;

//   &:active {
//     cursor: grabbing;
//   }

//   @media (max-width: 768px) {
//     padding: 0.75rem;
//   }
// `;

// const MenuItemImage = styled.div<{ imageUrl?: string; showImage: boolean }>`
//   width: 100px;
//   height: 100px;
//   border-radius: 8px;
//   background-image: ${(props) =>
//     props.showImage && props.imageUrl ? `url(${props.imageUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   margin-right: 1rem;
//   flex-shrink: 0;
//   border: 1px solid #e2e8f0;
//   display: ${(props) => (props.showImage ? "block" : "none")};

//   @media (max-width: 640px) {
//     width: 100%;
//     height: 150px;
//     margin-right: 0;
//     margin-bottom: 1rem;
//   }
// `;

// const CategoryImageContainer = styled.div<{ showImage: boolean }>`
//   width: 100%;
//   height: 200px;
//   border-radius: 8px;
//   background-color: #f7fafc;
//   margin-bottom: 1.5rem;
//   overflow: hidden;
//   display: ${(props) => (props.showImage ? "block" : "none")};
// `;

// const CategoryImage = styled.div<{ imageUrl?: string }>`
//   width: 100%;
//   height: 100%;
//   background-image: ${(props) =>
//     props.imageUrl ? `url(${props.imageUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   border: 1px solid #e2e8f0;
// `;

// const MenuItemCard = styled.div`
//   display: flex;
//   align-items: flex-start;

//   @media (max-width: 640px) {
//     flex-direction: column;
//   }
// `;

// const MenuItemContent = styled.div`
//   flex: 1;
// `;

// const MenuItemHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   margin-bottom: 0.5rem;

//   @media (max-width: 480px) {
//     flex-direction: column;
//     gap: 0.5rem;
//   }
// `;

// const MenuItemTitle = styled.h3`
//   font-size: 1.1rem;
//   font-weight: 600;
//   color: #2d3748;
//   margin: 0;
// `;

// const MenuItemPrice = styled.div`
//   font-size: 1.1rem;
//   font-weight: 700;
//   color: #3182ce;
// `;

// const MenuItemDescription = styled.p`
//   font-size: 0.875rem;
//   color: #718096;
//   margin-bottom: 0.75rem;
//   line-height: 1.5;
// `;

// const MenuItemMeta = styled.div`
//   display: flex;
//   justify-content: space-between;
//   font-size: 0.75rem;
//   color: #718096;
//   margin-bottom: 0.75rem;
// `;

// const MenuItemKcal = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.25rem;
// `;

// const MenuItemAllergens = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.5rem;
//   margin-bottom: 0.75rem;
// `;

// const AllergenTag = styled.span`
//   font-size: 0.75rem;
//   background-color: #edf2f7;
//   color: #4a5568;
//   padding: 0.25rem 0.5rem;
//   border-radius: 4px;
// `;

// const MenuItemActions = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 0.5rem;
// `;

// const AddItemButton = styled(Button)`
//   margin-bottom: 1rem;
// `;

// const EmptyState = styled.div`
//   text-align: center;
//   padding: 3rem;
//   background-color: #f7fafc;
//   border-radius: 8px;
//   border: 2px dashed #e2e8f0;
// `;

// const EmptyStateTitle = styled.h3`
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: #4a5568;
//   margin-bottom: 0.5rem;
// `;

// const EmptyStateDescription = styled.p`
//   font-size: 0.875rem;
//   color: #718096;
//   margin-bottom: 1.5rem;
// `;

// const Modal = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 50;
// `;

// const ModalContent = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   padding: 2rem;
//   width: 100%;
//   max-width: 500px;
//   max-height: 90vh;
//   overflow-y: auto;
//   margin: 0 1rem;

//   @media (max-width: 640px) {
//     padding: 1.5rem;
//   }

//   @media (max-width: 480px) {
//     padding: 1rem;
//   }
// `;

// const ModalHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1.5rem;
// `;

// const ModalTitle = styled.h3`
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: #2d3748;
// `;

// const CloseButton = styled.button`
//   background: none;
//   border: none;
//   font-size: 1.5rem;
//   cursor: pointer;
//   color: #718096;

//   &:hover {
//     color: #2d3748;
//   }
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const Label = styled.label`
//   font-size: 0.875rem;
//   font-weight: 500;
//   color: #4a5568;
// `;

// const Input = styled.input`
//   padding: 0.75rem 1rem;
//   border: 1px solid #e2e8f0;
//   border-radius: 6px;
//   font-size: 1rem;
//   transition: all 0.2s;

//   &:focus {
//     outline: none;
//     border-color: #3182ce;
//     box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
//   }
// `;

// const Textarea = styled.textarea`
//   padding: 0.75rem 1rem;
//   border: 1px solid #e2e8f0;
//   border-radius: 6px;
//   font-size: 1rem;
//   transition: all 0.2s;
//   min-height: 100px;
//   resize: vertical;

//   &:focus {
//     outline: none;
//     border-color: #3182ce;
//     box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
//   }
// `;

// const CheckboxGroup = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
//   gap: 0.5rem;

//   @media (max-width: 480px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
// `;

// const CheckboxLabel = styled.label`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   font-size: 0.875rem;
//   color: #4a5568;
//   cursor: pointer;
// `;

// const Checkbox = styled.input`
//   width: 1rem;
//   height: 1rem;
//   cursor: pointer;
//   accent-color: #3182ce;
// `;

// const ModalFooter = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 1rem;
//   margin-top: 2rem;
// `;

// const DragDropPlaceholder = styled.div`
//   border: 2px dashed #e2e8f0;
//   border-radius: 8px;
//   padding: 1rem;
//   background-color: #f7fafc;
//   text-align: center;
//   color: #a0aec0;
//   margin-bottom: 1rem;
// `;

// const PreviewModal = styled(Modal)`
//   z-index: 60;
// `;

// const PreviewContent = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   width: 90%;
//   max-width: 1200px;
//   max-height: 90vh;
//   overflow-y: auto;
//   display: flex;
//   flex-direction: column;
//   margin: 0 1rem;
// `;

// const PreviewHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1.5rem;
//   border-bottom: 1px solid #e2e8f0;
//   position: sticky;
//   top: 0;
//   background-color: white;
//   z-index: 10;
// `;

// const PreviewTitle = styled.h2`
//   font-size: 1.5rem;
//   font-weight: 600;
//   color: #2d3748;
// `;

// const PreviewBody = styled.div`
//   padding: 1.5rem;
//   flex: 1;
// `;

// const PreviewCategory = styled.div`
//   margin-bottom: 2rem;
// `;

// const PreviewCategoryTitle = styled.h3`
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: #2d3748;
//   margin-bottom: 1rem;
//   padding-bottom: 0.5rem;
//   border-bottom: 2px solid #3182ce;
// `;

// const PreviewCategoryImage = styled.div<{
//   imageUrl?: string;
//   showImage: boolean;
// }>`
//   width: 100%;
//   height: 200px;
//   background-image: ${(props) =>
//     props.showImage && props.imageUrl ? `url(${props.imageUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   border-radius: 8px;
//   margin-bottom: 1.5rem;
//   display: ${(props) => (props.showImage ? "block" : "none")};
// `;

// const PreviewItems = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 1.5rem;

//   @media (max-width: 640px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const PreviewItem = styled.div`
//   display: flex;
//   background-color: white;
//   border-radius: 8px;
//   border: 1px solid #e2e8f0;
//   overflow: hidden;
//   transition: transform 0.2s, box-shadow 0.2s;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//   }

//   @media (max-width: 480px) {
//     flex-direction: column;
//   }
// `;

// const PreviewItemImage = styled.div<{ imageUrl?: string; showImage: boolean }>`
//   width: 100px;
//   height: 100px;
//   background-image: ${(props) =>
//     props.showImage && props.imageUrl ? `url(${props.imageUrl})` : "none"};
//   background-size: cover;
//   background-position: center;
//   flex-shrink: 0;
//   display: ${(props) => (props.showImage ? "block" : "none")};

//   @media (max-width: 480px) {
//     width: 100%;
//     height: 150px;
//   }
// `;

// const PreviewItemContent = styled.div`
//   padding: 1rem;
//   flex: 1;
// `;

// const PreviewItemHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: flex-start;
//   margin-bottom: 0.5rem;
// `;

// const PreviewItemTitle = styled.h4`
//   font-size: 1rem;
//   font-weight: 600;
//   color: #2d3748;
//   margin: 0;
// `;

// const PreviewItemPrice = styled.div`
//   font-size: 1rem;
//   font-weight: 700;
//   color: #3182ce;
// `;

// const PreviewItemDescription = styled.p`
//   font-size: 0.875rem;
//   color: #718096;
//   margin-bottom: 0.5rem;
//   line-height: 1.4;
// `;

// const PreviewItemMeta = styled.div`
//   display: flex;
//   justify-content: space-between;
//   font-size: 0.75rem;
//   color: #718096;
// `;

// const PreviewItemAllergens = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.25rem;
// `;

// const QRCodeModal = styled(Modal)`
//   z-index: 60;
// `;

// const QRCodeContent = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   padding: 2rem;
//   width: 100%;
//   max-width: 400px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const QRCodeContainer = styled.div`
//   margin: 2rem 0;
//   padding: 1rem;
//   background-color: white;
//   border-radius: 8px;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
// `;

// const QRCodeDescription = styled.p`
//   text-align: center;
//   margin-bottom: 1.5rem;
//   color: #4a5568;
// `;

// const QRCodeActions = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-top: 1.5rem;
// `;

// // Icons
// const PlusIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 16 16"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M8 3.33334V12.6667"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M3.33331 8H12.6666"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const EditIcon = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const TrashIcon = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M3 6H5H21"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const FireIcon = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M12 2C10.4178 3.55566 9.52335 5.53191 9.5 7.6C9.5 9.56975 10.1 10.3 11 11.5C9.36207 11.9528 7.91552 12.8642 6.82602 14.1212C5.73652 15.3782 5.05448 16.9255 4.86 18.57C6.11174 20.3562 8.01642 21.6565 10.2137 22.2526C12.411 22.8487 14.7569 22.7044 16.8563 21.8493C18.9556 20.9943 20.6567 19.4815 21.6694 17.5433C22.6822 15.6051 22.9412 13.3716 22.4 11.25C21.9065 9.01797 20.5635 7.05445 18.6666 5.75C18.3323 7.35511 17.3406 8.76484 15.9502 9.69387C14.5599 10.6229 12.8749 11.0022 11.2 10.75C12.9546 9.47192 13.9991 7.47584 14 5.33C13.9964 4.15487 13.6331 3.00848 12.95 2C12.6275 2.02426 12.3093 2.09205 12 2.2"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const DragHandleIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M12 5V5.01M12 12V12.01M12 19V19.01M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13ZM12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const EyeIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const QRCodeIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M3 3H9V9H3V3Z"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M15 3H21V9H15V3Z"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M3 15H9V21H3V15Z"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M15 15H21V21H15V15Z"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const DownloadIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M7 10L12 15L17 10"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M12 15V3"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const BackIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M19 12H5"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M12 19L5 12L12 5"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// // Component
// const TemplatesDragDrop: React.FC = () => {
//   const [savedMenus, setSavedMenus] = useAtom(savedMenusAtom);
//   const [allAllergens] = useAtom(allAllergensAtom);

//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const menuId = searchParams.get("menuId");

//   // Add this check to redirect if no menuId is provided
//   useEffect(() => {
//     if (!menuId) {
//       navigate("/templates-list");
//     }
//   }, [menuId, navigate]);

//   const [currentMenu, setCurrentMenu] = useState<Menu | null>(null);
//   const [activeCategory, setActiveCategory] = useState<string>("");

//   // Modal states
//   const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
//   const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
//   const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
//   const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
//   const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
//   const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);

//   // Form states
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [newCategoryImage, setNewCategoryImage] = useState("");
//   const [editCategoryName, setEditCategoryName] = useState("");
//   const [editCategoryImage, setEditCategoryImage] = useState("");
//   const [editCategoryId, setEditCategoryId] = useState("");

//   const [newItem, setNewItem] = useState<Omit<MenuItem, "id">>({
//     name: "",
//     price: 0,
//     kcal: 0,
//     description: "",
//     allergens: [],
//     image: "/placeholder.svg?height=200&width=200",
//   });

//   const [editItem, setEditItem] = useState<MenuItem>({
//     id: "",
//     name: "",
//     price: 0,
//     kcal: 0,
//     description: "",
//     allergens: [],
//     image: "/placeholder.svg?height=200&width=200",
//   });

//   // QR Code ref for downloading
//   const qrCodeRef = useRef<HTMLDivElement>(null);

//   // Track if images should be shown based on template type
//   const [showItemImages, setShowItemImages] = useState(true);
//   const [showCategoryImages, setShowCategoryImages] = useState(true);

//   // Load menu data
//   useEffect(() => {
//     if (menuId) {
//       const menu = savedMenus.find((m) => m.id === menuId);
//       if (menu) {
//         setCurrentMenu(menu);
//         if (menu.categories.length > 0) {
//           setActiveCategory(menu.categories[0].id);
//         }

//         // Set visibility based on template type
//         if (menu.templateType === "basic") {
//           setShowItemImages(false);
//           setShowCategoryImages(false);
//         } else if (menu.templateType === "standard") {
//           setShowItemImages(true);
//           setShowCategoryImages(false);
//         } else {
//           setShowItemImages(true);
//           setShowCategoryImages(true);
//         }
//       } else {
//         // Menu not found, redirect to menu list
//         navigate("/templates-list");
//       }
//     }
//   }, [menuId, savedMenus, navigate]);

//   // Get active category
//   const currentCategory = currentMenu?.categories.find(
//     (cat) => cat.id === activeCategory
//   );

//   // Generate a unique menu URL for QR code
//   const menuUrl = `https://menuqr.example.com/menu/${
//     currentMenu?.id || Date.now()
//   }`;

//   // Save menu changes
//   const saveMenuChanges = () => {
//     if (!currentMenu) return;

//     setSavedMenus(
//       savedMenus.map((menu) =>
//         menu.id === currentMenu.id
//           ? {
//               ...currentMenu,
//               lastUpdated: new Date().toISOString().split("T")[0],
//             }
//           : menu
//       )
//     );
//   };

//   // Handlers
//   const handleAddCategory = () => {
//     if (newCategoryName.trim() && currentMenu) {
//       const newCategory: Category = {
//         id: `cat${Date.now()}`,
//         name: newCategoryName,
//         items: [],
//         image:
//           currentMenu.templateType === "advanced"
//             ? newCategoryImage || undefined
//             : undefined,
//       };

//       const updatedMenu = {
//         ...currentMenu,
//         categories: [...currentMenu.categories, newCategory],
//       };

//       setCurrentMenu(updatedMenu);
//       setNewCategoryName("");
//       setNewCategoryImage("");
//       setIsAddCategoryModalOpen(false);
//       setActiveCategory(newCategory.id);

//       // Save changes
//       setSavedMenus(
//         savedMenus.map((menu) =>
//           menu.id === currentMenu.id ? updatedMenu : menu
//         )
//       );
//     }
//   };

//   const handleEditCategory = () => {
//     if (editCategoryName.trim() && currentMenu) {
//       const updatedMenu = {
//         ...currentMenu,
//         categories: currentMenu.categories.map((cat) =>
//           cat.id === editCategoryId
//             ? {
//                 ...cat,
//                 name: editCategoryName,
//                 image:
//                   currentMenu.templateType === "advanced"
//                     ? editCategoryImage || cat.image
//                     : cat.image,
//               }
//             : cat
//         ),
//       };

//       setCurrentMenu(updatedMenu);
//       setEditCategoryName("");
//       setEditCategoryImage("");
//       setEditCategoryId("");
//       setIsEditCategoryModalOpen(false);

//       // Save changes
//       setSavedMenus(
//         savedMenus.map((menu) =>
//           menu.id === currentMenu.id ? updatedMenu : menu
//         )
//       );
//     }
//   };

//   const handleDeleteCategory = (categoryId: string) => {
//     if (!currentMenu) return;

//     if (confirm("Are you sure you want to delete this category?")) {
//       const updatedCategories = currentMenu.categories.filter(
//         (cat) => cat.id !== categoryId
//       );
//       const updatedMenu = {
//         ...currentMenu,
//         categories: updatedCategories,
//       };

//       setCurrentMenu(updatedMenu);

//       if (activeCategory === categoryId) {
//         setActiveCategory(updatedCategories[0]?.id || "");
//       }

//       // Save changes
//       setSavedMenus(
//         savedMenus.map((menu) =>
//           menu.id === currentMenu.id ? updatedMenu : menu
//         )
//       );
//     }
//   };

//   const handleAddItem = () => {
//     if (!currentMenu || !newItem.name.trim() || !activeCategory) return;

//     const newItemWithId: MenuItem = {
//       ...newItem,
//       id: `item${Date.now()}`,
//       image: currentMenu.templateType === "basic" ? undefined : newItem.image,
//     };

//     const updatedMenu = {
//       ...currentMenu,
//       categories: currentMenu.categories.map((cat) =>
//         cat.id === activeCategory
//           ? { ...cat, items: [...cat.items, newItemWithId] }
//           : cat
//       ),
//     };

//     setCurrentMenu(updatedMenu);
//     setNewItem({
//       name: "",
//       price: 0,
//       kcal: 0,
//       description: "",
//       allergens: [],
//       image: "/placeholder.svg?height=200&width=200",
//     });
//     setIsAddItemModalOpen(false);

//     // Save changes
//     setSavedMenus(
//       savedMenus.map((menu) =>
//         menu.id === currentMenu.id ? updatedMenu : menu
//       )
//     );
//   };

//   const handleEditItem = () => {
//     if (!currentMenu || !editItem.name.trim() || !activeCategory) return;

//     const updatedItem = {
//       ...editItem,
//       image: currentMenu.templateType === "basic" ? undefined : editItem.image,
//     };

//     const updatedMenu = {
//       ...currentMenu,
//       categories: currentMenu.categories.map((cat) =>
//         cat.id === activeCategory
//           ? {
//               ...cat,
//               items: cat.items.map((item) =>
//                 item.id === editItem.id ? updatedItem : item
//               ),
//             }
//           : cat
//       ),
//     };

//     setCurrentMenu(updatedMenu);
//     setEditItem({
//       id: "",
//       name: "",
//       price: 0,
//       kcal: 0,
//       description: "",
//       allergens: [],
//       image: "/placeholder.svg?height=200&width=200",
//     });
//     setIsEditItemModalOpen(false);

//     // Save changes
//     setSavedMenus(
//       savedMenus.map((menu) =>
//         menu.id === currentMenu.id ? updatedMenu : menu
//       )
//     );
//   };

//   const handleDeleteItem = (itemId: string) => {
//     if (!currentMenu || !activeCategory) return;

//     if (confirm("Are you sure you want to delete this item?")) {
//       const updatedMenu = {
//         ...currentMenu,
//         categories: currentMenu.categories.map((cat) =>
//           cat.id === activeCategory
//             ? {
//                 ...cat,
//                 items: cat.items.filter((item) => item.id !== itemId),
//               }
//             : cat
//         ),
//       };

//       setCurrentMenu(updatedMenu);

//       // Save changes
//       setSavedMenus(
//         savedMenus.map((menu) =>
//           menu.id === currentMenu.id ? updatedMenu : menu
//         )
//       );
//     }
//   };

//   const openEditCategoryModal = (category: Category) => {
//     setEditCategoryId(category.id);
//     setEditCategoryName(category.name);
//     setEditCategoryImage(category.image || "");
//     setIsEditCategoryModalOpen(true);
//   };

//   const openEditItemModal = (item: MenuItem) => {
//     setEditItem({ ...item });
//     setIsEditItemModalOpen(true);
//   };

//   const handleAllergenChange = (
//     allergen: Allergen,
//     checked: boolean,
//     isEdit: boolean
//   ) => {
//     if (isEdit) {
//       if (checked) {
//         setEditItem({
//           ...editItem,
//           allergens: [...editItem.allergens, allergen],
//         });
//       } else {
//         setEditItem({
//           ...editItem,
//           allergens: editItem.allergens.filter((a) => a !== allergen),
//         });
//       }
//     } else {
//       if (checked) {
//         setNewItem({ ...newItem, allergens: [...newItem.allergens, allergen] });
//       } else {
//         setNewItem({
//           ...newItem,
//           allergens: newItem.allergens.filter((a) => a !== allergen),
//         });
//       }
//     }
//   };

//   const handleDragEnd = (result: any) => {
//     if (!result.destination || !currentMenu || !currentCategory) return;

//     const items = Array.from(currentCategory.items);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     const updatedMenu = {
//       ...currentMenu,
//       categories: currentMenu.categories.map((cat) =>
//         cat.id === activeCategory ? { ...cat, items } : cat
//       ),
//     };

//     setCurrentMenu(updatedMenu);

//     // Save changes
//     setSavedMenus(
//       savedMenus.map((menu) =>
//         menu.id === currentMenu.id ? updatedMenu : menu
//       )
//     );
//   };

//   // Function to download QR code as PNG
//   const downloadQRCode = () => {
//     if (!qrCodeRef.current) return;

//     const svg = qrCodeRef.current.querySelector("svg");
//     if (!svg) return;

//     const svgData = new XMLSerializer().serializeToString(svg);
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     const img = new Image();

//     img.onload = () => {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx?.drawImage(img, 0, 0);

//       const pngFile = canvas.toDataURL("image/png");
//       const downloadLink = document.createElement("a");
//       downloadLink.download = `menu-qr-code-${
//         currentMenu?.id || Date.now()
//       }.png`;
//       downloadLink.href = pngFile;
//       downloadLink.click();
//     };

//     img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
//     img.crossOrigin = "anonymous";
//   };

//   // Navigate back to menu list
//   const handleBackToMenus = () => {
//     navigate("/templates-list");
//   };

//   if (!currentMenu) {
//     return (
//       <PageContainer>
//         <HeaderWrapper>
//           <HeaderContainer>
//             <Logo>
//               <LogoIcon />
//               Menu<span>QR</span>
//             </Logo>
//           </HeaderContainer>
//         </HeaderWrapper>
//         <MainContent>
//           <EmptyState>
//             <EmptyStateTitle>Loading menu...</EmptyStateTitle>
//           </EmptyState>
//         </MainContent>
//       </PageContainer>
//     );
//   }

//   return (
//     <PageContainer>
//       <HeaderWrapper>
//         <HeaderContainer>
//           <Logo>
//             <LogoIcon />
//             Menu<span>QR</span>
//           </Logo>
//         </HeaderContainer>
//       </HeaderWrapper>

//       <MainContent>
//         <PageHeader>
//           <TitleSection>
//             <TitleRow>
//               <PageTitle>{currentMenu.name}</PageTitle>
//               <TemplateTag templateType={currentMenu.templateType}>
//                 {currentMenu.templateType}
//               </TemplateTag>
//             </TitleRow>
//             <PageDescription>{currentMenu.description}</PageDescription>
//           </TitleSection>
//           <BackButton onClick={handleBackToMenus}>
//             <BackIcon /> Back to Menus
//           </BackButton>
//         </PageHeader>

//         <LayoutContainer>
//           <Sidebar>
//             <SidebarTitle>Categories</SidebarTitle>
//             <CategoryList>
//               {currentMenu.categories.map((category) => (
//                 <CategoryItem
//                   key={category.id}
//                   isActive={activeCategory === category.id}
//                   onClick={() => setActiveCategory(category.id)}
//                 >
//                   <CategoryName isActive={activeCategory === category.id}>
//                     {category.name}
//                   </CategoryName>
//                   <CategoryItemCount>{category.items.length}</CategoryItemCount>
//                 </CategoryItem>
//               ))}
//             </CategoryList>
//             <AddCategoryButton onClick={() => setIsAddCategoryModalOpen(true)}>
//               <PlusIcon /> Add Category
//             </AddCategoryButton>
//           </Sidebar>

//           <ContentArea>
//             <ContentHeader>
//               <ContentTitle>
//                 {currentCategory?.name || "Select a category"}
//               </ContentTitle>
//               <ContentActions>
//                 <Button onClick={() => setIsPreviewModalOpen(true)}>
//                   <EyeIcon /> Preview Menu
//                 </Button>
//                 <Button onClick={() => setIsQRCodeModalOpen(true)}>
//                   <QRCodeIcon /> Generate QR
//                 </Button>
//                 {currentCategory && (
//                   <>
//                     <Button
//                       onClick={() => openEditCategoryModal(currentCategory)}
//                     >
//                       <EditIcon /> Edit Category
//                     </Button>
//                     <Button
//                       variant="danger"
//                       onClick={() => handleDeleteCategory(currentCategory.id)}
//                     >
//                       <TrashIcon /> Delete Category
//                     </Button>
//                   </>
//                 )}
//               </ContentActions>
//             </ContentHeader>

//             {currentCategory ? (
//               <>
//                 {/* Show category image only for advanced template */}
//                 {currentMenu.templateType === "advanced" && (
//                   <CategoryImageContainer showImage={showCategoryImages}>
//                     <CategoryImage imageUrl={currentCategory.image} />
//                   </CategoryImageContainer>
//                 )}

//                 <AddItemButton
//                   variant="primary"
//                   onClick={() => setIsAddItemModalOpen(true)}
//                 >
//                   <PlusIcon /> Add Menu Item
//                 </AddItemButton>

//                 {currentCategory.items.length > 0 ? (
//                   <DragDropContainer>
//                     <DragDropContext onDragEnd={handleDragEnd}>
//                       <Droppable droppableId="menu-items">
//                         {(provided) => (
//                           <DragDropList
//                             {...provided.droppableProps}
//                             ref={provided.innerRef}
//                           >
//                             {currentCategory.items.map((item, index) => (
//                               <Draggable
//                                 key={item.id}
//                                 draggableId={item.id}
//                                 index={index}
//                               >
//                                 {(provided, snapshot) => (
//                                   <DragItem
//                                     ref={provided.innerRef}
//                                     {...provided.draggableProps}
//                                     isDragging={snapshot.isDragging}
//                                     style={provided.draggableProps.style}
//                                   >
//                                     <MenuItemCard>
//                                       <div
//                                         style={{
//                                           display: "flex",
//                                           alignItems: "center",
//                                         }}
//                                       >
//                                         <div {...provided.dragHandleProps}>
//                                           <DragHandle>
//                                             <DragHandleIcon />
//                                           </DragHandle>
//                                         </div>
//                                         {/* Show item images only for standard and advanced templates */}
//                                         {(currentMenu.templateType ===
//                                           "standard" ||
//                                           currentMenu.templateType ===
//                                             "advanced") && (
//                                           <MenuItemImage
//                                             imageUrl={item.image}
//                                             showImage={showItemImages}
//                                           />
//                                         )}
//                                       </div>
//                                       <MenuItemContent>
//                                         <MenuItemHeader>
//                                           <MenuItemTitle>
//                                             {item.name}
//                                           </MenuItemTitle>
//                                           <MenuItemPrice>
//                                             ${item.price.toFixed(2)}
//                                           </MenuItemPrice>
//                                         </MenuItemHeader>
//                                         <MenuItemDescription>
//                                           {item.description}
//                                         </MenuItemDescription>
//                                         <MenuItemMeta>
//                                           <MenuItemKcal>
//                                             <FireIcon /> {item.kcal} kcal
//                                           </MenuItemKcal>
//                                         </MenuItemMeta>
//                                         <MenuItemAllergens>
//                                           {item.allergens.map((allergen) => (
//                                             <AllergenTag key={allergen}>
//                                               {allergen}
//                                             </AllergenTag>
//                                           ))}
//                                         </MenuItemAllergens>
//                                         <MenuItemActions>
//                                           <Button
//                                             onClick={() =>
//                                               openEditItemModal(item)
//                                             }
//                                           >
//                                             <EditIcon /> Edit
//                                           </Button>
//                                           <Button
//                                             variant="danger"
//                                             onClick={() =>
//                                               handleDeleteItem(item.id)
//                                             }
//                                           >
//                                             <TrashIcon />
//                                           </Button>
//                                         </MenuItemActions>
//                                       </MenuItemContent>
//                                     </MenuItemCard>
//                                   </DragItem>
//                                 )}
//                               </Draggable>
//                             ))}
//                             {provided.placeholder}
//                           </DragDropList>
//                         )}
//                       </Droppable>
//                     </DragDropContext>
//                   </DragDropContainer>
//                 ) : (
//                   <EmptyState>
//                     <EmptyStateTitle>No menu items yet</EmptyStateTitle>
//                     <EmptyStateDescription>
//                       Add your first menu item to get started
//                     </EmptyStateDescription>
//                     <Button
//                       variant="primary"
//                       onClick={() => setIsAddItemModalOpen(true)}
//                     >
//                       <PlusIcon /> Add Menu Item
//                     </Button>
//                   </EmptyState>
//                 )}
//               </>
//             ) : (
//               <EmptyState>
//                 <EmptyStateTitle>No category selected</EmptyStateTitle>
//                 <EmptyStateDescription>
//                   Select a category from the sidebar or create a new one
//                 </EmptyStateDescription>
//                 <Button
//                   variant="primary"
//                   onClick={() => setIsAddCategoryModalOpen(true)}
//                 >
//                   <PlusIcon /> Add Category
//                 </Button>
//               </EmptyState>
//             )}
//           </ContentArea>
//         </LayoutContainer>
//       </MainContent>

//       {/* Add Category Modal */}
//       {isAddCategoryModalOpen && (
//         <Modal>
//           <ModalContent>
//             <ModalHeader>
//               <ModalTitle>Add Category</ModalTitle>
//               <CloseButton onClick={() => setIsAddCategoryModalOpen(false)}>
//                 &times;
//               </CloseButton>
//             </ModalHeader>
//             <Form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleAddCategory();
//               }}
//             >
//               <FormGroup>
//                 <Label htmlFor="categoryName">Category Name</Label>
//                 <Input
//                   id="categoryName"
//                   value={newCategoryName}
//                   onChange={(e) => setNewCategoryName(e.target.value)}
//                   placeholder="e.g., Pizza, Burgers, Desserts"
//                 />
//               </FormGroup>

//               {/* Only show image field for advanced template */}
//               {currentMenu.templateType === "advanced" && (
//                 <FormGroup>
//                   <Label htmlFor="categoryImage">
//                     Category Image URL (optional)
//                   </Label>
//                   <Input
//                     id="categoryImage"
//                     value={newCategoryImage}
//                     onChange={(e) => setNewCategoryImage(e.target.value)}
//                     placeholder="e.g., https://example.com/image.jpg"
//                   />
//                 </FormGroup>
//               )}

//               <ModalFooter>
//                 <Button onClick={() => setIsAddCategoryModalOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button variant="primary" type="submit">
//                   Add Category
//                 </Button>
//               </ModalFooter>
//             </Form>
//           </ModalContent>
//         </Modal>
//       )}

//       {/* Edit Category Modal */}
//       {isEditCategoryModalOpen && (
//         <Modal>
//           <ModalContent>
//             <ModalHeader>
//               <ModalTitle>Edit Category</ModalTitle>
//               <CloseButton onClick={() => setIsEditCategoryModalOpen(false)}>
//                 &times;
//               </CloseButton>
//             </ModalHeader>
//             <Form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleEditCategory();
//               }}
//             >
//               <FormGroup>
//                 <Label htmlFor="editCategoryName">Category Name</Label>
//                 <Input
//                   id="editCategoryName"
//                   value={editCategoryName}
//                   onChange={(e) => setEditCategoryName(e.target.value)}
//                 />
//               </FormGroup>

//               {/* Only show image field for advanced template */}
//               {currentMenu.templateType === "advanced" && (
//                 <FormGroup>
//                   <Label htmlFor="editCategoryImage">
//                     Category Image URL (optional)
//                   </Label>
//                   <Input
//                     id="editCategoryImage"
//                     value={editCategoryImage}
//                     onChange={(e) => setEditCategoryImage(e.target.value)}
//                   />
//                 </FormGroup>
//               )}

//               <ModalFooter>
//                 <Button onClick={() => setIsEditCategoryModalOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button variant="primary" type="submit">
//                   Save Changes
//                 </Button>
//               </ModalFooter>
//             </Form>
//           </ModalContent>
//         </Modal>
//       )}

//       {/* Add Item Modal */}
//       {isAddItemModalOpen && (
//         <Modal>
//           <ModalContent>
//             <ModalHeader>
//               <ModalTitle>Add Menu Item</ModalTitle>
//               <CloseButton onClick={() => setIsAddItemModalOpen(false)}>
//                 &times;
//               </CloseButton>
//             </ModalHeader>
//             <Form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleAddItem();
//               }}
//             >
//               <FormGroup>
//                 <Label htmlFor="itemName">Item Name</Label>
//                 <Input
//                   id="itemName"
//                   value={newItem.name}
//                   onChange={(e) =>
//                     setNewItem({ ...newItem, name: e.target.value })
//                   }
//                   placeholder="e.g., Margherita Pizza"
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label htmlFor="itemPrice">Price ($)</Label>
//                 <Input
//                   id="itemPrice"
//                   type="number"
//                   step="0.01"
//                   min="0"
//                   value={newItem.price}
//                   onChange={(e) =>
//                     setNewItem({
//                       ...newItem,
//                       price: Number.parseFloat(e.target.value),
//                     })
//                   }
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label htmlFor="itemKcal">Calories (kcal)</Label>
//                 <Input
//                   id="itemKcal"
//                   type="number"
//                   min="0"
//                   value={newItem.kcal}
//                   onChange={(e) =>
//                     setNewItem({
//                       ...newItem,
//                       kcal: Number.parseInt(e.target.value),
//                     })
//                   }
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label htmlFor="itemDescription">Description</Label>
//                 <Textarea
//                   id="itemDescription"
//                   value={newItem.description}
//                   onChange={(e) =>
//                     setNewItem({ ...newItem, description: e.target.value })
//                   }
//                   placeholder="Describe your menu item..."
//                 />
//               </FormGroup>

//               {/* Only show image field for standard and advanced templates */}
//               {(currentMenu.templateType === "standard" ||
//                 currentMenu.templateType === "advanced") && (
//                 <FormGroup>
//                   <Label htmlFor="itemImage">Image URL</Label>
//                   <Input
//                     id="itemImage"
//                     type="text"
//                     value={newItem.image}
//                     onChange={(e) =>
//                       setNewItem({ ...newItem, image: e.target.value })
//                     }
//                     placeholder="https://example.com/image.jpg"
//                   />
//                 </FormGroup>
//               )}

//               <FormGroup>
//                 <Label>Allergens</Label>
//                 <CheckboxGroup>
//                   {allAllergens.map((allergen) => (
//                     <CheckboxLabel key={allergen}>
//                       <Checkbox
//                         type="checkbox"
//                         checked={newItem.allergens.includes(allergen)}
//                         onChange={(e) =>
//                           handleAllergenChange(
//                             allergen,
//                             e.target.checked,
//                             false
//                           )
//                         }
//                       />
//                       {allergen}
//                     </CheckboxLabel>
//                   ))}
//                 </CheckboxGroup>
//               </FormGroup>
//               <ModalFooter>
//                 <Button onClick={() => setIsAddItemModalOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button variant="primary" type="submit">
//                   Add Item
//                 </Button>
//               </ModalFooter>
//             </Form>
//           </ModalContent>
//         </Modal>
//       )}

//       {/* Edit Item Modal */}
//       {isEditItemModalOpen && (
//         <Modal>
//           <ModalContent>
//             <ModalHeader>
//               <ModalTitle>Edit Menu Item</ModalTitle>
//               <CloseButton onClick={() => setIsEditItemModalOpen(false)}>
//                 &times;
//               </CloseButton>
//             </ModalHeader>
//             <Form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleEditItem();
//               }}
//             >
//               <FormGroup>
//                 <Label htmlFor="editItemName">Item Name</Label>
//                 <Input
//                   id="editItemName"
//                   value={editItem.name}
//                   onChange={(e) =>
//                     setEditItem({ ...editItem, name: e.target.value })
//                   }
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label htmlFor="editItemPrice">Price ($)</Label>
//                 <Input
//                   id="editItemPrice"
//                   type="number"
//                   step="0.01"
//                   min="0"
//                   value={editItem.price}
//                   onChange={(e) =>
//                     setEditItem({
//                       ...editItem,
//                       price: Number.parseFloat(e.target.value),
//                     })
//                   }
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label htmlFor="editItemKcal">Calories (kcal)</Label>
//                 <Input
//                   id="editItemKcal"
//                   type="number"
//                   min="0"
//                   value={editItem.kcal}
//                   onChange={(e) =>
//                     setEditItem({
//                       ...editItem,
//                       kcal: Number.parseInt(e.target.value),
//                     })
//                   }
//                 />
//               </FormGroup>
//               <FormGroup>
//                 <Label htmlFor="editItemDescription">Description</Label>
//                 <Textarea
//                   id="editItemDescription"
//                   value={editItem.description}
//                   onChange={(e) =>
//                     setEditItem({ ...editItem, description: e.target.value })
//                   }
//                 />
//               </FormGroup>

//               {/* Only show image field for standard and advanced templates */}
//               {(currentMenu.templateType === "standard" ||
//                 currentMenu.templateType === "advanced") && (
//                 <FormGroup>
//                   <Label htmlFor="editItemImage">Image URL</Label>
//                   <Input
//                     id="editItemImage"
//                     type="text"
//                     value={editItem.image}
//                     onChange={(e) =>
//                       setEditItem({ ...editItem, image: e.target.value })
//                     }
//                   />
//                 </FormGroup>
//               )}

//               <FormGroup>
//                 <Label>Allergens</Label>
//                 <CheckboxGroup>
//                   {allAllergens.map((allergen) => (
//                     <CheckboxLabel key={allergen}>
//                       <Checkbox
//                         type="checkbox"
//                         checked={editItem.allergens.includes(allergen)}
//                         onChange={(e) =>
//                           handleAllergenChange(allergen, e.target.checked, true)
//                         }
//                       />
//                       {allergen}
//                     </CheckboxLabel>
//                   ))}
//                 </CheckboxGroup>
//               </FormGroup>
//               <ModalFooter>
//                 <Button onClick={() => setIsEditItemModalOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button variant="primary" type="submit">
//                   Save Changes
//                 </Button>
//               </ModalFooter>
//             </Form>
//           </ModalContent>
//         </Modal>
//       )}

//       {/* Preview Modal */}
//       {isPreviewModalOpen && (
//         <PreviewModal>
//           <PreviewContent>
//             <PreviewHeader>
//               <PreviewTitle>Menu Preview</PreviewTitle>
//               <CloseButton onClick={() => setIsPreviewModalOpen(false)}>
//                 &times;
//               </CloseButton>
//             </PreviewHeader>
//             <PreviewBody>
//               {currentMenu?.categories.map((category) => (
//                 <PreviewCategory key={category.id}>
//                   <PreviewCategoryTitle>{category.name}</PreviewCategoryTitle>
//                   <PreviewCategoryImage
//                     showImage={showCategoryImages}
//                     imageUrl={category.image}
//                   />
//                   <PreviewItems>
//                     {category.items.map((item) => (
//                       <PreviewItem key={item.id}>
//                         <PreviewItemImage
//                           showImage={showItemImages}
//                           imageUrl={item.image}
//                         />
//                         <PreviewItemContent>
//                           <PreviewItemHeader>
//                             <PreviewItemTitle>{item.name}</PreviewItemTitle>
//                             <PreviewItemPrice>
//                               ${item.price.toFixed(2)}
//                             </PreviewItemPrice>
//                           </PreviewItemHeader>
//                           <PreviewItemDescription>
//                             {item.description}
//                           </PreviewItemDescription>
//                           <PreviewItemMeta>
//                             <div>{item.kcal} kcal</div>
//                             <PreviewItemAllergens>
//                               {item.allergens.map((allergen) => (
//                                 <AllergenTag key={allergen}>
//                                   {allergen}
//                                 </AllergenTag>
//                               ))}
//                             </PreviewItemAllergens>
//                           </PreviewItemMeta>
//                         </PreviewItemContent>
//                       </PreviewItem>
//                     ))}
//                   </PreviewItems>
//                 </PreviewCategory>
//               ))}
//             </PreviewBody>
//           </PreviewContent>
//         </PreviewModal>
//       )}

//       {/* QR Code Modal */}
//       {isQRCodeModalOpen && (
//         <QRCodeModal>
//           <QRCodeContent>
//             <ModalHeader>
//               <ModalTitle>Menu QR Code</ModalTitle>
//               <CloseButton onClick={() => setIsQRCodeModalOpen(false)}>
//                 &times;
//               </CloseButton>
//             </ModalHeader>

//             <QRCodeDescription>
//               Scan this QR code with your smartphone camera to view the digital
//               menu.
//             </QRCodeDescription>

//             <QRCodeContainer ref={qrCodeRef}>
//               <QRCodeSVG
//                 value={menuUrl}
//                 size={200}
//                 level="H" // High error correction capability
//                 includeMargin={true}
//                 bgColor={"#FFFFFF"}
//                 fgColor={"#000000"}
//               />
//             </QRCodeContainer>

//             <QRCodeActions>
//               <Button onClick={downloadQRCode}>
//                 <DownloadIcon /> Download QR Code
//               </Button>
//               <Button onClick={() => setIsQRCodeModalOpen(false)}>Close</Button>
//             </QRCodeActions>
//           </QRCodeContent>
//         </QRCodeModal>
//       )}
//     </PageContainer>
//   );
// };

// export default TemplatesDragDrop;

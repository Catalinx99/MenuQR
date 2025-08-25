import React, { useEffect, useRef } from "react";
import styled from "styled-components";

type ModalAddCategoryProps = {
  setIsAddCategoryModalOpen: (open: boolean) => void;
  handleAddCategory: () => void;
  newCategoryName: string;
  setNewCategoryName: (name: string) => void;
};

const ModalAddCategory = ({
  setIsAddCategoryModalOpen,
  handleAddCategory,
  newCategoryName,
  setNewCategoryName,
}: ModalAddCategoryProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsAddCategoryModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      setIsAddCategoryModalOpen(false);
    }
  };

  return (
    <Modal
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      onClick={handleClickOutside}
    >
      <ModalContent>
        <ModalHeader>
          <ModalTitle id="modal-title">Add Category</ModalTitle>
          <CloseButton onClick={() => setIsAddCategoryModalOpen(false)}>
            &times;
          </CloseButton>
        </ModalHeader>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddCategory();
          }}
        >
          <FormGroup>
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g., Pizza, Burgers, Desserts"
              ref={inputRef}
            />
          </FormGroup>
          <ModalFooter>
            <Button
              type="button"
              onClick={() => setIsAddCategoryModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add Category
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddCategory;

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
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  padding: 1.5rem;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #2d3748;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
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

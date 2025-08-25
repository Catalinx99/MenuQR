import { useState } from "react";
import styled from "styled-components";

type MenuItem = {
  name: string;
  price: number;
  kcal: number;
  description: string;
  image: string;
  allergens: string[];
  discountPrice?: number;
};

type HandleAllergenChange = (
  allergen: string,
  checked: boolean,
  isEditing: boolean
) => void;

type ModalAddItemProps = {
  setIsAddItemModalOpen: (open: boolean) => void;
  handleAddItem: () => void;
  setNewItem: (item: MenuItem) => void;
  newItem: MenuItem;
  allAllergens: string[];
  handleAllergenChange: HandleAllergenChange;
};

const ModalAddItem = ({
  setIsAddItemModalOpen,
  handleAddItem,
  setNewItem,
  newItem,
  allAllergens,
  handleAllergenChange,
}: ModalAddItemProps) => {
  const [isDiscounted, setIsDiscounted] = useState(!!newItem.discountPrice);

  return (
    <div>
      {" "}
      <Modal>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Add Menu Item</ModalTitle>
            <CloseButton onClick={() => setIsAddItemModalOpen(false)}>
              &times;
            </CloseButton>
          </ModalHeader>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddItem();
            }}
          >
            <FormGroup>
              <Label htmlFor="itemName">Item Name</Label>
              <Input
                id="itemName"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                placeholder="e.g., Margherita Pizza"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="itemPrice">Price ($)</Label>
              <Input
                id="itemPrice"
                type="number"
                placeholder="e.g., 12.99"
                step="0.01"
                min="0"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    price: Number.parseFloat(e.target.value),
                  })
                }
              />
            </FormGroup>

            <FormGroup>
              <Label>Preț redus</Label>
              <SwitchWrapper>
                <SwitchLabel>
                  <SwitchInput
                    checked={isDiscounted}
                    onChange={(e) => {
                      setIsDiscounted(e.target.checked);
                      if (!e.target.checked) {
                        setNewItem({ ...newItem, discountPrice: undefined });
                      }
                    }}
                  />
                  <Slider />
                </SwitchLabel>
                {isDiscounted && (
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Preț redus"
                    value={newItem.discountPrice ?? ""}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        discountPrice: Number.parseFloat(e.target.value),
                      })
                    }
                  />
                )}
              </SwitchWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="itemKcal">Calories (kcal)</Label>
              <Input
                id="itemKcal"
                type="number"
                min="0"
                value={newItem.kcal}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    kcal: Number.parseInt(e.target.value),
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="itemDescription">Description</Label>
              <Textarea
                id="itemDescription"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                placeholder="Describe your menu item..."
                maxLength={500}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="itemImage">Image URL</Label>
              <Input
                id="itemImage"
                type="text"
                value={newItem.image}
                onChange={(e) =>
                  setNewItem({ ...newItem, image: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
              />
            </FormGroup>
            <FormGroup>
              <Label>Allergens</Label>
              <CheckboxGroup>
                {allAllergens.map((allergen) => (
                  <CheckboxLabel key={allergen}>
                    <Checkbox
                      type="checkbox"
                      checked={newItem.allergens.includes(allergen)}
                      onChange={(e) =>
                        handleAllergenChange(allergen, e.target.checked, false)
                      }
                    />
                    {allergen}
                  </CheckboxLabel>
                ))}
              </CheckboxGroup>
            </FormGroup>
            <ModalFooter>
              <Button onClick={() => setIsAddItemModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add Item
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalAddItem;

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
  padding: 2rem;
  width: 50%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;

  max-width: 90%;
  padding: 1rem;

  @media (max-width: 480px) {
    width: 95%;
    padding: 0.5rem;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
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
  background-color: #fdfdfd;
  color: #1a202c;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.3);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  background-color: #fdfdfd;
  color: #1a202c;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  resize: vertical;
  min-height: 100px;
  transition: 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.3);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.75rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #2d3748;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: #ebf8ff;
    border-color: #90cdf4;
  }
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 1.25rem;
  height: 1.25rem;
  accent-color: #3182ce;
  cursor: pointer;
  color-scheme: auto;
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

const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
`;

const SwitchInput = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #3182ce;
  }

  &:checked + span:before {
    transform: translateX(22px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e0;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

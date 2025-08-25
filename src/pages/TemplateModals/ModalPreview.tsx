import React from "react";
import styled from "styled-components";

const ModalPreview = ({ currentMenu, setIsPreviewModalOpen }) => {
  return (
    <>
      <PreviewModal>
        <PreviewContent>
          <PreviewHeader>
            <PreviewTitle>{currentMenu.name} - Preview</PreviewTitle>
            <CloseButton onClick={() => setIsPreviewModalOpen(false)}>
              &times;
            </CloseButton>
          </PreviewHeader>
          <PreviewBody>
            {currentMenu.categories.map((category) => (
              <PreviewCategory key={category.id}>
                <PreviewCategoryTitle>{category.name}</PreviewCategoryTitle>
                <PreviewItems>
                  {category.items.map((item) => (
                    <PreviewItem key={item.id}>
                      <PreviewItemImage imageUrl={item.image} />
                      <PreviewItemContent>
                        <PreviewItemHeader>
                          <PreviewItemTitle>{item.name}</PreviewItemTitle>
                          <PreviewItemPrice>
                            ${item.price.toFixed(2)}
                          </PreviewItemPrice>
                        </PreviewItemHeader>
                        <PreviewItemDescription>
                          {item.description}
                        </PreviewItemDescription>
                        <PreviewItemMeta>
                          <div>{item.kcal} kcal</div>
                          <PreviewItemAllergens>
                            {item.allergens.map((allergen) => (
                              <AllergenTag key={allergen}>
                                {allergen}
                              </AllergenTag>
                            ))}
                          </PreviewItemAllergens>
                        </PreviewItemMeta>
                      </PreviewItemContent>
                    </PreviewItem>
                  ))}
                </PreviewItems>
              </PreviewCategory>
            ))}
          </PreviewBody>
        </PreviewContent>
      </PreviewModal>
    </>
  );
};

export default ModalPreview;

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

const PreviewModal = styled(Modal)`
  z-index: 60;
`;

export const PreviewContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
`;

export const PreviewTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
`;

export const PreviewBody = styled.div`
  padding: 1.5rem;
  flex: 1;
`;

export const PreviewCategory = styled.div`
  margin-bottom: 2rem;
`;

export const PreviewCategoryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #3182ce;
`;

// const PreviewItems = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 1.5rem;
// `;
export const PreviewItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const PreviewItem = styled.div`
  display: flex;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

export const PreviewItemImage = styled.div<{ imageUrl?: string }>`
  width: 100px;
  height: 100px;
  background-image: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

export const PreviewItemContent = styled.div`
  padding: 1rem;
  flex: 1;
`;

export const PreviewItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

export const PreviewItemTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

export const PreviewItemPrice = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #3182ce;
`;

export const PreviewItemDescription = styled.p`
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

export const PreviewItemMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #718096;
`;

export const PreviewItemAllergens = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
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

export const AllergenTag = styled.span`
  font-size: 0.75rem;
  background-color: #edf2f7;
  color: #4a5568;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

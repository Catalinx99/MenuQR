import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "@styled-icons/boxicons-regular/Search";
import { X } from "@styled-icons/boxicons-regular/X";

export const ViewMenuDark = ({ currentMenu }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const filteredCategories = currentMenu.categories
    .map((category: any) => ({
      ...category,
      items: category.items.filter(
        (item: any) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category: any) => category.items.length > 0);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const openModal = (item: any) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    const slider = document.querySelector(".categories-nav") as HTMLElement;
    if (!slider) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const startDragging = (e: MouseEvent) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const stopDragging = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const move = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", startDragging);
    slider.addEventListener("mouseleave", stopDragging);
    slider.addEventListener("mouseup", stopDragging);
    slider.addEventListener("mousemove", move);

    return () => {
      slider.removeEventListener("mousedown", startDragging);
      slider.removeEventListener("mouseleave", stopDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mousemove", move);
    };
  }, []);

  useEffect(() => {
    const menuId =
      currentMenu?.id ||
      new URL(window.location.href).searchParams.get("menuId");

    if (window.gtag && menuId) {
      window.gtag("event", "qr_scan", {
        menu_id: menuId,
        menu_name: currentMenu?.name,
      });
    }
  }, [currentMenu]);

  return (
    <DarkThemeContainer>
      <HeroHeader>
        <MenuImage src={currentMenu.imageUrl} alt={currentMenu.name} />
        <HeroTitle>{currentMenu.name}</HeroTitle>
      </HeroHeader>

      <MainContent>
        <SearchContainer>
          <SearchInput
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon size="24" />
          {searchQuery && (
            <ClearButton onClick={handleClearSearch}>
              <ClearIcon size="20" />
            </ClearButton>
          )}
        </SearchContainer>

        <CategoriesNav className="categories-nav">
          {currentMenu.categories.map((category: any) => (
            <CategoryButton
              key={category.id}
              onClick={() => {
                const element = document.getElementById(category.id);
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CategoryImageWrapper>
                <img
                  className="category-image"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHaRPLGAmlWmZd6iDfNfbFsXLpcXQSY_PgxQ&s"
                  alt={category.name}
                />
              </CategoryImageWrapper>
              <CategoryName>{category.name}</CategoryName>
            </CategoryButton>
          ))}
        </CategoriesNav>

        <MenuContent>
          <AnimatePresence>
            {filteredCategories.map((category: any) => (
              <CategorySection
                key={category.id}
                id={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <CategoryTitle>{category.name}</CategoryTitle>
                <ItemsGrid>
                  {category.items.map((item: any) => (
                    <MenuItemCard
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
                      }}
                      onClick={() => openModal(item)}
                    >
                      <ItemImageContainer>
                        <ItemImage src={item.image} alt={item.name} />
                        {item.discountPrice && (
                          <DiscountRibbon>
                            Save{" "}
                            {Math.round(
                              ((item.price - item.discountPrice) / item.price) *
                                100
                            )}
                            %
                          </DiscountRibbon>
                        )}
                      </ItemImageContainer>
                      <ItemContent>
                        <ItemHeader>
                          <ItemTitle>{item.name}</ItemTitle>
                          <ItemPrice>
                            {item.discountPrice ? (
                              <>
                                <OriginalPrice>
                                  ${item.price.toFixed(2)}
                                </OriginalPrice>
                                <DiscountedPrice>
                                  ${item.discountPrice.toFixed(2)}
                                </DiscountedPrice>
                              </>
                            ) : (
                              <span>${item.price.toFixed(2)}</span>
                            )}
                          </ItemPrice>
                        </ItemHeader>
                        <ItemDescription>
                          {item.description.length > 60
                            ? `${item.description.substring(0, 60)}...`
                            : item.description}
                        </ItemDescription>
                        <ItemMeta>
                          <KcalBadge>
                            <FireIcon />
                            {item.kcal} kcal
                          </KcalBadge>
                          <Allergens>
                            {item.allergens.slice(0, 3).map((allergen: any) => (
                              <AllergenTag key={allergen}>
                                {allergen}
                              </AllergenTag>
                            ))}
                            {item.allergens.length > 3 && (
                              <AllergenTag>
                                +{item.allergens.length - 3}
                              </AllergenTag>
                            )}
                          </Allergens>
                        </ItemMeta>
                      </ItemContent>
                    </MenuItemCard>
                  ))}
                </ItemsGrid>
              </CategorySection>
            ))}
          </AnimatePresence>

          {filteredCategories.length === 0 && (
            <EmptyState>
              <h3>No items found</h3>
              <p>Try adjusting your search terms</p>
            </EmptyState>
          )}
        </MenuContent>
      </MainContent>

      {/* Modal for displaying detailed item info */}
      {selectedItem && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton onClick={closeModal}>
              <X size={24} />
            </ModalCloseButton>
            <ModalImage src={selectedItem.image} alt={selectedItem.name} />
            <ModalItemHeader>
              <ModalItemTitle>{selectedItem.name}</ModalItemTitle>
              <ModalItemPrice>
                {selectedItem.discountPrice ? (
                  <>
                    <OriginalPrice>
                      ${selectedItem.price.toFixed(2)}
                    </OriginalPrice>
                    <DiscountedPrice>
                      ${selectedItem.discountPrice.toFixed(2)}
                    </DiscountedPrice>
                  </>
                ) : (
                  <span>${selectedItem.price.toFixed(2)}</span>
                )}
              </ModalItemPrice>
            </ModalItemHeader>
            <ModalItemDescription>
              {selectedItem.description}
            </ModalItemDescription>
            <NutritionInfo>
              <NutritionBadge>
                <FireIcon />
                {selectedItem.kcal} calories
              </NutritionBadge>
              {selectedItem.protein && (
                <NutritionBadge>
                  Protein: {selectedItem.protein}g
                </NutritionBadge>
              )}
              {selectedItem.carbs && (
                <NutritionBadge>Carbs: {selectedItem.carbs}g</NutritionBadge>
              )}
            </NutritionInfo>
            <AllergensSection>
              <h4>Allergens:</h4>
              <AllergensGrid>
                {selectedItem.allergens.map((allergen: any) => (
                  <AllergenPill key={allergen}>{allergen}</AllergenPill>
                ))}
              </AllergensGrid>
            </AllergensSection>
          </ModalContent>
        </ModalOverlay>
      )}
    </DarkThemeContainer>
  );
};

// New styled components with dark theme
const DarkThemeContainer = styled.div`
  background: #121212;
  color: #e0e0e0;
  min-height: 100vh;
`;

const HeroHeader = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const MenuImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
`;

const HeroTitle = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-family: "Montserrat", sans-serif;
  font-size: 4rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);
  text-align: center;
  width: 100%;
  padding: 0 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const MainContent = styled.div`
  padding: 0 2rem 3rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0 1rem 2rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto 3rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem 1rem 3rem;
  border: none;
  border-radius: 30px;
  background: #1e1e1e;
  color: white;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:focus {
    outline: none;
    box-shadow: 0 4px 20px rgba(100, 108, 255, 0.3);
  }

  &::placeholder {
    color: #a0a0a0;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #646cff;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #a0a0a0;
  transition: color 0.2s;

  &:hover {
    color: #646cff;
  }
`;

const ClearIcon = styled(X)`
  color: inherit;
`;

const CategoriesNav = styled.nav`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 0;
  margin: 0 auto 3rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  cursor: grab;
  border-bottom: 1px solid #2a2a2a;

  &::-webkit-scrollbar {
    display: none;
  }

  &:active {
    cursor: grabbing;
  }
`;

const CategoryButton = styled(motion.button)`
  padding: 0.5rem;
  border: none;
  background: transparent;
  color: #a0a0a0;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    color: white;
    transform: translateY(-3px);
  }

  &.active {
    color: #646cff;
  }
`;

const CategoryImageWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #2a2a2a;
  transition: all 0.3s ease;

  ${CategoryButton}:hover & {
    border-color: #646cff;
    transform: scale(1.1);
  }

  .category-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CategoryName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
`;

const MenuContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const CategorySection = styled(motion.section)`
  margin-bottom: 4rem;
`;

const CategoryTitle = styled.h2`
  font-size: 1.8rem;
  color: white;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #2a2a2a;
  font-weight: 600;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MenuItemCard = styled(motion.div)`
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ItemImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${MenuItemCard}:hover & {
    transform: scale(1.05);
  }
`;

const DiscountRibbon = styled.div`
  position: absolute;
  top: 15px;
  right: -30px;
  background: #ff4757;
  color: white;
  padding: 0.25rem 2rem;
  font-size: 0.8rem;
  font-weight: 600;
  transform: rotate(45deg);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const ItemContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ItemTitle = styled.h3`
  font-size: 1.2rem;
  color: white;
  margin: 0;
  font-weight: 600;
  flex: 1;
`;

const ItemPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 1rem;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #a0a0a0;
  font-size: 0.9rem;
`;

const DiscountedPrice = styled.span`
  color: #646cff;
  font-weight: 700;
  font-size: 1.1rem;
`;

const ItemDescription = styled.p`
  color: #b0b0b0;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const ItemMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const KcalBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #2a2a2a;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #b0b0b0;
`;

const Allergens = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const AllergenTag = styled.span`
  background: #2a2a2a;
  color: #b0b0b0;
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 500;
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 4rem;
  background: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin: 2rem auto;

  h3 {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #b0b0b0;
  }
`;

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  position: relative;
  background: #1e1e1e;
  padding: 2.5rem;
  border-radius: 16px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #646cff;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1.5rem;
`;

const ModalItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalItemTitle = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin: 0;
  font-weight: 700;
`;

const ModalItemPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 1rem;
`;

const ModalItemDescription = styled.p`
  color: #b0b0b0;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const NutritionInfo = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const NutritionBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #2a2a2a;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: white;
`;

const AllergensSection = styled.div`
  h4 {
    color: white;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
`;

const AllergensGrid = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const AllergenPill = styled.span`
  background: #2a2a2a;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
`;

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
      stroke="#ff6b6b"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ViewMenuDark;

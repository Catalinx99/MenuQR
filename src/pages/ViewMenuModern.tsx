import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "@styled-icons/boxicons-regular/Search";
import { X } from "@styled-icons/boxicons-regular/X";

export const LightThemeViewMenu = ({ currentMenu }: any) => {
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
    <LightThemeContainer>
      <HeroHeader>
        <MenuImage src={currentMenu.imageUrl} alt={currentMenu.name} />
        <GradientOverlay />
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
              <CategoryIconWrapper>
                <img
                  className="category-icon"
                  src={category.iconUrl}
                  alt={category.name}
                />
              </CategoryIconWrapper>
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
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
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
    </LightThemeContainer>
  );
};

// Light Theme Styled Components
const LightThemeContainer = styled.div`
  background: #f8f5f2;
  color: #333;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
`;

const HeroHeader = styled.div`
  position: relative;
  height: 250px;
  margin-bottom: 4rem;
  border-radius: 0 0 30px 30px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(45, 62, 80, 0.8) 0%,
    rgba(255, 107, 107, 0.4) 100%
  );
`;

const MenuImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroTitle = styled.h1`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  color: white;
  font-size: 3.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  max-width: 70%;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2rem;
    left: 1rem;
    bottom: 1rem;
  }
`;

const MainContent = styled.div`
  padding: 0 2rem 4rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto 4rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1.2rem 2rem 1.2rem 4rem;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  background: white;
  color: #333;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2d3e50;
    box-shadow: 0 4px 15px rgba(45, 62, 80, 0.1);
  }

  &::placeholder {
    color: #a0a0a0;
    font-weight: 300;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #2d3e50;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #a0a0a0;
  transition: color 0.2s;

  &:hover {
    color: #ff6b6b;
  }
`;

const ClearIcon = styled(X)`
  color: inherit;
`;

const CategoriesNav = styled.nav`
  display: flex;
  gap: 2rem;
  padding: 2rem 0;
  margin: 0 auto 4rem;
  overflow-x: auto;
  border-bottom: 2px solid #eee;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryButton = styled(motion.button)`
  padding: 1rem;
  border: none;
  background: transparent;
  color: #666;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &:hover {
    color: #2d3e50;
    transform: translateY(-3px);
  }
`;

const CategoryIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  ${CategoryButton}:hover & {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(45, 62, 80, 0.1);
  }

  .category-icon {
    width: 50%;
    height: 50%;
    object-fit: contain;
  }
`;

const CategoryName = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  white-space: nowrap;
  color: #444;
`;

const MenuContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const CategorySection = styled(motion.section)`
  margin-bottom: 5rem;
  padding: 1rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
`;

const CategoryTitle = styled.h2`
  font-size: 2rem;
  color: #2d3e50;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #eee;
  font-weight: 600;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
`;

const MenuItemCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #eee;
`;

const ItemImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
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
  background: #ff6b6b;
  color: white;
  padding: 0.3rem 2.5rem;
  font-size: 0.9rem;
  transform: rotate(45deg);
  font-weight: 600;
`;

const ItemContent = styled.div`
  padding: 2rem;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ItemTitle = styled.h3`
  font-size: 1.3rem;
  color: #2d3e50;
  margin: 0;
  font-weight: 600;
`;

const ItemPrice = styled.div`
  font-size: 1.2rem;
  color: #ff6b6b;
  font-weight: 700;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #a0a0a0;
  font-size: 0.9rem;
  display: block;
`;

const DiscountedPrice = styled.span`
  color: #ff6b6b;
  font-weight: 700;
`;

const ItemDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-weight: 300;
`;

const ItemMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const KcalBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8f5f2;
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  font-size: 0.9rem;
  color: #666;
`;

const Allergens = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const AllergenTag = styled.span`
  background: #f8f5f2;
  color: #666;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 0.8rem;
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 2rem auto;

  h3 {
    font-size: 1.5rem;
    color: #2d3e50;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    color: #666;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #ff6b6b;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 2rem;
`;

const ModalItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ModalItemTitle = styled.h3`
  font-size: 2rem;
  color: #2d3e50;
  margin: 0;
  font-weight: 700;
`;

const ModalItemPrice = styled.div`
  font-size: 1.5rem;
  color: #ff6b6b;
  font-weight: 700;
`;

const ModalItemDescription = styled.p`
  color: #666;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
`;

const NutritionInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
`;

const NutritionBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: #f8f5f2;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  font-size: 1rem;
  color: #2d3e50;
`;

const AllergensSection = styled.div`
  h4 {
    color: #2d3e50;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }
`;

const AllergensGrid = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const AllergenPill = styled.span`
  background: #f8f5f2;
  color: #2d3e50;
  padding: 0.8rem 1.2rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const FireIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="#ff6b6b"
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

export default LightThemeViewMenu;

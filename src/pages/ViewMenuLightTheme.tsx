import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "@styled-icons/boxicons-regular/Search";
import { X } from "@styled-icons/boxicons-regular/X";

export const ViewMenuLight = ({ currentMenu, preview }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  console.log(preview, "preview");

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

  const handleClearSearch = () => setSearchQuery("");

  useEffect(() => {
    const slider = document.querySelector(".categories-nav") as HTMLElement;
    if (!slider) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleEvent = {
      start: (e: MouseEvent) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      },
      end: () => {
        isDown = false;
        slider.classList.remove("active");
      },
      move: (e: MouseEvent) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      },
    };

    slider.addEventListener("mousedown", handleEvent.start);
    slider.addEventListener("mouseleave", handleEvent.end);
    slider.addEventListener("mouseup", handleEvent.end);
    slider.addEventListener("mousemove", handleEvent.move);

    return () => {
      slider.removeEventListener("mousedown", handleEvent.start);
      slider.removeEventListener("mouseleave", handleEvent.end);
      slider.removeEventListener("mouseup", handleEvent.end);
      slider.removeEventListener("mousemove", handleEvent.move);
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
        <HeroTitle>{currentMenu.name}</HeroTitle>
      </HeroHeader>
      <StickyNavWrapper>
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
              <CategoryName>{category.name}</CategoryName>
              <CategoryIndicator />
            </CategoryButton>
          ))}
        </CategoriesNav>
      </StickyNavWrapper>
      <MainContent>
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
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                      }}
                      onClick={() => setSelectedItem(item)}
                    >
                      <ItemImageContainer>
                        <ItemImage src={item.image} alt={item.name} />
                        {item.discountPrice && (
                          <DiscountBadge>
                            {Math.round(
                              ((item.price - item.discountPrice) / item.price) *
                                100
                            )}
                            %
                          </DiscountBadge>
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
                        <ItemDescription>{item.description}</ItemDescription>
                        <ItemMeta>
                          <NutritionInfo>
                            <KcalBadge>
                              <FireIcon />
                              <div
                                style={{
                                  display: "flex",
                                  textWrapMode: "nowrap",
                                }}
                              >
                                {item.kcal} kcal
                              </div>
                            </KcalBadge>
                            {item.protein && (
                              <span>{item.protein}g protein</span>
                            )}
                          </NutritionInfo>
                          {/* <Allergens>
                            {item.allergens.slice(0, 3).map((allergen: any) => (
                              <AllergenTag key={allergen}>
                                {allergen}
                              </AllergenTag>
                            ))}
                          </Allergens> */}
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
              <p>Try different search terms</p>
            </EmptyState>
          )}
        </MenuContent>
      </MainContent>

      {selectedItem && (
        <ModalOverlay onClick={() => setSelectedItem(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalCloseButton onClick={() => setSelectedItem(null)}>
              <X size={24} />
            </ModalCloseButton>
            <ModalImageWrapper>
              <ModalImage src={selectedItem.image} alt={selectedItem.name} />
            </ModalImageWrapper>
            <ModalBody>
              <ModalHeader>
                <ModalTitle>{selectedItem.name}</ModalTitle>
                <ModalPrice>
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
                </ModalPrice>
              </ModalHeader>
              <ModalDescription>{selectedItem.description}</ModalDescription>

              <NutritionSection>
                <h4>Nutrition Information</h4>
                <NutritionGrid>
                  <NutritionItem>
                    <span>Calories</span>
                    <span>{selectedItem.kcal}</span>
                  </NutritionItem>
                  {selectedItem.protein && (
                    <NutritionItem>
                      <span>Protein</span>
                      <span>{selectedItem.protein}g</span>
                    </NutritionItem>
                  )}
                  {selectedItem.carbs && (
                    <NutritionItem>
                      <span>Carbs</span>
                      <span>{selectedItem.carbs}g</span>
                    </NutritionItem>
                  )}
                </NutritionGrid>
              </NutritionSection>

              <AllergensSection>
                <h4>Contains:</h4>
                <AllergenTags>
                  {selectedItem.allergens.map((a: any) => (
                    <AllergenPill key={a}>{a}</AllergenPill>
                  ))}
                </AllergenTags>
              </AllergensSection>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </LightThemeContainer>
  );
};

const CategoryName = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  white-space: nowrap;
  color: #444;
`;

// New Light Theme Styled Components
const LightThemeContainer = styled.div`
  background: #f8f9fa;
  color: #495057;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
`;

const HeroHeader = styled.div`
  position: relative;
  height: 250px;
  background: linear-gradient(45deg, #2c6e49 0%, #4c956c 100%);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: -50px;
    left: 0;
    width: 100%;
    height: 100px;
    background: #f8f9fa;
    clip-path: ellipse(70% 100% at 50% 100%);
  }
`;

const MenuImage = styled.img`
  position: absolute;
  opacity: 0.65;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroTitle = styled.h1`
  position: relative;
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  z-index: 1;
  text-align: center;
  padding: 0 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const MainContent = styled.div`
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: sticky;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const StickyNavWrapper = styled.div`
  /* position: sticky;
  top: -6px;
  background: #f8f9fa;
  z-index: 100;
  padding: 1rem 0; */
  position: sticky;
  top: -6px;
  background: rgba(250, 248, 245, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 1rem;
  z-index: 1000;
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1.5rem 0.75rem 3rem;
  border: 2px solid #dde5b6;
  border-radius: 30px;
  background: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  color: #2c6e49;

  &:focus {
    outline: none;
    border-color: #adc178;
    box-shadow: 0 0 0 3px rgba(173, 193, 120, 0.2);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #adc178;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #adb5bd;
  transition: color 0.2s;

  &:hover {
    color: #2c6e49;
  }
`;

const ClearIcon = styled(X)`
  color: inherit;
`;

const CategoriesNav = styled.nav`
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
  overflow-x: auto;
  scroll-behavior: smooth;
  margin-bottom: 2rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryButton = styled(motion.button)`
  padding: 0.5rem 1.5rem;
  border: 2px solid #dde5b6;
  background: transparent;
  border-radius: 30px;
  color: #2c6e49;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #f0f3e8;
    transform: translateY(-2px);
  }

  &.active {
    background: #2c6e49;
    color: white;
    border-color: #2c6e49;
  }
`;

const CategoryIndicator = styled.div`
  width: 8px;
  height: 8px;
  background: #adc178;
  border-radius: 50%;
`;

const MenuContent = styled.div`
  padding-bottom: 4rem;
  max-width: 1280px;
  padding-top: 1rem;
`;

const CategorySection = styled(motion.section)`
  margin-bottom: 3rem;
`;

const CategoryTitle = styled.h2`
  font-size: 1.5rem;
  color: #2c6e49;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #dde5b6;
  font-weight: 600;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MenuItemCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  cursor: pointer;

  @media (min-width: 768px) {
    flex-direction: row;
    height: 200px;
  }
`;

const ItemImageContainer = styled.div`
  position: relative;
  flex: 0 0 150px;
  height: 200px;
  overflow: hidden;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${MenuItemCard}:hover & {
    transform: scale(1.05);
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.2rem;
  background: #2c6e49;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const ItemContent = styled.div`
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const ItemTitle = styled.h3`
  font-size: 1.1rem;
  color: #2c6e49;
  margin: 0;
  font-weight: 600;
`;

const ItemPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 1rem;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #adb5bd;
  font-size: 0.85rem;
`;

const DiscountedPrice = styled.span`
  color: #d68c45;
  font-weight: 700;
  font-size: 1.1rem;
`;

const ItemDescription = styled.p`
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex-grow: 1;
`;

const ItemMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const NutritionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #868e96;
  font-size: 0.85rem;
`;

const KcalBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: #f1f3f5;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
`;

const Allergens = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const AllergenTag = styled.span`
  background: #f1f3f5;
  color: #495057;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin: 2rem 0;

  h3 {
    color: #2c6e49;
    margin-bottom: 0.5rem;
  }

  p {
    color: #868e96;
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #868e96;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #2c6e49;
  }
`;

const ModalImageWrapper = styled.div`
  height: 250px;
  overflow: hidden;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h3`
  color: #2c6e49;
  font-size: 1.5rem;
  margin: 0;
`;

const ModalPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ModalDescription = styled.p`
  color: #495057;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const NutritionSection = styled.div`
  margin-bottom: 1.5rem;

  h4 {
    color: #2c6e49;
    margin-bottom: 1rem;
  }
`;

const NutritionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
`;

const NutritionItem = styled.div`
  display: flex;
  justify-content: space-between;
  color: #495057;
  font-size: 0.9rem;
`;

const AllergensSection = styled.div`
  h4 {
    color: #2c6e49;
    margin-bottom: 1rem;
  }
`;

const AllergenTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const AllergenPill = styled.span`
  background: #f1f3f5;
  color: #495057;
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
      stroke="#d68c45"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ViewMenuLight;

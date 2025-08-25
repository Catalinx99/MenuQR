import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "@styled-icons/boxicons-regular/Search";
import { X } from "@styled-icons/boxicons-regular/X";

export const FineDiningMenu = ({ currentMenu }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);

  const [data, setData] = useState([]);
  console.log(currentMenu, "selectedCategory");

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

  useEffect(() => {
    if (filteredCategories.length > 0) {
      setData(filteredCategories);

      if (searchQuery) {
        setTimeout(() => {
          const firstCategoryId = filteredCategories[0].id;
          const el = document.getElementById(firstCategoryId);
          if (el) {
            el.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          }
        }, 300);
      }
    }
  }, [searchQuery]);

  console.log(filteredCategories, "filteredCategories");

  const handleClearSearch = () => setSearchQuery("");

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
    <ElegantContainer>
      <ParallaxHeader imageUrl={currentMenu.imageUrl}>
        <HeaderOverlay>
          <RestaurantName>{currentMenu.name}</RestaurantName>
          <RestaurantSubtitle>Michelin Star Experience</RestaurantSubtitle>
        </HeaderOverlay>
      </ParallaxHeader>

      <StickyToolbar>
        <SearchContainer>
          <SearchInput
            placeholder="Search our gastronomic offerings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon size="22" />
          {searchQuery && (
            <ClearButton onClick={handleClearSearch}>
              <ClearIcon size="20" />
            </ClearButton>
          )}
        </SearchContainer>

        {!searchQuery && (
          <CategoriesNav>
            {currentMenu.categories.map((category: any) => (
              <NavPill
                key={category.id}
                onClick={() => {
                  document
                    .getElementById(category.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                  setSelectedCategory(category);
                }}
              >
                {category.name}
              </NavPill>
            ))}
          </CategoriesNav>
        )}
      </StickyToolbar>
      <MainContent>
        <MenuSections>
          <AnimatePresence>
            {data.map((category: any) => (
              <Section
                key={category.id}
                id={category.id}
                $hasSelectedCategory={selectedCategory?.id === category.id}
              >
                <CategoryTitle>{category.name}</CategoryTitle>
                <DishGrid>
                  {category.items.map((item: any) => (
                    <DishCard
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <DishImageContainer>
                        <DishImage src={item.image} />
                        {/* <PriceTag>€{item.price.toFixed(2)}</PriceTag> */}
                        {console.log(item, "item.discountPrice")}
                        {item.discountPrice ? (
                          <PriceTag>
                            <OriginalPrice>
                              ${item.price.toFixed(2)}
                            </OriginalPrice>
                            <DiscountedPrice>
                              ${item.discountPrice.toFixed(2)}
                            </DiscountedPrice>
                          </PriceTag>
                        ) : (
                          <PriceTag>€{item.price.toFixed(2)}</PriceTag>
                        )}
                      </DishImageContainer>
                      <DishDetails>
                        <DishName>{item.name}</DishName>
                        <DishDescription>{item.description}</DishDescription>
                        <WinePairing>
                          Pairs with: {item.winePairing}
                        </WinePairing>
                      </DishDetails>
                    </DishCard>
                  ))}
                </DishGrid>
              </Section>
            ))}
          </AnimatePresence>

          {filteredCategories.length === 0 && (
            <EmptyState>
              <h3>No items found</h3>
              <p>Try different search terms</p>
            </EmptyState>
          )}
        </MenuSections>
      </MainContent>

      {selectedItem && (
        <DishModal onClick={() => setSelectedItem(null)}>
          <ModalContent>
            <ModalHeader>
              <ModalDishName>{selectedItem.name}</ModalDishName>
              <ModalClose onClick={() => setSelectedItem(null)}>
                <X size={28} />
              </ModalClose>
            </ModalHeader>
            <ModalImage src={selectedItem.image} />
            <ModalBody>
              <ModalDescription>{selectedItem.description}</ModalDescription>
              <CulinaryDetails>
                <DetailItem>
                  <DetailLabel>Preparation Time</DetailLabel>
                  <DetailValue>{selectedItem.preparationTime}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Signature Technique</DetailLabel>
                  <DetailValue>{selectedItem.technique}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Wine Pairing</DetailLabel>
                  <DetailValue>{selectedItem.winePairing}</DetailValue>
                </DetailItem>
              </CulinaryDetails>
              <AllergenSection>
                <AllergenTitle>Composition</AllergenTitle>
                <AllergenTags>
                  {selectedItem.allergens.map((a: string) => (
                    <Allergen key={a}>{a}</Allergen>
                  ))}
                </AllergenTags>
              </AllergenSection>
            </ModalBody>
          </ModalContent>
        </DishModal>
      )}
    </ElegantContainer>
  );
};

// Styled Components
const ElegantContainer = styled.div`
  background: #faf8f5;
  color: #2a2a2a;
  min-height: 100vh;
  font-family: "Cormorant Garamond", serif;
`;

const ParallaxHeader = styled.div<{ imageUrl: string }>`
  height: 70vh;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url(${(props) => props.imageUrl});
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const HeaderOverlay = styled.div`
  position: absolute;
  bottom: 15%;
  left: 10%;
  color: white;
`;

const RestaurantName = styled.h1`
  font-size: 4rem;
  margin: 0;
  font-weight: 300;
  letter-spacing: 2px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`;

const RestaurantSubtitle = styled.p`
  font-size: 1.2rem;
  letter-spacing: 1.5px;
  margin-top: 0.5rem;
  font-family: "Lato", sans-serif;
  font-weight: 300;
`;

const MainContent = styled.div`
  padding: 2rem 10%;
`;

const StickyToolbar = styled.div`
  position: sticky;
  top: -6px;
  background: rgba(250, 248, 245, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 1rem;
  z-index: 1000;
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin-bottom: 0.85rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.7rem 0.7rem 0.7rem 2.7rem;
  border: 1px solid #e0d8cf;
  background: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  font-family: "Lato", sans-serif;
  transition: all 0.3s ease;
  color: #8a7968;

  &:focus {
    outline: none;
    background: white;
    border-color: #c5b8a7;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #8a7968;
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
  gap: 1.5rem;
  overflow-x: auto;
  padding: 0.3rem;
  padding-bottom: 0.5rem;
`;

const NavPill = styled.button`
  padding: 0.55rem 1.25rem;
  border: 1px solid #e0d8cf;
  background: transparent;
  color: #5a524a;
  font-family: "Cormorant Garamond", serif;
  font-size: 1.1rem;
  white-space: nowrap;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #8a7968;
    color: white;
    border-color: #8a7968;
  }
  &:active {
    background: #8a7968;
    color: white;
    border-color: #8a7968;
  }
`;

const MenuSections = styled.div`
  margin-top: 3rem;
  padding-bottom: 20rem;
`;

const Section = styled.section<{ $hasSelectedCategory?: boolean }>`
  margin-bottom: 2rem;
  scroll-margin-top: 80px;

  padding-top: ${({ $hasSelectedCategory }) =>
    $hasSelectedCategory ? "4rem" : "1rem"};
`;

const CategoryTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 1rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 1px;
    background: #8a7968;
  }
`;

const DishGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const DishCard = styled(motion.div)`
  background: white;
  border: 1px solid #f0ece6;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const DishImageContainer = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
`;

const DishImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PriceTag = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(138, 121, 104, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  font-family: "Lato", sans-serif;
  font-weight: 300;
`;

const PriceTagDiscount = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(254, 254, 254, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  font-family: "Lato", sans-serif;
  font-weight: 300;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: white;
  font-size: 0.9rem;
  margin-right: 1rem;
`;

const DiscountedPrice = styled.span`
  color: #e63946; // roșu pentru reducere
  font-weight: bold;
  font-size: 1rem;
`;

const DishDetails = styled.div`
  padding: 1.5rem;
`;

const DishName = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  font-weight: 500;
`;

const DishDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-family: "Lato", sans-serif;
  font-weight: 300;
`;

const WinePairing = styled.div`
  font-size: 0.9rem;
  color: #8a7968;
  font-style: italic;
`;

// Modal Styles
const DishModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.508);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: white;
  max-width: 800px;
  width: 100%;
  max-height: 80vh;
  overflow: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid #f0ece6;
  top: env(safe-area-inset-top, 0);
`;

const ModalDishName = styled.h2`
  font-size: 2rem;
  margin: 0;
  font-weight: 500;
`;

const ModalClose = styled.button`
  background: none;
  border: none;
  color: #8a7968;
  cursor: pointer;
  padding: 0.5rem;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  padding: 0 10px;
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const ModalDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #555;
`;

const CulinaryDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const DetailItem = styled.div`
  text-align: center;
  padding: 1.5rem;
  border: 1px solid #f0ece6;
`;

const DetailLabel = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 0.9rem;
  color: #8a7968;
  margin-bottom: 0.5rem;
`;

const DetailValue = styled.div`
  font-size: 1.2rem;
  font-weight: 300;
`;

const AllergenSection = styled.div`
  padding-top: 2rem;
`;

const AllergenTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const AllergenTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Allergen = styled.span`
  background: #f8f6f3;
  color: #8a7968;
  padding: 0.5rem 1rem;
  border: 1px solid #e0d8cf;
  font-size: 0.9rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 12px;
    color: #333;
  }

  p {
    font-size: 1rem;
    color: #888;
  }
`;

export default FineDiningMenu;

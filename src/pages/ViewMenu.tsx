import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "@styled-icons/boxicons-regular/Search";
import { X } from "@styled-icons/boxicons-regular/X"; // Importă X icon

export const ViewMenu = ({ currentMenu }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any | null>(null); // State for the selected item

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
  // const categories = Array.from({ length: 10 }, (_, index) => ({
  //   id: `category-${index + 1}`,
  //   name: `Category ${index + 1}`,
  // }));

  useEffect(() => {
    const slider = document.querySelector(".categories-nav") as HTMLElement;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    if (!slider) return;

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
    <>
      <Header>
        <MenuImage
          src={currentMenu.imageUrl} // URL-ul imaginii dinamic pentru fiecare meniu
          alt={currentMenu.name}
        />
        <Title>{currentMenu.name}</Title>
      </Header>
      <Container>
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

        <CategoriesNav>
          {currentMenu.categories.map((category: any) => (
            <CategoryButton
              key={category.id}
              onClick={() => {
                const element = document.getElementById(category.id);
                console.log(element, "element");

                element?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="image-container">
                <img
                  className="category-image"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHaRPLGAmlWmZd6iDfNfbFsXLpcXQSY_PgxQ&s"
                  alt={category.name}
                />
              </div>
              <span className="category-name">{category.name}</span>
            </CategoryButton>
          ))}
        </CategoriesNav>

        <PreviewContent>
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
                <Items>
                  {category.items.map((item: any) => (
                    <MenuItem
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                      }}
                      onClick={() => openModal(item)}
                    >
                      <ItemImage src={item.image} alt={item.name} />
                      <ItemContent>
                        <ItemHeader>
                          <ItemTitle>{item.name}</ItemTitle>
                          <ItemPrice>
                            {item.discountPrice ? (
                              <>
                                <ItemPriceWrapper>
                                  <DiscountBadge>
                                    {`-${Math.round(
                                      ((item.price - item.discountPrice) /
                                        item.price) *
                                        100
                                    )}%`}
                                  </DiscountBadge>
                                  <OriginalPrice>
                                    ${item.price.toFixed(2)}
                                  </OriginalPrice>
                                  <DiscountedPrice>
                                    ${item.discountPrice.toFixed(2)}
                                  </DiscountedPrice>
                                </ItemPriceWrapper>
                              </>
                            ) : (
                              <span>${item.price.toFixed(2)}</span>
                            )}
                          </ItemPrice>
                        </ItemHeader>
                        <ItemDescription>
                          {item.description.length > 50
                            ? item.description.substring(0, 50) + "..."
                            : item.description}
                        </ItemDescription>
                        <ItemMeta>
                          <KcalBadge>
                            <FireIcon />
                            {item.kcal} kcal
                          </KcalBadge>
                          <Allergens>
                            {item.allergens.slice(0, 2).map((allergen: any) => (
                              <AllergenTag key={allergen}>
                                {allergen}
                              </AllergenTag>
                            ))}
                            {item.allergens.length > 2 && (
                              <AllergenTag>
                                +{item.allergens.length - 2}
                              </AllergenTag>
                            )}
                          </Allergens>
                        </ItemMeta>
                      </ItemContent>
                    </MenuItem>
                  ))}
                </Items>
              </CategorySection>
            ))}
          </AnimatePresence>

          {filteredCategories.length === 0 && (
            <EmptyState>
              <h3>No items found</h3>
              <p>Try adjusting your search terms</p>
            </EmptyState>
          )}
        </PreviewContent>
      </Container>

      {/* Modal for displaying detailed item info */}
      {selectedItem && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ItemImage src={selectedItem.image} alt={selectedItem.name} />
            <ItemTitle>{selectedItem.name}</ItemTitle>
            <ItemPrice>
              {selectedItem.discountPrice ? (
                <>
                  <ItemPriceWrapper>
                    <DiscountBadge>
                      {`-${Math.round(
                        ((selectedItem.price - selectedItem.discountPrice) /
                          selectedItem.price) *
                          100
                      )}%`}
                    </DiscountBadge>
                    <OriginalPrice>
                      ${selectedItem.price.toFixed(2)}
                    </OriginalPrice>
                    <DiscountedPrice>
                      ${selectedItem.discountPrice.toFixed(2)}
                    </DiscountedPrice>
                  </ItemPriceWrapper>
                </>
              ) : (
                <span>${selectedItem.price.toFixed(2)}</span>
              )}
            </ItemPrice>
            <ItemDescription>{selectedItem.description}</ItemDescription>
            <ItemMeta>
              <KcalBadge>
                <FireIcon />
                {selectedItem.kcal} kcal
              </KcalBadge>
              <Allergens style={{ flexWrap: "wrap", justifyContent: "end" }}>
                {selectedItem.allergens.map((allergen: any) => (
                  <AllergenTag key={allergen}>{allergen}</AllergenTag>
                ))}
              </Allergens>
            </ItemMeta>
            <CloseButton onClick={closeModal}>Close</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

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
  z-index: 100;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;

  &:hover {
    background: #4f46e5;
  }
`;

// Styled Components with responsive design adjustments

const Container = styled.div`
  padding: 2rem;
  padding-top: 3rem;
  background: #f8fafc;
  min-height: 100vh;
  width: 100vw;
  min-width: 100%;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  background-color: #ccc;
  overflow: hidden;
`;

const MenuImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(50%);
`;

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.85);
  font-family: "Bebas Neue", sans-serif;
  font-size: 5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 6px;
  line-height: 1.1;
  white-space: nowrap;
  text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.6);
  padding: 0 2rem;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 3.5rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto 2rem;
  padding-top: 5rem;
`;

const SearchInput = styled.input`
  width: 70%;
  padding: 1rem 1.5rem;
  padding-left: 3rem;
  border: none;
  border-radius: 50px;
  background: white;
  color: #475569;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  font-size: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.15);
  }

  @media (max-width: 600px) {
    width: 100%;
    font-size: 0.9rem;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 83%;
  transform: translateY(-50%);
  color: #64748b;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 83%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const ClearIcon = styled(X)`
  color: #64748b;
`;

// const CategoriesNav = styled.nav`
//   display: flex;
//   gap: 1rem;
//   padding: 4rem 1rem;
//   margin-bottom: 2rem;
//   overflow-x: auto;
//   position: sticky;
//   top: 0;
//   background: #f8fafc;
//   z-index: 10;
//   max-width: 600px;
//   margin: 0 auto;
// `;

const CategoriesNav = styled.nav`
  display: flex;
  gap: 2rem;
  padding: 2rem 1rem;
  margin: 0 auto 2rem;
  overflow-x: auto;
  top: 0;
  background: #f8fafc;
  z-index: 10;
  max-width: 600px;
  scroll-behavior: smooth;
  cursor: grab;

  /* Hide scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  &:active {
    cursor: grabbing;
  }
`;

const CategoryButton = styled(motion.button)`
  padding: 1rem;
  border: none;
  border-radius: 16px;
  background: #ffffff;
  color: #475569;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  min-width: 120px;

  &:hover {
    background: #6366f1;
    color: white;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);

    img {
      transform: scale(1.05);
    }
  }

  .category-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #e2e8f0;
    transition: all 0.3s ease;
  }

  .category-name {
    font-size: 0.9rem;
    text-align: center;
    font-weight: 600;
    max-width: 100px;
    white-space: normal;
  }
`;

const PreviewContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const CategorySection = styled(motion.section)`
  margin-bottom: 3rem;
`;

const CategoryTitle = styled.h2`
  font-size: 1.75rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;
`;

const MenuItem = styled(motion.div)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 2px solid #f1f5f9;
`;

const ItemContent = styled.div`
  padding: 1.25rem;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const ItemTitle = styled.h3`
  font-size: 1.125rem;
  color: #1e293b;
  margin: 0;
  font-weight: 600;
`;

const ItemPrice = styled.span`
  font-size: 1.125rem;
  color: #6366f1;
  font-weight: 600;
`;

const ItemDescription = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const KcalBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f1f5f9;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  color: #475569;
  white-space: nowrap;
`;

const ItemMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Allergens = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-start;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
`;

const AllergenTag = styled.span`
  background: #fff;
  color: #6366f1;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  border: 1px solid #e2e8f0;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.25rem;
    color: #1e293b;
  }

  p {
    font-size: 1rem;
    color: #475569;
  }
`;

const ItemPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 25px;
`;

const DiscountBadge = styled.span`
  position: absolute;
  top: -20px;
  left: 0;
  background-color: red;
  color: white;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 0.7rem;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: gray;
  margin-right: 0.5rem;
`;

const DiscountedPrice = styled.span`
  color: red;
  font-weight: bold;
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
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ViewMenu;

// import { useState } from "react";
// import styled, { createGlobalStyle, css } from "styled-components";
// import { FineDiningMenu } from "./ViewMenuFineDining";
// import { LightThemeViewMenu } from "./ViewMenuModern";
// import { ViewMenuDark } from "./ViewMenuDark";
// import { ViewMenuLight } from "./ViewMenuLightTheme";

// const mockMenu = {
//   id: "menu1746167888684OqsZlshbVefuOWL2V3vOgQXYXpf1",
//   name: "French Food",
//   description:
//     "Delicious French cuisine with fresh ingredients and traditional recipes.",
//   imageUrl:
//     "https://frenchsidetravel.com/wp-content/uploads/2022/06/food-french-shutterstock.jpg",
//   lastUpdated: "2025-05-02",
//   templateType: "standard",
//   categories: [
//     {
//       id: "cat1746167901317",
//       name: "Bagette & L",
//       items: [
//         {
//           id: "item1746167924405",
//           name: "Bagheta",
//           description: "Freshly baked baguette with a crispy crust.",
//           price: 4,
//           allergens: ["Gluten"],
//           image:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4m6968bUzDqoStvmPXd7T56bXztl-NABSUw&s",
//           kcal: 250,
//         },
//         {
//           id: "item1746167924410",
//           name: "Macarons",
//           description: "Colorful French macarons with assorted flavors.",
//           price: 30,
//           discountPrice: 29,
//           allergens: ["Eggs", "Nuts", "Milk"],
//           image:
//             "https://www.southernliving.com/thmb/dnsycw_-mf35yKMacarons_025-0e05e0cd226d44609f55ed8bc9cd3a3e.jpg",
//           kcal: 400,
//         },
//         {
//           id: "item1747203416276",
//           name: "Ciocolata calda cu frișcă",
//           description: "Rich hot chocolate topped with whipped cream.",
//           price: 30,
//           allergens: ["Milk"],
//           kcal: 300,
//         },
//         {
//           id: "item1747203416277",
//           name: "Biscuiți cu frișcă",
//           description: "Biscuiți fragezi cu cremă de ciocolată și frișcă.",
//           price: 30,
//           allergens: ["Gluten", "Milk"],
//           image:
//             "https://adygio.com/wp-content/uploads/2017/10/tort-de-biscuiti-cu-frisca-presare-biscuiti.jpg",
//           kcal: 300,
//         },
//       ],
//     },
//     {
//       id: "cat1746700515521",
//       name: "Beef",
//       items: [
//         {
//           id: "item1746700516000",
//           name: "Steak de vită",
//           description: "Juicy grilled beef steak served with herbs.",
//           price: 45,
//           allergens: [],
//           image:
//             "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80",
//           kcal: 600,
//         },
//       ],
//     },
//     {
//       id: "cat1747292200409",
//       name: "Beer",
//       items: [
//         {
//           id: "item1747292200410",
//           name: "Craft Beer",
//           description: "Locally brewed craft beer with rich aroma.",
//           price: 8,
//           allergens: ["Barley"],
//           image:
//             "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
//           kcal: 150,
//         },
//         {
//           id: "item1747292200411",
//           name: "Light Lager",
//           description: "Refreshing light lager, perfect with meals.",
//           price: 7,
//           allergens: ["Barley"],
//           kcal: 120,
//         },
//       ],
//     },
//     {
//       id: "cat1747292260051",
//       name: "Wine",
//       items: [
//         {
//           id: "item1747292260052",
//           name: "Red Wine",
//           description: "Full-bodied red wine from Bordeaux.",
//           price: 50,
//           allergens: [],
//           image:
//             "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=400&q=80",
//           kcal: 100,
//         },
//       ],
//     },
//   ],
// };
// const themes = [
//   {
//     id: "fine-dining",
//     name: "Fine Dining",
//     component: <FineDiningMenu currentMenu={mockMenu} />,
//     description: "Elegant theme with parallax effects and detailed modals",
//   },
//   {
//     id: "light-theme",
//     name: "Light Theme",
//     component: <LightThemeViewMenu currentMenu={mockMenu} />,
//     description: "Clean, minimal interface with light colors",
//   },
//   {
//     id: "dark-theme",
//     name: "Dark Theme",
//     component: <ViewMenuDark currentMenu={mockMenu} />,
//     description: "Modern dark mode with high contrast",
//   },
//   {
//     id: "classic",
//     name: "Classic",
//     component: <ViewMenuLight currentMenu={mockMenu} />,
//     description: "Traditional restaurant menu layout",
//   },
// ];

// const GlobalStyles = createGlobalStyle`
//   body {
//     margin: 0;
//     font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
//   }
// `;

// export const ThemePreviewPage = () => {
//   const [selectedId, setSelectedId] = useState("fine-dining");
//   const selectedTheme = themes.find((t) => t.id === selectedId);

//   return (
//     <Wrapper>
//       <Sidebar>
//         <Header>
//           <Title>Theme Gallery</Title>
//           <Subtitle>Preview restaurant menu templates</Subtitle>
//         </Header>
//         <ThemeGrid>
//           {themes.map((theme) => (
//             <ThemeCard
//               key={theme.id}
//               onClick={() => setSelectedId(theme.id)}
//               $isSelected={selectedId === theme.id}
//             >
//               <ThemeThumbnail>
//                 {theme.id === selectedId && <ActiveIndicator />}

//                 <ThemeImage $bg={theme.id}>
//                   <img src={mockMenu.imageUrl} />
//                 </ThemeImage>
//               </ThemeThumbnail>
//               <ThemeInfo>
//                 <ThemeName $isSelected={selectedId === theme.id}>
//                   {theme.name}
//                 </ThemeName>
//                 <ThemeDescription>{theme.description}</ThemeDescription>
//               </ThemeInfo>
//             </ThemeCard>
//           ))}
//         </ThemeGrid>
//       </Sidebar>

//       <PreviewSection>
//         <PhoneContainer>
//           <PhoneFrame>
//             <PhoneNotch />
//             <PhoneScreen>
//               <PhoneContent>{selectedTheme?.component}</PhoneContent>
//             </PhoneScreen>
//           </PhoneFrame>
//         </PhoneContainer>
//       </PreviewSection>
//     </Wrapper>
//   );
// };

// // Styled Components
// const Wrapper = styled.div`
//   padding: 6rem 1.5rem;
//   display: grid;
//   grid-template-columns: minmax(1000px, 25%) 1fr;
//   min-height: 100vh;
//   background: #f8f9fa;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//     grid-template-rows: auto 1fr;
//   }
// `;

// const Sidebar = styled.div`
//   padding: 2rem 1.5rem;
//   background: #ffffff;
//   box-shadow: 16px 0 32px rgba(0, 0, 0, 0.03);
//   overflow-y: auto;
// `;

// const Header = styled.header`
//   margin-bottom: 2rem;
//   padding-bottom: 1.5rem;
//   border-bottom: 1px solid #eee;
// `;

// const Title = styled.h1`
//   font-size: 1.75rem;
//   margin: 0 0 0.25rem;
//   color: #2d3436;
//   font-weight: 600;
// `;

// const Subtitle = styled.p`
//   color: #666;
//   margin: 0;
//   font-size: 0.9rem;
// `;

// const ThemeGrid = styled.div`
//   display: grid;
//   gap: 1.5rem;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
// `;

// const ThemeCard = styled.div<{ $isSelected: boolean }>`
//   border: 1px solid ${({ $isSelected }) => ($isSelected ? "#8a7968" : "#eee")};
//   border-radius: 12px;
//   overflow: hidden;
//   background: white;
//   cursor: pointer;
//   transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
//   transform: translateY(0);
//   position: relative;

//   ${({ $isSelected }) =>
//     $isSelected &&
//     css`
//       border-color: #8a7968;
//       box-shadow: 0 8px 16px rgba(138, 121, 104, 0.15);
//     `}

//   &:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
//   }
// `;

// const ThemeThumbnail = styled.div`
//   height: 180px;
//   position: relative;
//   overflow: hidden;
//   border-bottom: 1px solid #f0f0f0;
// `;

// const ActiveIndicator = styled.div`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   width: 24px;
//   height: 24px;
//   border-radius: 50%;
//   background: #8a7968;
//   z-index: 1;
//   &::after {
//     content: "✓";
//     color: white;
//     font-size: 14px;
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//   }
// `;

// const ThemeImage = styled.div<{ $bg: string }>`
//   transform: scale(0.6);
//   transform-origin: top left;
//   width: 166.666%;
//   pointer-events: none;
//   opacity: 0.9;
//   filter: ${({ $bg }) => ($bg ? "none" : "grayscale(20%)")};
// `;

// const ThemeInfo = styled.div`
//   padding: 1.25rem;
// `;

// const ThemeName = styled.h3<{ $isSelected: boolean }>`
//   margin: 0 0 0.5rem;
//   color: ${({ $isSelected }) => ($isSelected ? "#8a7968" : "#2d3436")};
//   font-size: 1.1rem;
//   font-weight: 500;
// `;

// const ThemeDescription = styled.p`
//   margin: 0;
//   color: #666;
//   font-size: 0.85rem;
//   line-height: 1.4;
// `;

// const PreviewSection = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 2rem;
//   background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%);

//   @media (max-width: 768px) {
//     padding: 1rem;
//     min-height: 60vh;
//   }
// `;

// const PhoneContainer = styled.div`
//   width: 100%;
//   max-width: 400px;
//   height: auto;
//   aspect-ratio: 9/19.5;
//   position: relative;
// `;

// const PhoneFrame = styled.div`
//   width: 100%;
//   height: 100%;
//   background: #1a1a1a;
//   border-radius: 40px;
//   padding: 16px;
//   box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 30px 60px rgba(0, 0, 0, 0.2);
//   position: relative;
// `;

// const PhoneNotch = styled.div`
//   position: absolute;
//   top: 12px;
//   left: 50%;
//   transform: translateX(-50%);
//   width: 40%;
//   height: 24px;
//   background: #1a1a1a;
//   border-radius: 0 0 12px 12px;
//   z-index: 2;
// `;

// const PhoneScreen = styled.div`
//   width: 100%;
//   height: 100%;
//   border-radius: 28px;
//   overflow: hidden;
//   background: white;
//   position: relative;

//   .DishModal {
//     position: fixed !important;
//     top: 0 !important;
//     left: 0 !important;
//     right: 0 !important;
//     bottom: 0 !important;
//     background: rgba(0, 0, 0, 0.5) !important;
//     z-index: 1000 !important;

//     > div {
//       max-width: 100% !important;
//       max-height: 100% !important;
//       border-radius: 0 !important;
//     }
//   }
// `;

// const PhoneContent = styled.div`
//   width: 100%;
//   height: 100%;
//   overflow-y: auto;
//   -webkit-overflow-scrolling: touch;

//   &::-webkit-scrollbar {
//     display: none;
//   }

//   /* Force modal content scaling */
//   .DishModal > div {
//     transform: scale(0.9);
//     transform-origin: center center;
//   }
// `;

import { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import { FineDiningMenu } from "./ViewMenuFineDining";
import { LightThemeViewMenu } from "./ViewMenuModern";
import { ViewMenuDark } from "./ViewMenuDark";
import { ViewMenuLight } from "./ViewMenuLightTheme";

const mockMenu = {
  id: "menu1746167888684OqsZlshbVefuOWL2V3vOgQXYXpf1",
  name: "French Food",
  description:
    "Delicious French cuisine with fresh ingredients and traditional recipes.",
  imageUrl:
    "https://frenchsidetravel.com/wp-content/uploads/2022/06/food-french-shutterstock.jpg",
  lastUpdated: "2025-05-02",
  templateType: "standard",
  categories: [
    {
      id: "cat1746167901317",
      name: "Bagette & L",
      items: [
        {
          id: "item1746167924405",
          name: "Bagheta",
          description: "Freshly baked baguette with a crispy crust.",
          price: 4,
          allergens: ["Gluten"],
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4m6968bUzDqoStvmPXd7T56bXztl-NABSUw&s",
          kcal: 250,
        },
        {
          id: "item1746167924410",
          name: "Macarons",
          description: "Colorful French macarons with assorted flavors.",
          price: 30,
          discountPrice: 29,
          allergens: ["Eggs", "Nuts", "Milk"],
          image:
            "https://www.southernliving.com/thmb/dnsycw_-mf35yKMacarons_025-0e05e0cd226d44609f55ed8bc9cd3a3e.jpg",
          kcal: 400,
        },
        {
          id: "item1747203416276",
          name: "Ciocolata calda cu frișcă",
          description: "Rich hot chocolate topped with whipped cream.",
          price: 30,
          allergens: ["Milk"],
          kcal: 300,
        },
        {
          id: "item1747203416277",
          name: "Biscuiți cu frișcă",
          description: "Biscuiți fragezi cu cremă de ciocolată și frișcă.",
          price: 30,
          allergens: ["Gluten", "Milk"],
          image:
            "https://adygio.com/wp-content/uploads/2017/10/tort-de-biscuiti-cu-frisca-presare-biscuiti.jpg",
          kcal: 300,
        },
      ],
    },
    {
      id: "cat1746700515521",
      name: "Beef",
      items: [
        {
          id: "item1746700516000",
          name: "Steak de vită",
          description: "Juicy grilled beef steak served with herbs.",
          price: 45,
          allergens: [],
          image:
            "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80",
          kcal: 600,
        },
      ],
    },
    {
      id: "cat1747292200409",
      name: "Beer",
      items: [
        {
          id: "item1747292200410",
          name: "Craft Beer",
          description: "Locally brewed craft beer with rich aroma.",
          price: 8,
          allergens: ["Barley"],
          image:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
          kcal: 150,
        },
        {
          id: "item1747292200411",
          name: "Light Lager",
          description: "Refreshing light lager, perfect with meals.",
          price: 7,
          allergens: ["Barley"],
          kcal: 120,
        },
      ],
    },
    {
      id: "cat1747292260051",
      name: "Wine",
      items: [
        {
          id: "item1747292260052",
          name: "Red Wine",
          description: "Full-bodied red wine from Bordeaux.",
          price: 50,
          allergens: [],
          image:
            "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=400&q=80",
          kcal: 100,
        },
      ],
    },
  ],
};

const themes = [
  {
    id: "fine-dining",
    name: "Fine Dining",
    component: <FineDiningMenu currentMenu={mockMenu} />,
    description: "Elegant theme with parallax effects and detailed modals",
  },
  {
    id: "light-theme",
    name: "Light Theme",
    component: <LightThemeViewMenu currentMenu={mockMenu} />,
    description: "Clean, minimal interface with light colors",
  },
  {
    id: "dark-theme",
    name: "Dark Theme",
    component: <ViewMenuDark currentMenu={mockMenu} />,
    description: "Modern dark mode with high contrast",
  },
  {
    id: "classic",
    name: "Classic",
    component: <ViewMenuLight currentMenu={mockMenu} />,
    description: "Traditional restaurant menu layout",
  },
];

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background: #f8f9fa;
  }
`;

export const ThemePreviewPage = () => {
  const [selectedId, setSelectedId] = useState("fine-dining");
  const selectedTheme = themes.find((t) => t.id === selectedId);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    previewRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [selectedId]);

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Sidebar>
          <Header>
            <Title>Theme Gallery</Title>
            <Subtitle>Preview restaurant menu templates</Subtitle>
          </Header>
          <ThemeGrid>
            {themes.map((theme) => (
              <ThemeCard
                key={theme.id}
                onClick={() => setSelectedId(theme.id)}
                $isSelected={selectedId === theme.id}
              >
                <ThemeThumbnail>
                  {theme.id === selectedId && <ActiveIndicator />}
                  <ThemeImage $bg={theme.id}>
                    <img src={mockMenu.imageUrl} alt={theme.name} />
                  </ThemeImage>
                </ThemeThumbnail>
                <ThemeInfo>
                  <ThemeName $isSelected={selectedId === theme.id}>
                    {theme.name}
                  </ThemeName>
                  <ThemeDescription>{theme.description}</ThemeDescription>
                </ThemeInfo>
              </ThemeCard>
            ))}
          </ThemeGrid>
        </Sidebar>

        <PreviewSection ref={previewRef}>
          <PhoneContainer>
            <PhoneFrame>
              <PhoneNotch />
              <PhoneScreen>
                <PhoneContent>{selectedTheme?.component}</PhoneContent>
              </PhoneScreen>
            </PhoneFrame>
          </PhoneContainer>
        </PreviewSection>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 80vh;
  width: 100%;

  @media (max-width: 1500px) {
    flex-direction: column;
    overflow: auto;
  }
`;

const Sidebar = styled.div`
  flex: 0 0 820px;
  background: #fff;
  padding: 2rem 1.5rem;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.04);
  overflow-y: auto;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    box-shadow: none;
    border-bottom: 1px solid #eee;
  }
`;

const PreviewSection = styled.div`
  flex: 1;
  background: linear-gradient(to bottom right, #f8f9fa, #f1f3f5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PhoneContainer = styled.div`
  width: min(100%, 420px);
  aspect-ratio: 9 / 19.5;
  max-height: 90vh;
  position: relative;
`;

const Header = styled.header`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  margin: 0 0 0.25rem;
  color: #2d3436;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: #666;
  margin: 0;
  font-size: 0.9rem;
`;

const ThemeGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
`;

const ThemeCard = styled.div<{ $isSelected: boolean }>`
  border: 1px solid ${({ $isSelected }) => ($isSelected ? "#8a7968" : "#eee")};
  border-radius: 12px;
  overflow: hidden;
  background: white;
  cursor: pointer;
  transition: 0.2s ease;
  position: relative;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      box-shadow: 0 8px 16px rgba(138, 121, 104, 0.15);
    `}

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }
`;

const ThemeThumbnail = styled.div`
  height: 180px;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #f0f0f0;
`;

const ActiveIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #8a7968;
  z-index: 1;

  &::after {
    content: "✓";
    color: white;
    font-size: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ThemeImage = styled.div<{ $bg: string }>`
  transform-origin: top left;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${ThemeCard}:hover & img {
    transform: scale(1.05);
  }
`;

const ThemeInfo = styled.div`
  padding: 1.25rem;
`;

const ThemeName = styled.h3<{ $isSelected: boolean }>`
  margin: 0 0 0.5rem;
  color: ${({ $isSelected }) => ($isSelected ? "#8a7968" : "#2d3436")};
  font-size: 1.1rem;
  font-weight: 500;
`;

const ThemeDescription = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.85rem;
  line-height: 1.4;
`;

const PhoneFrame = styled.div`
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  border-radius: 40px;
  padding: 16px;
`;

const PhoneNotch = styled.div`
  width: 60%;
  height: 12px;
  background: #000;
  margin: 0 auto 10px;
  border-radius: 6px;
`;

const PhoneScreen = styled.div`
  background: white;
  border-radius: 24px;
  width: 100%;
  height: calc(100% - 28px);
  overflow: hidden;
`;

const PhoneContent = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

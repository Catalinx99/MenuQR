"use client";

import type React from "react";
import styled, { keyframes } from "styled-components";
import { atom, useAtom } from "jotai";
import { Button } from "../ui/Buton";

// Jotai atoms
const menuTemplateAtom = atom("modern");
const availableTemplates = ["modern", "classic", "minimal"];

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Styled Components
const PageContainer = styled.div`
  font-family: "DM Sans", sans-serif;
  color: #1a202c;
  background-color: #ffffff;
  min-height: 100vh;
`;

const HeroSection = styled.section`
  padding: 5rem 2rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  animation: ${fadeIn} 0.8s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;

  span {
    color: #3182ce;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 2rem;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const HeroImageContainer = styled.div`
  position: relative;
  animation: ${float} 6s ease-in-out infinite;
`;

const PhoneFrame = styled.div`
  width: 280px;
  height: 560px;
  background-color: #f7fafc;
  border-radius: 36px;
  border: 10px solid #2d3748;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

const PhoneNotch = styled.div`
  width: 120px;
  height: 25px;
  background-color: #2d3748;
  border-radius: 0 0 16px 16px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const PhoneScreen = styled.div`
  width: 100%;
  background-color: white;
  padding: 2rem 0 0 10px;
  display: flex;
  flex-direction: column;
`;

const MenuHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const MenuTitle = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
`;

const MenuSubtitle = styled.div`
  font-size: 0.8rem;
  color: #718096;
`;

// const MenuItems = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.75rem;
//   overflow-y: auto;
//   flex: 1;
// `;

const scrollAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow: hidden;
  position: relative;
  height: 100%;
  animation: ${scrollAnimation} 7s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const MenuItemsWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const MenuItem = styled.div`
  background-color: #f7fafc;
  border-radius: 8px;
  padding: 0.75rem;
  width: 84%;
`;

const MenuItemTitle = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const MenuItemDescription = styled.div`
  font-size: 0.75rem;
  color: #718096;
`;

const QROverlay = styled.div`
  position: absolute;
  bottom: -30px;
  right: 0px;
  width: 120px;
  height: 120px;
  background-color: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  &::before {
    content: "";
    position: absolute;
    width: 70%;
    height: 70%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M0,0 L40,0 L40,40 L0,40 Z M10,10 L10,30 L30,30 L30,10 Z M15,15 L25,15 L25,25 L15,25 Z M60,0 L100,0 L100,40 L60,40 Z M70,10 L70,30 L90,30 L90,10 Z M75,15 L85,15 L85,25 L75,25 Z M0,60 L40,60 L40,100 L0,100 Z M10,70 L10,90 L30,90 L30,70 Z M15,75 L25,75 L25,85 L15,85 Z M60,60 L70,60 L70,70 L60,70 Z M80,60 L90,60 L90,70 L100,70 L100,60 L100,100 L80,100 Z M60,80 L70,80 L70,100 L60,100 Z M80,80 L80,90 L90,90 L90,80 Z' fill='%233182ce'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const FeaturesSection = styled.section`
  padding: 5rem 2rem;
  background-color: #f7fafc;
`;

const SectionHeader = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;

  span {
    color: #3182ce;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.1rem;
  color: #4a5568;
  line-height: 1.6;
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #ebf8ff;
  color: #3182ce;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const StepDescription = styled.p`
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.6;
`;

const TemplateSection = styled.section`
  padding: 5rem 2rem;
  margin: 0 auto;
`;

const TemplateSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const TemplateButton = styled.button<{ active: boolean }>`
  padding: 0.6rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.active ? "#3182ce" : "#e2e8f0")};
  color: ${(props) => (props.active ? "white" : "#4a5568")};
  border: none;

  &:hover {
    background-color: ${(props) => (props.active ? "#2c5282" : "#cbd5e0")};
  }
`;

const TemplatePreview = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TemplateCard = styled.div`
  background-color: #f7fafc;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const TemplateImage = styled.div`
  height: 200px;
  background-color: #e2e8f0;
  position: relative;

  &::after {
    content: "Template Preview";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #4a5568;
    font-weight: 600;
  }
`;

const TemplateInfo = styled.div`
  padding: 1.5rem;
`;

const TemplateTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const TemplateDescription = styled.p`
  font-size: 0.9rem;
  color: #4a5568;
  margin-bottom: 1rem;
`;

const CTASection = styled.section`
  padding: 5rem 2rem;
  background-color: #3182ce;
  color: white;
  text-align: center;
`;

const CTAContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const CTAButton = styled.button`
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: white;
  color: #3182ce;
  border: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Homepage3: React.FC = () => {
  const [template, setTemplate] = useAtom(menuTemplateAtom);

  const mockMenuItems = [
    {
      title: "Grilled Salmon",
      description: "Fresh Atlantic salmon with lemon butter sauce",
    },
    {
      title: "Lobster Pasta",
      description: "Linguine with fresh lobster in a creamy tomato sauce",
    },
    {
      title: "Seafood Platter",
      description:
        "Assortment of grilled fish, shrimp, and calamari with dipping sauces",
    },
    {
      title: "Clam Chowder",
      description: "Creamy New England soup with potatoes and fresh clams",
    },
    {
      title: "Shrimp Scampi",
      description: "Jumbo shrimp sautéed in garlic, butter, and white wine",
    },
  ];

  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Create <span>Digital Menus</span> Your Customers Will Love
          </HeroTitle>
          <HeroSubtitle>
            Design beautiful, interactive restaurant menus that customers can
            access instantly by scanning a QR code. No app downloads, no paper
            waste.
          </HeroSubtitle>
          <HeroButtons>
            <Button primary>Create Your Menu</Button>
            <Button>View Demo</Button>
          </HeroButtons>
        </HeroContent>
        <HeroImageContainer>
          <PhoneFrame>
            <PhoneNotch />
            <PhoneScreen>
              <MenuHeader>
                <MenuTitle>Coastal Bistro</MenuTitle>
                <MenuSubtitle>Fresh Seafood & More</MenuSubtitle>
              </MenuHeader>
              <MenuItemsWrapper>
                <MenuItems>
                  {[...mockMenuItems, ...mockMenuItems].map((item, index) => (
                    <MenuItem key={index}>
                      <MenuItemTitle>{item.title}</MenuItemTitle>
                      <MenuItemDescription>
                        {item.description}
                      </MenuItemDescription>
                    </MenuItem>
                  ))}
                </MenuItems>
              </MenuItemsWrapper>
            </PhoneScreen>
          </PhoneFrame>
          <QROverlay />
        </HeroImageContainer>
      </HeroSection>

      <FeaturesSection>
        <SectionHeader>
          <SectionTitle>
            How It <span>Works</span>
          </SectionTitle>
          <SectionDescription>
            Create and share your digital menu in just three simple steps. No
            technical skills required.
          </SectionDescription>
        </SectionHeader>
        <StepsGrid>
          <StepCard>
            <StepNumber>1</StepNumber>
            <StepTitle>Design Your Menu</StepTitle>
            <StepDescription>
              Choose from our beautiful templates and customize with your
              branding, items, descriptions, and photos using our intuitive
              drag-and-drop editor.
            </StepDescription>
          </StepCard>

          <StepCard>
            <StepNumber>2</StepNumber>
            <StepTitle>Generate QR Code</StepTitle>
            <StepDescription>
              With one click, generate a unique QR code that links directly to
              your digital menu. Download in various formats for printing.
            </StepDescription>
          </StepCard>

          <StepCard>
            <StepNumber>3</StepNumber>
            <StepTitle>Share With Customers</StepTitle>
            <StepDescription>
              Place QR codes on tables, takeout materials, or your website.
              Customers scan with their phone camera to instantly view your
              menu.
            </StepDescription>
          </StepCard>
        </StepsGrid>
      </FeaturesSection>

      <TemplateSection>
        <SectionHeader>
          <SectionTitle>
            Beautiful <span>Templates</span>
          </SectionTitle>
          <SectionDescription>
            Choose from a variety of professionally designed templates to match
            your restaurant's style and brand.
          </SectionDescription>
        </SectionHeader>
        <TemplateSelector>
          {availableTemplates.map((t) => (
            <TemplateButton
              key={t}
              active={template === t}
              onClick={() => setTemplate(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </TemplateButton>
          ))}
        </TemplateSelector>
        <TemplatePreview>
          <TemplateCard>
            <TemplateImage />
            <TemplateInfo>
              <TemplateTitle>Fine Dining</TemplateTitle>
              <TemplateDescription>
                Elegant design perfect for upscale restaurants and bistros.
              </TemplateDescription>
              <Button>Preview</Button>
            </TemplateInfo>
          </TemplateCard>

          <TemplateCard>
            <TemplateImage />
            <TemplateInfo>
              <TemplateTitle>Casual Eatery</TemplateTitle>
              <TemplateDescription>
                Friendly and approachable design for cafes and casual dining.
              </TemplateDescription>
              <Button>Preview</Button>
            </TemplateInfo>
          </TemplateCard>

          <TemplateCard>
            <TemplateImage />
            <TemplateInfo>
              <TemplateTitle>Bar & Grill</TemplateTitle>
              <TemplateDescription>
                Bold design highlighting drinks and food for bars and pubs.
              </TemplateDescription>
              <Button>Preview</Button>
            </TemplateInfo>
          </TemplateCard>
        </TemplatePreview>
      </TemplateSection>

      <CTASection>
        <CTAContainer>
          <CTATitle>Ready to Modernize Your Menu?</CTATitle>
          <CTADescription>
            Join thousands of restaurants already using MenuQR to create
            beautiful digital menus that customers love.
          </CTADescription>
          <CTAButton>Get Started Free</CTAButton>
        </CTAContainer>
      </CTASection>
    </PageContainer>
  );
};

export default Homepage3;

import styled, { css, keyframes } from "styled-components";

type HowItWorksSectionProps = {
  sectionRefs: React.RefObject<{
    [key: string]: HTMLElement | null;
  }>;
};

export const HomepageHowItWorksSection = ({
  sectionRefs,
}: HowItWorksSectionProps) => {
  return (
    <HowItWorksSection
      id="how-it-works"
      ref={(el) => {
        sectionRefs.current["how-it-works"] = el;
      }}
    >
      <SectionContainer>
        <SectionHeader>
          <SectionTitle>How It Works</SectionTitle>
          <SectionSubtitle>
            Get started with ScanMenu in three simple steps and transform your
            restaurant experience.
          </SectionSubtitle>
        </SectionHeader>

        <StepsContainer>
          <StepsList>
            <Step isEven={false}>
              <StepNumber isEven={false}>1</StepNumber>
              <StepContent>
                <StepTitle>Create Your Digital Menu</StepTitle>
                <StepDescription>
                  Use our intuitive dashboard to build your menu. Add
                  categories, items, descriptions, prices, and high-quality
                  images. Choose from our professionally designed templates and
                  customize colors and fonts to match your brand.
                </StepDescription>
              </StepContent>
              <StepImage>
                <StepImageContent
                  src="https://foodish-api.com/images/pasta/pasta1.jpg"
                  alt="Create menu"
                />
              </StepImage>
            </Step>

            <Step isEven={true}>
              <StepNumber isEven={true}>2</StepNumber>
              <StepContent>
                <StepTitle>Generate & Print QR Codes</StepTitle>
                <StepDescription>
                  Once your menu is ready, generate unique QR codes for your
                  restaurant. Print them on table tents, stickers, or directly
                  on your physical menus. We provide high-resolution files ready
                  for printing.
                </StepDescription>
              </StepContent>
              <StepImage>
                <StepImageContent
                  src="https://foodish-api.com/images/pasta/pasta1.jpg"
                  alt="QR codes"
                />
              </StepImage>
            </Step>

            <Step isEven={false}>
              <StepNumber isEven={false}>3</StepNumber>
              <StepContent>
                <StepTitle>Customers Scan & Order</StepTitle>
                <StepDescription>
                  When customers visit your restaurant, they simply scan the QR
                  code with their smartphone camera. Your beautiful digital menu
                  opens instantly in their browser, no app download required.
                  They can browse your offerings, see images, and make informed
                  choices.
                </StepDescription>
              </StepContent>
              <StepImage>
                <StepImageContent
                  src="https://foodish-api.com/images/pasta/pasta1.jpg"
                  alt="Scan menu"
                />
              </StepImage>
            </Step>
          </StepsList>
        </StepsContainer>
      </SectionContainer>
    </HowItWorksSection>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HowItWorksSection = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  position: relative;
  overflow: hidden;
`;

const StepsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
`;

const StepsList = styled.div`
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: linear-gradient(to bottom, #3182ce, #10b981);
    transform: translateX(-50%);

    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const Step = styled.div<{ isEven: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 8rem;
  position: relative;
  animation: ${fadeIn} 0.8s ease-out;
  animation-fill-mode: both;

  &:nth-child(2) {
    animation-delay: 0.3s;
  }

  &:nth-child(3) {
    animation-delay: 0.6s;
  }

  &:last-child {
    margin-bottom: 0;
  }

  ${(props) =>
    props.isEven &&
    css`
      direction: rtl;

      & > * {
        direction: ltr;
      }
    `}

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-left: 60px;
    direction: ltr;

    & > * {
      direction: ltr;
    }
  }
`;

const StepNumber = styled.div<{ isEven: boolean }>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3182ce, #63b3ed);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  z-index: 2;
  box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);

  @media (max-width: 768px) {
    left: 30px;
  }
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
`;

const StepTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
`;

const StepDescription = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  line-height: 1.6;
`;

const StepImage = styled.div`
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(139, 92, 246, 0.05),
      rgba(16, 185, 129, 0.05)
    );
  }
`;

const StepImageContent = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #1f2937, #63b3ed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
`;

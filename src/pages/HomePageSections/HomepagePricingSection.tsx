import styled, { css, keyframes } from "styled-components";
import { Button } from "../../ui/Buton";
import { CheckCircle } from "lucide-react";

type PricingSectionProps = {
  sectionRefs: React.RefObject<{
    [key: string]: HTMLElement | null;
  }>;
};
export const HomepagePricingSection = ({
  sectionRefs,
}: PricingSectionProps) => {
  return (
    <PricingSection
      id="pricing"
      ref={(el) => {
        sectionRefs.current["pricing"] = el;
      }}
    >
      <SectionContainer>
        <SectionHeader>
          <SectionTitle>Simple, Transparent Pricing</SectionTitle>
          <SectionSubtitle>
            Choose the plan that's right for your restaurant, with no hidden
            fees or long-term commitments.
          </SectionSubtitle>
        </SectionHeader>

        <PricingGrid>
          {/* Card pentru abonamentul pe lună */}
          <PricingCard>
            <PricingHeader>
              <PricingTitle>Monthly</PricingTitle>
              <PricingPrice>
                99<span>/month</span>
              </PricingPrice>
              <PricingDescription>
                Perfect for short-term use
              </PricingDescription>
            </PricingHeader>

            <PricingFeatures>
              <PricingFeatureItem>
                <CheckCircle size={16} color="#3182ce" />1 QR code menu
              </PricingFeatureItem>
              <PricingFeatureItem>
                <CheckCircle size={16} color="#3182ce" />
                Up to 50 menu items
              </PricingFeatureItem>
              <PricingFeatureItem>
                <CheckCircle size={16} color="#3182ce" />
                Basic analytics
              </PricingFeatureItem>
              <PricingFeatureItem>
                <CheckCircle size={16} color="#3182ce" />3 menu templates
              </PricingFeatureItem>
              <PricingFeatureItem>
                <CheckCircle size={16} color="#3182ce" />
                Email support
              </PricingFeatureItem>
            </PricingFeatures>

            <PricingButton>Get Started</PricingButton>
          </PricingCard>

          {/* Card pentru abonamentul pe 6 luni */}
          <PricingCard>
            <PricingHeader>
              <PricingTitle>6 Months</PricingTitle>
              <PricingPrice>
                499
                <span>/6 months</span>
              </PricingPrice>
              <PricingDescription>
                Save by committing to 6 months
              </PricingDescription>
            </PricingHeader>

            <PricingFeatures>
              <PricingFeatureItem>
                <CheckCircle size={16} color="#3182ce" />1 QR code menu
              </PricingFeatureItem>
              <PricingFeatureItem>
                <CheckCircle size={16} color="#3182ce" />
                Up to 50 menu items
              </PricingFeatureItem>
              <PricingFeatureItem>
                <CheckCircle size={16} color="#3182ce" />
                Basic analytics
              </PricingFeatureItem>
              <PricingFeatureItem>
                <CheckCircle size={16} color="#3182ce" />3 menu templates
              </PricingFeatureItem>
              <PricingFeatureItem>
                <CheckCircle size={16} color="#3182ce" />
                Email support
              </PricingFeatureItem>
            </PricingFeatures>

            <PricingButton>Get Started</PricingButton>
          </PricingCard>

          {/* Card pentru abonamentul pe 1 an */}
          <PricingCard featured>
            <PricingBadge>Most Popular</PricingBadge>
            <PricingHeader>
              <PricingTitle featured>1 Year</PricingTitle>
              <PricingPrice featured>
                999
                <span>/1 year</span>
              </PricingPrice>
              <PricingDescription featured>
                Save even more by committing to 1 year
              </PricingDescription>
            </PricingHeader>

            <PricingFeatures>
              <PricingFeatureItem featured>
                <CheckCircle size={16} color="white" />1 QR code menu
              </PricingFeatureItem>
              <PricingFeatureItem featured>
                <CheckCircle size={16} color="white" />
                Up to 50 menu items
              </PricingFeatureItem>
              <PricingFeatureItem featured>
                <CheckCircle size={16} color="white" />
                Basic analytics
              </PricingFeatureItem>
              <PricingFeatureItem featured>
                <CheckCircle size={16} color="white" />3 menu templates
              </PricingFeatureItem>
              <PricingFeatureItem featured>
                <CheckCircle size={16} color="white" />
                Email support
              </PricingFeatureItem>
            </PricingFeatures>

            <PricingButton featured>Get Started</PricingButton>
          </PricingCard>
        </PricingGrid>
      </SectionContainer>
    </PricingSection>
  );
};

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PricingSection = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  position: relative;
  overflow: hidden;
`;

const PricingToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
`;

const ToggleOption = styled.span<{ active: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.active ? "#1F2937" : "#6B7280")};
  cursor: pointer;
  transition: color 0.3s ease;
`;

const ToggleSwitch = styled.div<{ isYearly: boolean }>`
  width: 50px;
  height: 26px;
  background: linear-gradient(135deg, #3182ce, #63b3ed);
  border-radius: 13px;
  position: relative;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: ${(props) => (props.isYearly ? "27px" : "3px")};
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.3s ease;
  }
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const PricingCard = styled.div<{ featured?: boolean }>`
  background-color: white;
  border-radius: 20px;
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: ${scaleIn} 0.8s ease-out;
  animation-fill-mode: both;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  ${(props) =>
    props.featured &&
    css`
      background: linear-gradient(135deg, #3182ce, #63b3ed);
      color: white;
      transform: scale(1.05);
      box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);

      @media (max-width: 1024px) {
        transform: scale(1);
      }
    `}

  &:hover {
    transform: ${(props) => (props.featured ? "scale(1.08)" : "scale(1.03)")};
    box-shadow: ${(props) =>
      props.featured
        ? "0 25px 50px rgba(139, 92, 246, 0.4)"
        : "0 15px 35px rgba(0, 0, 0, 0.1)"};

    @media (max-width: 1024px) {
      transform: ${(props) => (props.featured ? "scale(1.03)" : "scale(1.03)")};
    }
  }
`;

const PricingBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
`;

const PricingHeader = styled.div`
  text-align: center;
`;

const PricingTitle = styled.h3<{ featured?: boolean }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => (props.featured ? "white" : "#1F2937")};
  margin-bottom: 1rem;
`;

const PricingPrice = styled.div<{ featured?: boolean }>`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${(props) => (props.featured ? "white" : "#1F2937")};
  margin-bottom: 0.5rem;

  span {
    font-size: 1.25rem;
    font-weight: 500;
    color: ${(props) =>
      props.featured ? "rgba(255, 255, 255, 0.8)" : "#6B7280"};
  }
`;

const PricingDescription = styled.div<{ featured?: boolean }>`
  font-size: 1rem;
  color: ${(props) =>
    props.featured ? "rgba(255, 255, 255, 0.8)" : "#6B7280"};
  text-align: center;
`;

const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex-grow: 1;
`;

const PricingFeatureItem = styled.li<{ featured?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  color: ${(props) => (props.featured ? "white" : "#4B5563")};
`;

const PricingButton = styled(Button)<{ featured?: boolean }>`
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;

  ${(props) =>
    props.featured
      ? css`
          background-color: white;
          color: #3182ce;
          box-shadow: 0 5px 15px rgba(255, 255, 255, 0.3);

          &:hover {
            background-color: rgba(255, 255, 255, 0.9);
            transform: translateY(-2px);
          }
        `
      : css`
          background: linear-gradient(135deg, #3182ce, #63b3ed);
          color: white;
          box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);
          }
        `}
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

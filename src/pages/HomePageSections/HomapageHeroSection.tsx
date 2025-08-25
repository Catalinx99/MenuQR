import React from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "../../ui/Buton";
import { Play } from "lucide-react";
import QrMenuAnimation from "../PhoneAnimation";
import CountUp from "react-countup";

export const HomapageHeroSection = React.forwardRef<HTMLElement>(
  (props, ref) => {
    return (
      <HeroSection id="home" ref={ref}>
        <HeroBackground />
        <HeroPattern />
        <HeroContent>
          <HeroTextContent>
            <HeroTitle>Transform Your Menu Experience</HeroTitle>
            <HeroSubtitle>
              Elevate your restaurant with digital QR menus
            </HeroSubtitle>
            <HeroText>
              Create beautiful, interactive QR code menus that customers love.
              Update in real-time, reduce costs, and gain valuable insights into
              customer preferences.
            </HeroText>
            <HeroButtons>
              <PrimaryButton>Start Free Trial</PrimaryButton>
              <SecondaryButton>
                Watch Demo <Play size={16} style={{ marginLeft: "0.5rem" }} />
              </SecondaryButton>
            </HeroButtons>
            <HeroStats>
              <StatItem>
                <StatValue>
                  <CountUp end={5000} separator="," duration={2} suffix="+" />
                </StatValue>
                <StatLabel>Restaurants</StatLabel>
              </StatItem>

              <StatItem>
                <StatValue>
                  <CountUp
                    end={2000000}
                    separator=","
                    duration={2.5}
                    suffix="+"
                  />
                </StatValue>
                <StatLabel>Monthly Scans</StatLabel>
              </StatItem>

              <StatItem>
                <StatValue>
                  <CountUp end={98} duration={2} suffix="%" />
                </StatValue>
                <StatLabel>Satisfaction</StatLabel>
              </StatItem>
            </HeroStats>
          </HeroTextContent>

          <HeroVisual>
            <QrMenuAnimation />
          </HeroVisual>
        </HeroContent>

        <FloatingElements>
          <FloatingElement size={20} top="20%" left="10%" delay={0} />
          <FloatingElement size={30} top="60%" left="5%" delay={1} />
          <FloatingElement size={15} top="30%" left="85%" delay={0.5} />
          <FloatingElement size={25} top="70%" left="90%" delay={1.5} />
        </FloatingElements>
      </HeroSection>
    );
  }
);

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #3182ce, #63b3ed);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(139, 92, 246, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: 2px solid #3182ce;
  color: #3182ce;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;

  &:hover {
    background-color: rgba(139, 92, 246, 0.1);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Hero Section
const HeroSection = styled.section`
  position: relative;
  padding: 10rem 2rem 6rem;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 8rem 2rem 4rem;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -300px;
    right: -300px;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(139, 92, 246, 0.15) 0%,
      rgba(139, 92, 246, 0) 70%
    );
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -200px;
    left: -200px;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(16, 185, 129, 0.1) 0%,
      rgba(16, 185, 129, 0) 70%
    );
  }
`;

const HeroPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%233182ce' fillOpacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.2;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const HeroTextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${fadeInLeft} 1s ease-out;

  @media (max-width: 1024px) {
    order: 2;
  }
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1),
    rgba(16, 185, 129, 0.1)
  );
  color: #3182ce;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  gap: 0.5rem;
  width: fit-content;

  @media (max-width: 1024px) {
    margin: 0 auto;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  background: linear-gradient(to right, #1f2937, #63b3ed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 1rem;
`;

const HeroText = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 2rem;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 1024px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const HeroStats = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 1024px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #3182ce;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const HeroVisual = styled.div`
  position: relative;
  animation: ${fadeInRight} 1s ease-out;

  @media (max-width: 1024px) {
    order: 1;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
`;

const FloatingElement = styled.div<{
  size: number;
  top: string;
  left: string;
  delay: number;
}>`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  background: linear-gradient(135deg, #3182ce, #10b981);
  border-radius: 50%;
  opacity: 0.2;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
`;

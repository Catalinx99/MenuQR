import styled, { keyframes } from "styled-components";
import {
  ChevronRight,
  Smartphone,
  BarChart3,
  Zap,
  Globe,
  Users,
  Clock,
} from "lucide-react";

type HomepageFeaturesSectionProps = {
  sectionRefs: React.RefObject<{
    [key: string]: HTMLElement | null;
  }>;
};
export const HomepageFeaturesSection = ({
  sectionRefs,
}: HomepageFeaturesSectionProps) => {
  return (
    <FeaturesSection
      id="features"
      ref={(el) => {
        sectionRefs.current["features"] = el;
      }}
    >
      <FeaturesBg />
      <SectionContainer>
        <SectionHeader>
          <SectionTitle>Powerful Features for Modern Restaurants</SectionTitle>
          <SectionSubtitle>
            Everything you need to create, manage, and optimize your digital
            menu experience.
          </SectionSubtitle>
        </SectionHeader>

        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <Zap size={24} />
            </FeatureIcon>
            <FeatureTitle>Instant Updates</FeatureTitle>
            <FeatureDescription>
              Change prices, add items, or mark dishes as sold out in real-time.
              Updates appear instantly on your customers' devices.
            </FeatureDescription>
            <FeatureLink href="#">
              Learn more <ChevronRight size={16} />
            </FeatureLink>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <Smartphone size={24} />
            </FeatureIcon>
            <FeatureTitle>Mobile Optimized</FeatureTitle>
            <FeatureDescription>
              Beautifully designed menus that look great on any device, with
              fast loading times and intuitive navigation.
            </FeatureDescription>
            <FeatureLink href="#">
              Learn more <ChevronRight size={16} />
            </FeatureLink>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <BarChart3 size={24} />
            </FeatureIcon>
            <FeatureTitle>Detailed Analytics</FeatureTitle>
            <FeatureDescription>
              Gain insights into customer behavior with comprehensive analytics
              on views, popular items, and peak times.
            </FeatureDescription>
            <FeatureLink href="#">
              Learn more <ChevronRight size={16} />
            </FeatureLink>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <Globe size={24} />
            </FeatureIcon>
            <FeatureTitle>Multilingual Support</FeatureTitle>
            <FeatureDescription>
              Automatically translate your menu into multiple languages to
              accommodate international guests.
            </FeatureDescription>
            <FeatureLink href="#">
              Learn more <ChevronRight size={16} />
            </FeatureLink>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <Users size={24} />
            </FeatureIcon>
            <FeatureTitle>Team Collaboration</FeatureTitle>
            <FeatureDescription>
              Multiple staff members can manage the menu with different
              permission levels for security and control.
            </FeatureDescription>
            <FeatureLink href="#">
              Learn more <ChevronRight size={16} />
            </FeatureLink>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <Clock size={24} />
            </FeatureIcon>
            <FeatureTitle>Time-Based Menus</FeatureTitle>
            <FeatureDescription>
              Schedule different menus for breakfast, lunch, dinner, or happy
              hour that automatically switch at set times.
            </FeatureDescription>
            <FeatureLink href="#">
              Learn more <ChevronRight size={16} />
            </FeatureLink>
          </FeatureCard>
        </FeaturesGrid>
      </SectionContainer>
    </FeaturesSection>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const FeaturesSection = styled.section`
  padding: 8rem 2rem;
  background-color: white;
  position: relative;
  overflow: hidden;
`;

const FeaturesBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    top: -100px;
    left: -100px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(16, 185, 129, 0.1) 0%,
      rgba(16, 185, 129, 0) 70%
    );
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(139, 92, 246, 0.1) 0%,
      rgba(139, 92, 246, 0) 70%
    );
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
  animation: ${scaleIn} 0.8s ease-out;
  animation-fill-mode: both;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  &:nth-child(4) {
    animation-delay: 0.6s;
  }

  &:nth-child(5) {
    animation-delay: 0.8s;
  }

  &:nth-child(6) {
    animation-delay: 1s;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, #3182ce, #10b981);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

    &::before {
      transform: scaleX(1);
    }
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1),
    rgba(16, 185, 129, 0.1)
  );
  color: #3182ce;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1f2937;
`;

const FeatureDescription = styled.p`
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.6;
`;

const FeatureLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #3182ce;
  margin-top: auto;
  transition: all 0.3s ease;

  &:hover {
    gap: 0.75rem;
  }
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

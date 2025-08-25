import React from "react";
import styled, { keyframes } from "styled-components";
import { Star } from "lucide-react";

type HomepageTestionialsSectionProps = {
  sectionRefs: React.RefObject<{
    [key: string]: HTMLElement | null;
  }>;
};
export const HomepageTestionialsSection = ({
  sectionRefs,
}: HomepageTestionialsSectionProps) => {
  return (
    <TestimonialsSection
      id="testimonials"
      ref={(el) => {
        sectionRefs.current["testimonials"] = el;
      }}
    >
      <SectionContainer>
        <SectionHeader>
          <SectionTitle>What Our Customers Say</SectionTitle>
          <SectionSubtitle>
            Join thousands of satisfied restaurant owners who have transformed
            their business with ScanMenu.
          </SectionSubtitle>
        </SectionHeader>

        <TestimonialsGrid>
          <TestimonialCard>
            <TestimonialStars>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#F59E0B" />
              ))}
            </TestimonialStars>
            <TestimonialText>
              "ScanMenu has completely transformed how we manage our restaurant.
              We can update our menu instantly, and the analytics have helped us
              identify our most popular dishes. Our customers love the
              convenience!"
            </TestimonialText>
            <TestimonialAuthor>
              <TestimonialAvatar>
                <TestimonialAvatarImg
                  src="https://foodish-api.com/images/pasta/pasta1.jpg"
                  alt="John Doe"
                />
              </TestimonialAvatar>
              <TestimonialInfo>
                <TestimonialName>John Doe</TestimonialName>
                <TestimonialRole>Owner, The Italian Place</TestimonialRole>
              </TestimonialInfo>
            </TestimonialAuthor>
          </TestimonialCard>

          <TestimonialCard>
            <TestimonialStars>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#F59E0B" />
              ))}
            </TestimonialStars>
            <TestimonialText>
              "We've saved thousands on printing costs and reduced our
              environmental impact. The ability to showcase high-quality images
              of our dishes has increased our sales of premium items by 25%."
            </TestimonialText>
            <TestimonialAuthor>
              <TestimonialAvatar>
                <TestimonialAvatarImg
                  src="https://foodish-api.com/images/pasta/pasta1.jpg"
                  alt="Jane Smith"
                />
              </TestimonialAvatar>
              <TestimonialInfo>
                <TestimonialName>Jane Smith</TestimonialName>
                <TestimonialRole>Manager, Urban Grill</TestimonialRole>
              </TestimonialInfo>
            </TestimonialAuthor>
          </TestimonialCard>

          <TestimonialCard>
            <TestimonialStars>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="#F59E0B" />
              ))}
            </TestimonialStars>
            <TestimonialText>
              "The multilingual feature has been a game-changer for our
              restaurant located in a tourist area. Customers appreciate being
              able to view our menu in their native language, and it's increased
              our international clientele."
            </TestimonialText>
            <TestimonialAuthor>
              <TestimonialAvatar>
                <TestimonialAvatarImg
                  src="https://foodish-api.com/images/pasta/pasta1.jpg"
                  alt="Michael Rodriguez"
                />
              </TestimonialAvatar>
              <TestimonialInfo>
                <TestimonialName>Michael Rodriguez</TestimonialName>
                <TestimonialRole>Owner, Seaside Bistro</TestimonialRole>
              </TestimonialInfo>
            </TestimonialAuthor>
          </TestimonialCard>
        </TestimonialsGrid>
      </SectionContainer>
    </TestimonialsSection>
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

const TestimonialsSection = styled.section`
  padding: 8rem 2rem;
  background-color: white;
  position: relative;
  overflow: hidden;
`;

const TestimonialsGrid = styled.div`
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

const TestimonialCard = styled.div`
  background-color: #f9fafb;
  border-radius: 20px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: all 0.3s ease;
  animation: ${scaleIn} 0.8s ease-out;
  animation-fill-mode: both;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const TestimonialStars = styled.div`
  display: flex;
  gap: 0.25rem;
  color: #f59e0b;
`;

const TestimonialText = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  line-height: 1.7;
  flex-grow: 1;
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: -1.5rem;
    left: -0.5rem;
    font-size: 4rem;
    color: rgba(139, 92, 246, 0.1);
    font-family: serif;
    line-height: 1;
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TestimonialAvatar = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e5e7eb;
  border: 3px solid white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const TestimonialAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TestimonialInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TestimonialName = styled.div`
  font-weight: 700;
  color: #1f2937;
`;

const TestimonialRole = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
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

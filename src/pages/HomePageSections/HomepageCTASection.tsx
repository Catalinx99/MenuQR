import styled, { keyframes } from "styled-components";
import { Button } from "../../ui/Buton";

export const HomepageCTASection = () => {
  return (
    <CTASection>
      <CTAPattern />
      <CTAContainer>
        <CTATitle>Ready to Transform Your Restaurant Experience?</CTATitle>
        <CTAText>
          Join thousands of restaurants already using our QR code menu solution
          to enhance their dining experience. Start your free trial today and
          see the difference for yourself.
        </CTAText>
        <CTAButtons>
          <CTAButton>Start Free Trial</CTAButton>
          <CTAOutlineButton>Schedule Demo</CTAOutlineButton>
        </CTAButtons>
      </CTAContainer>
    </CTASection>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CTASection = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #3182ce, #63b3ed);
  position: relative;
  overflow: hidden;
  color: white;
`;

const CTAPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FFFFFF' fillOpacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.2;
`;

const CTAContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`;

const CTATitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const CTAText = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.7;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CTAButton = styled(Button)`
  padding: 1rem 2.5rem;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  background-color: white;
  color: #3182ce;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const CTAOutlineButton = styled(Button)`
  padding: 1rem 2.5rem;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  background-color: transparent;
  color: white;
  border: 2px solid white;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
`;

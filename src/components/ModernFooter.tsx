import styled from "styled-components";
import {
  QrCode,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";
export const ModernFooter = () => {
  return (
    <Footer>
      <FooterContainer>
        <FooterGrid>
          <FooterBrand>
            <FooterLogo>
              <LogoIcon>
                <QrCode size={24} />
              </LogoIcon>
              <FooterLogoText>ScanMenu</FooterLogoText>
            </FooterLogo>
            <FooterText>
              Transforming restaurant menus with innovative QR code technology.
              Update instantly, reduce costs, and enhance the dining experience.
            </FooterText>
            <FooterSocial>
              <SocialLink href="#">
                <Facebook size={16} />
              </SocialLink>
              <SocialLink href="#">
                <Twitter size={16} />
              </SocialLink>
              <SocialLink href="#">
                <Instagram size={16} />
              </SocialLink>
              <SocialLink href="#">
                <Linkedin size={16} />
              </SocialLink>
            </FooterSocial>
          </FooterBrand>

          <FooterColumn>
            <FooterColumnTitle>Product</FooterColumnTitle>
            <FooterLinks>
              <FooterLink href="#">
                <ArrowUpRight size={14} />
                Features
              </FooterLink>
              <FooterLink href="#">
                <ArrowUpRight size={14} />
                Pricing
              </FooterLink>
              <FooterLink href="#">
                <ArrowUpRight size={14} />
                Templates
              </FooterLink>
              <FooterLink href="#">
                <ArrowUpRight size={14} />
                Integrations
              </FooterLink>
              <FooterLink href="#">
                <ArrowUpRight size={14} />
                API
              </FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <FooterColumnTitle>Resources</FooterColumnTitle>
            <FooterLinks>
              <FooterLink href="#">
                <ArrowUpRight size={14} />
                Documentation
              </FooterLink>
              <FooterLink href="#">
                <ArrowUpRight size={14} />
                Guides
              </FooterLink>
              <FooterLink href="#">
                <ArrowUpRight size={14} />
                Blog
              </FooterLink>
              <FooterLink href="#">
                <ArrowUpRight size={14} />
                Case Studies
              </FooterLink>
              <FooterLink href="#">
                <ArrowUpRight size={14} />
                Help Center
              </FooterLink>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <FooterColumnTitle>Company</FooterColumnTitle>
            <FooterLinks>
              <FooterLink href="#">
                <ArrowUpRight size={14} />
                About Us
              </FooterLink>
              <FooterLink href="#">
                <ArrowUpRight size={14} />
                Careers
              </FooterLink>
              <FooterLink href="#">
                <ArrowUpRight size={14} />
                Contact
              </FooterLink>
              <FooterLink href="#">
                <ArrowUpRight size={14} />
                Partners
              </FooterLink>
              <FooterLink href="#">
                <ArrowUpRight size={14} />
                Press
              </FooterLink>
            </FooterLinks>
          </FooterColumn>
        </FooterGrid>

        <FooterDivider />

        <FooterBottom>
          <FooterCopyright>
            © {new Date().getFullYear()} ScanMenu. All rights reserved.
          </FooterCopyright>
          <FooterBottomLinks>
            <FooterBottomLink href="#">Privacy Policy</FooterBottomLink>
            <FooterBottomLink href="#">Terms of Service</FooterBottomLink>
            <FooterBottomLink href="#">Cookie Policy</FooterBottomLink>
          </FooterBottomLinks>
        </FooterBottom>
      </FooterContainer>
    </Footer>
  );
};

// Footer
const Footer = styled.footer`
  background-color: #1f2937;
  color: white;
  padding: 5rem 2rem 2rem;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FooterBrand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3182ce, #63b3ed);
  border-radius: 12px;
  color: white;
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const FooterLogoText = styled.span`
  font-weight: 800;
  font-size: 1.5rem;
  background: linear-gradient(to right, #3182ce, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FooterText = styled.p`
  font-size: 1rem;
  color: #9ca3af;
  max-width: 300px;
  line-height: 1.6;
`;

const FooterSocial = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #374151;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #3182ce, #63b3ed);
    transform: translateY(-3px);
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FooterColumnTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLink = styled.a`
  font-size: 1rem;
  color: #9ca3af;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;

  &:hover {
    color: white;
    gap: 0.75rem;
  }
`;

const FooterDivider = styled.div`
  height: 1px;
  background-color: #374151;
  margin: 4rem 0 2rem;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const FooterCopyright = styled.div`
  font-size: 0.875rem;
  color: #9ca3af;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FooterBottomLink = styled.a`
  font-size: 0.875rem;
  color: #9ca3af;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

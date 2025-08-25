import styled from "styled-components";
import { QrCode, Menu, X } from "lucide-react";
import { Button } from "../ui/Buton";
import { useLocation, useNavigate } from "react-router-dom";
import { isAuthenticatedAtom, userAtom } from "../atoms/authAtoms";
import { useAtom } from "jotai";

export const ModernHeader = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection,
  scrolled,
}) => {
  const navigate = useNavigate();
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setUser] = useAtom(userAtom);
  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const location = useLocation();

  return (
    <Header mobileMenuOpen={mobileMenuOpen} scrolled={scrolled}>
      <LogoContainer onClick={() => navigate("/")}>
        <LogoIcon>
          <QrCode size={24} />
        </LogoIcon>
        {/* <LogoText>ScanMenu</LogoText> */}
        <LogoText>ScanEz</LogoText>
      </LogoContainer>

      {!mobileMenuOpen && (
        <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} />
        </MobileMenuButton>
      )}

      <MobileMenuOverlay
        isOpen={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* {isAuthenticated && (
        <Nav isOpen={mobileMenuOpen}>
          <CloseButton onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </CloseButton>
          <NavLink href="/">Home</NavLink>
          <NavLink href="#features" onClick={() => scrollToSection("features")}>
            Features
          </NavLink>
          <NavLink href="/menulist">Your menus</NavLink>
          <NavLink
            href="#how-it-works"
            onClick={() => scrollToSection("how-it-works")}
          >
            How It Works
          </NavLink>
          <NavLink
            href="#testimonials"
            onClick={() => scrollToSection("testimonials")}
          >
            Testimonials
          </NavLink>
          <NavLink href="#pricing" onClick={() => scrollToSection("pricing")}>
            Pricing
          </NavLink>
          <NavLink href="#">Contact</NavLink>
          <NavLink onClick={() => handleLogout()}>Logout</NavLink>
        </Nav>
      )} */}

      {isAuthenticated && (
        <Nav isOpen={mobileMenuOpen}>
          <CloseButton onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </CloseButton>

          <NavLink href="/">Home</NavLink>

          {location.pathname === "/" && (
            <>
              <NavLink
                onClick={() => {
                  scrollToSection("features");
                  navigate("#features");
                }}
              >
                Features
              </NavLink>
              <NavLink href="/menulist">Your menus</NavLink>
              <NavLink
                onClick={() => {
                  scrollToSection("how-it-works");
                  navigate("#how-it-works");
                }}
              >
                How It Works
              </NavLink>
              <NavLink
                onClick={() => {
                  scrollToSection("testimonials");
                  navigate("#testimonials");
                }}
              >
                Testimonials
              </NavLink>
              <NavLink
                onClick={() => {
                  scrollToSection("pricing");
                  navigate("#pricing");
                }}
              >
                Pricing
              </NavLink>
              <NavLink href="#">Contact</NavLink>
            </>
          )}

          <NavLink onClick={() => handleLogout()}>Logout</NavLink>
        </Nav>
      )}

      {!isAuthenticated && (
        <HeaderActions>
          <LoginLink href="/login">Log in</LoginLink>
          <PrimaryButton onClick={() => navigate("/register")}>
            Sign Up Free
          </PrimaryButton>
        </HeaderActions>
      )}
    </Header>
  );
};

const Header = styled.header<{ mobileMenuOpen: boolean; scrolled: boolean }>`
  position: fixed;
  padding: 1.5rem 10rem;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) =>
    props.scrolled ? "rgba(255, 255, 255, 0.9)" : "transparent"};
  box-shadow: ${(props) =>
    props.scrolled ? "0 4px 20px rgba(0, 0, 0, 0.05)" : "none"};
  z-index: 40;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    padding: 1.5rem 2rem;
  }
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

const LoginLink = styled.a`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: #3182ce;
  }
`;

const LogoContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoText = styled.span`
  font-weight: 800;
  font-size: 1.5rem;
  background: linear-gradient(to right, #1f2937, #63b3ed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 300px;
    height: 100vh;
    background: linear-gradient(135deg, #3182ce, #63b3ed);
    padding: 6rem 2rem 2rem;
    transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    z-index: 100;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 769px) {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;

const MobileMenuOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 30;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
  transition: opacity 0.3s ease-in-out;
  backdrop-filter: ${(props) => (props.isOpen ? "blur(5px)" : "none")};
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 50;
  color: #3182ce;

  @media (min-width: 769px) {
    display: none;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  @media (min-width: 769px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-family: "Bebas Neue", sans-serif;
  font-size: 24px;
  font-weight: 600;
  transition: all 0.2s;
  cursor: pointer;
  position: relative;
  padding: 0.5rem 0;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(to right, #3182ce, #10b981);
    transition: width 0.3s ease;
  }

  &:hover {
    color: #3182ce;

    &::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    color: white;
    font-size: 1.25rem;
    padding: 0.75rem 0;

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }

    &::after {
      background: white;
    }
  }
`;

const HeaderActions = styled.div`
  display: none;

  @media (min-width: 769px) {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

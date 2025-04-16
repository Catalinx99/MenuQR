// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

// export const Header = () => {
//   const navigate = useNavigate();

//   return (
//     <HeaderWrapper>
//       <HeaderContainer>
//         <Logo onClick={() => navigate("/")}>
//           <LogoIcon />
//           <p>Menu</p>
//           <span>QR</span>
//         </Logo>
//         <NavLinks>
//           <NavLink href="/create-menu">Features</NavLink>
//           <NavLink href="#">Templates</NavLink>
//           <NavLink href="#">Pricing</NavLink>
//           <NavLink href="#">Support</NavLink>
//         </NavLinks>
//         <ButtonGroup>
//           <Button onClick={() => navigate("/login")}>Log In</Button>
//           <Button primary onClick={() => navigate("/register")}>
//             Sign Up Free
//           </Button>
//         </ButtonGroup>
//       </HeaderContainer>
//     </HeaderWrapper>
//   );
// };

// const HeaderWrapper = styled.header`
//   background-color: #ffffff;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
// `;

// const HeaderContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1.25rem 2rem;
//   margin: 0 auto;
// `;

// const NavLinks = styled.nav`
//   display: flex;
//   gap: 2rem;
//   align-items: center;
// `;

// const NavLink = styled.a`
//   text-decoration: none;
//   color: #4a5568;
//   font-weight: 500;
//   font-size: 0.95rem;
//   transition: color 0.2s;

//   &:hover {
//     color: #3182ce;
//   }
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 1rem;
// `;

// const Logo = styled.div`
//   font-size: 1.5rem;
//   font-weight: 700;
//   display: flex;
//   align-items: center;
//   cursor: pointer;

//   span {
//     color: #3182ce;
//     margin-left: 0.25rem;
//   }
//   p {
//     color: #3182ce;
//   }
// `;

// const Button = styled.button<{ primary?: boolean }>`
//   padding: ${(props) => (props.primary ? "0.6rem 1.5rem" : "0.6rem 1.25rem")};
//   font-size: 0.95rem;
//   font-weight: 600;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: all 0.2s;
//   background-color: ${(props) => (props.primary ? "#3182ce" : "transparent")};
//   color: ${(props) => (props.primary ? "white" : "#3182ce")};
//   border: ${(props) => (props.primary ? "none" : "1px solid #3182ce")};

//   &:hover {
//     background-color: ${(props) =>
//       props.primary ? "#2c5282" : "rgba(49, 130, 206, 0.1)"};
//     transform: translateY(-1px);
//   }
// `;

// const LogoIcon = styled.div`
//   width: 24px;
//   height: 24px;
//   background-color: #3182ce;
//   border-radius: 6px;
//   margin-right: 0.5rem;
//   position: relative;

//   &::before {
//     content: "";
//     position: absolute;
//     top: 6px;
//     left: 6px;
//     width: 12px;
//     height: 12px;
//     border-radius: 3px;
//     background-color: white;
//   }
// `;
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo onClick={() => navigate("/")}>
          <LogoIcon />
          <p>Menu</p>
          <span>QR</span>
        </Logo>

        <DesktopNav>
          <NavLinks>
            <NavLink href="/create-menu">Features</NavLink>
            <NavLink href="#">Templates</NavLink>
            <NavLink href="#">Pricing</NavLink>
            <NavLink href="#">Support</NavLink>
          </NavLinks>
          <ButtonGroup>
            <Button onClick={() => navigate("/login")}>Log In</Button>
            <Button primary onClick={() => navigate("/register")}>
              Sign Up
            </Button>
          </ButtonGroup>
        </DesktopNav>

        <MobileMenuIcon onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </MobileMenuIcon>
      </HeaderContainer>

      {isMobileMenuOpen && (
        <MobileNav>
          <NavLinks column>
            <NavLink href="/create-menu">Features</NavLink>
            <NavLink href="#">Templates</NavLink>
            <NavLink href="#">Pricing</NavLink>
            <NavLink href="#">Support</NavLink>
          </NavLinks>
          <ButtonGroup column>
            <Button onClick={() => navigate("/login")}>Log In</Button>
            <Button primary onClick={() => navigate("/register")}>
              Sign Up Free
            </Button>
          </ButtonGroup>
        </MobileNav>
      )}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  margin: 0 auto;
  position: relative;
`;

const DesktopNav = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #4a5568;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNav = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  gap: 1rem;

  @media (min-width: 769px) {
    display: none;
  }
`;

const NavLinks = styled.nav<{ column?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  gap: 2rem;
  align-items: ${(props) => (props.column ? "flex-start" : "center")};
  padding-right: 50px;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #4a5568;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s;

  &:hover {
    color: #3182ce;
  }
`;

const ButtonGroup = styled.div<{ column?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  gap: 1rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    color: #3182ce;
    margin-left: 0.25rem;
  }
  p {
    color: #3182ce;
  }
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: ${(props) => (props.primary ? "0.6rem 1.5rem" : "0.6rem 1.25rem")};
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${(props) => (props.primary ? "#3182ce" : "transparent")};
  color: ${(props) => (props.primary ? "white" : "#3182ce")};
  border: ${(props) => (props.primary ? "none" : "1px solid #3182ce")};

  &:hover {
    background-color: ${(props) =>
      props.primary ? "#2c5282" : "rgba(49, 130, 206, 0.1)"};
    transform: translateY(-1px);
  }

  @media (max-width: 845px) {
    font-size: 0.75rem;
    padding: ${(props) => (props.primary ? "0.5rem 1rem" : "0.5rem 0.9rem")};
  }
`;

const LogoIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: #3182ce;
  border-radius: 6px;
  margin-right: 0.5rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 6px;
    left: 6px;
    width: 12px;
    height: 12px;
    border-radius: 3px;
    background-color: white;
  }
`;

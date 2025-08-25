// import styled from "styled-components";

// export const IFooter = () => {
//   return (
//     <Footer>
//       <FooterContainer>
//         <FooterColumn>
//           <Logo>
//             <LogoIcon />
//             Menu<span>QR</span>
//           </Logo>
//           <FooterLinks>
//             <FooterLink href="#">About Us</FooterLink>
//             <FooterLink href="#">Blog</FooterLink>
//             <FooterLink href="#">Careers</FooterLink>
//           </FooterLinks>
//         </FooterColumn>

//         <FooterColumn>
//           <FooterTitle>Product</FooterTitle>
//           <FooterLinks>
//             <FooterLink href="#">Features</FooterLink>
//             <FooterLink href="#">Templates</FooterLink>
//             <FooterLink href="#">Pricing</FooterLink>
//           </FooterLinks>
//         </FooterColumn>

//         <FooterColumn>
//           <FooterTitle>Resources</FooterTitle>
//           <FooterLinks>
//             <FooterLink href="#">Help Center</FooterLink>
//             <FooterLink href="#">Guides</FooterLink>
//             <FooterLink href="#">API</FooterLink>
//           </FooterLinks>
//         </FooterColumn>

//         <FooterColumn>
//           <FooterTitle>Legal</FooterTitle>
//           <FooterLinks>
//             <FooterLink href="#">Privacy Policy</FooterLink>
//             <FooterLink href="#">Terms of Service</FooterLink>
//             <FooterLink href="#">Cookie Policy</FooterLink>
//           </FooterLinks>
//         </FooterColumn>
//       </FooterContainer>
//       <Copyright>
//         © {new Date().getFullYear()} MenuQR. All rights reserved.
//       </Copyright>
//     </Footer>
//   );
// };

// const Footer = styled.footer`
//   padding: 3rem 2rem;
//   background-color: #2d3748;
//   color: white;
// `;

// const FooterContainer = styled.div`
//   margin: 0 auto;
//   display: flex;
//   justify-content: space-between;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 2rem;
//   }
// `;

// const FooterColumn = styled.div`
//   flex: 1;
// `;

// const FooterTitle = styled.h3`
//   font-size: 1.1rem;
//   font-weight: 600;
//   margin-bottom: 1.5rem;
// `;

// const FooterLinks = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.75rem;
// `;

// const FooterLink = styled.a`
//   color: #cbd5e0;
//   text-decoration: none;
//   font-size: 0.9rem;
//   transition: color 0.2s;

//   &:hover {
//     color: white;
//   }
// `;

// const Copyright = styled.div`
//   text-align: center;
//   padding-top: 3rem;
//   color: #a0aec0;
//   font-size: 0.9rem;
// `;

// const Logo = styled.div`
//   font-size: 1.5rem;
//   font-weight: 700;
//   display: flex;
//   align-items: center;
//   margin-bottom: 1.5rem;

//   span {
//     color: #3182ce;
//     margin-left: 0.25rem;
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

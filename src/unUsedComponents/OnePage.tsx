// "use client";

// import { useState, useEffect, useRef } from "react";
// import styled, { createGlobalStyle, css, keyframes } from "styled-components";
// import {
//   ArrowRight,
//   QrCode,
//   CheckCircle2,
//   ChevronDown,
//   MenuIcon,
//   X,
//   Star,
//   Users,
//   Clock,
//   Smartphone,
//   BarChart3,
//   Zap,
//   Globe,
//   Instagram,
//   Twitter,
//   Facebook,
//   Linkedin,
//   ArrowUp,
//   Mail,
//   Phone,
//   MapPin,
//   Send,
// } from "lucide-react";
// import QrMenuAnimation from "../pages/PhoneAnimation";

// // Animations
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const pulse = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// `;

// const bounce = keyframes`
//   0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
//   40% { transform: translateY(-10px); }
//   60% { transform: translateY(-5px); }
// `;

// // Global styles
// const GlobalStyle = createGlobalStyle`
//   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

//   html {
//     scroll-behavior: smooth;
//     scroll-snap-type: y mandatory;
//   }

//   body {
//     font-family: 'Inter', sans-serif;
//     color: #1a202c;
//     line-height: 1.5;
//     margin: 0;
//     padding: 0;
//     overflow-x: hidden;
//   }

//   * {
//     box-sizing: border-box;
//   }
// `;

// // Styled Components
// const Container = styled.div`
//   position: relative;
// `;

// const Section = styled.section<{ bgColor?: string; bgImage?: string }>`
//   min-height: 100vh;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   scroll-snap-align: start;
//   overflow: hidden;
//   padding: 80px 20px;

//   ${(props) =>
//     props.bgColor &&
//     css`
//       background-color: ${props.bgColor};
//     `}

//   ${(props) =>
//     props.bgImage &&
//     css`
//       background-image: url(${props.bgImage});
//       background-size: cover;
//       background-position: center;
//     `}
// `;

// const SectionInner = styled.div`
//   max-width: 1200px;
//   width: 100%;
//   margin: 0 auto;
//   position: relative;
//   z-index: 2;
// `;

// const Header = styled.header`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   padding: 1rem 2rem;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background-color: rgba(255, 255, 255, 0.9);
//   backdrop-filter: blur(10px);
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//   z-index: 100;
// `;

// const LogoContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// const LogoText = styled.span`
//   font-weight: bold;
//   font-size: 1.25rem;
// `;

// const Nav = styled.nav<{ isOpen: boolean }>`
//   @media (max-width: 768px) {
//     position: fixed;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     width: 250px;
//     background-color: white;
//     box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
//     padding: 5rem 2rem 2rem;
//     transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
//     transition: transform 0.3s ease-in-out;
//     display: flex;
//     flex-direction: column;
//     gap: 1.5rem;
//     z-index: 40;
//   }

//   @media (min-width: 768px) {
//     display: flex;
//     align-items: center;
//     gap: 1.5rem;
//   }
// `;

// const MobileMenuOverlay = styled.div<{ isOpen: boolean }>`
//   position: fixed;
//   inset: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 30;
//   opacity: ${(props) => (props.isOpen ? 1 : 0)};
//   pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
//   transition: opacity 0.3s ease-in-out;
// `;

// const MobileMenuButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: none;
//   border: none;
//   cursor: pointer;
//   z-index: 50;

//   @media (min-width: 768px) {
//     display: none;
//   }
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 1.5rem;
//   right: 1.5rem;
//   background: none;
//   border: none;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   @media (min-width: 768px) {
//     display: none;
//   }
// `;

// const NavLink = styled.a<{ active?: boolean }>`
//   font-size: 0.875rem;
//   font-weight: 500;
//   transition: all 0.2s;
//   cursor: pointer;
//   padding: 0.5rem 0.75rem;
//   border-radius: 0.375rem;
//   position: relative;

//   ${(props) =>
//     props.active
//       ? css`
//           color: #3182ce;
//           background-color: rgba(49, 130, 206, 0.1);
//           font-weight: 600;
//         `
//       : css`
//           color: #4a5568;

//           &:hover {
//             color: #3182ce;
//             background-color: rgba(49, 130, 206, 0.05);
//           }
//         `}

//   @media (max-width: 768px) {
//     font-size: 1rem;
//     padding: 0.75rem;
//     width: 100%;
//     text-align: left;
//   }
// `;

// const Button = styled.button`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 0.375rem;
//   font-weight: 500;
//   transition: all 0.2s;
//   cursor: pointer;
//   border: none;
// `;

// const BlueButton = styled(Button)`
//   background-color: #3182ce;
//   color: white;
//   padding: 0.75rem 1.5rem;
//   font-size: 1rem;

//   &:hover {
//     background-color: #2c5282;
//     transform: translateY(-2px);
//     box-shadow: 0 4px 6px rgba(49, 130, 206, 0.25);
//   }
// `;

// const OutlineButton = styled(Button)`
//   background-color: transparent;
//   border: 1px solid #3182ce;
//   color: #3182ce;
//   padding: 0.75rem 1.5rem;
//   font-size: 1rem;

//   &:hover {
//     background-color: rgba(49, 130, 206, 0.1);
//     transform: translateY(-2px);
//   }
// `;

// const ScrollIndicator = styled.div`
//   position: absolute;
//   bottom: 2rem;
//   left: 50%;
//   transform: translateX(-50%);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 0.5rem;
//   color: #718096;
//   font-size: 0.75rem;
//   font-weight: 500;
//   z-index: 10;
//   animation: ${bounce} 2s infinite;
// `;

// const BackToTop = styled.button<{ visible: boolean }>`
//   position: fixed;
//   bottom: 2rem;
//   right: 2rem;
//   width: 3rem;
//   height: 3rem;
//   border-radius: 50%;
//   background-color: #3182ce;
//   color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   border: none;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s ease;
//   opacity: ${(props) => (props.visible ? 1 : 0)};
//   transform: ${(props) => (props.visible ? "scale(1)" : "scale(0.8)")};
//   pointer-events: ${(props) => (props.visible ? "auto" : "none")};
//   z-index: 90;

//   &:hover {
//     background-color: #2c5282;
//     transform: ${(props) => (props.visible ? "scale(1.1)" : "scale(0.8)")};
//   }
// `;

// // Hero Section
// const HeroContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;
//   gap: 2rem;
//   animation: ${fadeIn} 1s ease-out;
// `;

// const HeroBadge = styled.div`
//   display: inline-flex;
//   align-items: center;
//   background-color: rgba(49, 130, 206, 0.1);
//   color: #3182ce;
//   font-size: 0.875rem;
//   font-weight: 600;
//   padding: 0.5rem 1rem;
//   border-radius: 9999px;
//   margin-bottom: 1rem;
//   gap: 0.5rem;
// `;

// const HeroTitle = styled.h1`
//   font-size: 3.5rem;
//   font-weight: 800;
//   line-height: 1.2;
//   background: linear-gradient(to right, #2d3748, #3182ce);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   margin: 0;

//   @media (max-width: 768px) {
//     font-size: 2.5rem;
//   }
// `;

// const HeroSubtitle = styled.h2`
//   font-size: 1.5rem;
//   font-weight: 700;
//   color: #4a5568;
//   margin: 0;
//   margin-top: 0.5rem;

//   @media (max-width: 768px) {
//     font-size: 1.25rem;
//   }
// `;

// const HeroText = styled.p`
//   font-size: 1.125rem;
//   color: #4b5563;
//   max-width: 600px;
//   margin: 0 auto;
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-top: 1rem;

//   @media (max-width: 640px) {
//     flex-direction: column;
//     width: 100%;
//     max-width: 300px;
//   }
// `;

// const AnimationWrapper = styled.div`
//   max-width: 600px;
//   width: 100%;
//   margin: 2rem auto 0;
//   border-radius: 1rem;
//   overflow: hidden;
//   box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
//     0 10px 10px -5px rgba(0, 0, 0, 0.04);
// `;

// // Features Section
// const FeaturesBg = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: linear-gradient(
//     135deg,
//     rgba(49, 130, 206, 0.05) 0%,
//     rgba(49, 130, 206, 0.1) 100%
//   );
//   z-index: 1;
// `;

// const SectionHeader = styled.div`
//   text-align: center;
//   margin-bottom: 3rem;
//   animation: ${fadeIn} 0.8s ease-out;
// `;

// const SectionTitle = styled.h2`
//   font-size: 2.5rem;
//   font-weight: 700;
//   margin-bottom: 1rem;
//   color: #2d3748;

//   @media (max-width: 768px) {
//     font-size: 2rem;
//   }
// `;

// const SectionSubtitle = styled.p`
//   font-size: 1.125rem;
//   color: #4b5563;
//   max-width: 600px;
//   margin: 0 auto;
// `;

// const FeaturesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 2rem;

//   @media (max-width: 1024px) {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   @media (max-width: 640px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const FeatureCard = styled.div`
//   background-color: white;
//   border-radius: 0.75rem;
//   padding: 2rem;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
//     0 2px 4px -2px rgba(0, 0, 0, 0.1);
//   transition: transform 0.3s ease, box-shadow 0.3s ease;
//   animation: ${fadeIn} 0.8s ease-out;
//   animation-fill-mode: both;

//   &:nth-child(2) {
//     animation-delay: 0.2s;
//   }

//   &:nth-child(3) {
//     animation-delay: 0.4s;
//   }

//   &:nth-child(4) {
//     animation-delay: 0.6s;
//   }

//   &:nth-child(5) {
//     animation-delay: 0.8s;
//   }

//   &:nth-child(6) {
//     animation-delay: 1s;
//   }

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
//       0 4px 6px -4px rgba(0, 0, 0, 0.1);
//   }
// `;

// const FeatureIcon = styled.div`
//   width: 3rem;
//   height: 3rem;
//   border-radius: 0.5rem;
//   background-color: rgba(49, 130, 206, 0.1);
//   color: #3182ce;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 1.5rem;
// `;

// const FeatureTitle = styled.h3`
//   font-size: 1.25rem;
//   font-weight: 600;
//   margin-bottom: 0.75rem;
//   color: #2d3748;
// `;

// const FeatureDescription = styled.p`
//   color: #4b5563;
//   font-size: 0.875rem;
//   line-height: 1.5;
// `;

// // How It Works Section
// const StepsContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 4rem;
//   max-width: 800px;
//   margin: 0 auto;
// `;

// const Step = styled.div`
//   display: flex;
//   gap: 2rem;
//   align-items: center;
//   animation: ${fadeIn} 0.8s ease-out;
//   animation-fill-mode: both;

//   &:nth-child(2) {
//     animation-delay: 0.3s;
//   }

//   &:nth-child(3) {
//     animation-delay: 0.6s;
//   }

//   @media (max-width: 768px) {
//     flex-direction: column;
//     text-align: center;
//   }
// `;

// const StepNumber = styled.div`
//   width: 5rem;
//   height: 5rem;
//   border-radius: 50%;
//   background-color: #3182ce;
//   color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 2rem;
//   font-weight: 700;
//   flex-shrink: 0;
//   box-shadow: 0 10px 15px -3px rgba(49, 130, 206, 0.3);
// `;

// const StepContent = styled.div`
//   flex: 1;
// `;

// const StepTitle = styled.h3`
//   font-size: 1.5rem;
//   font-weight: 600;
//   margin-bottom: 0.75rem;
//   color: #2d3748;
// `;

// const StepDescription = styled.p`
//   color: #4b5563;
//   font-size: 1rem;
//   line-height: 1.6;
// `;

// // Testimonials Section
// const TestimonialsContainer = styled.div`
//   position: relative;
//   width: 100%;
//   max-width: 1000px;
//   margin: 0 auto;
// `;

// const TestimonialCard = styled.div`
//   background-color: white;
//   border-radius: 1rem;
//   padding: 2.5rem;
//   box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
//     0 8px 10px -6px rgba(0, 0, 0, 0.1);
//   margin: 0 auto;
//   max-width: 800px;
//   animation: ${fadeIn} 1s ease-out;
// `;

// const TestimonialContent = styled.div`
//   text-align: center;
// `;

// const TestimonialQuote = styled.p`
//   font-size: 1.25rem;
//   color: #2d3748;
//   line-height: 1.7;
//   font-style: italic;
//   margin-bottom: 2rem;
//   position: relative;

//   &::before,
//   &::after {
//     content: '"';
//     font-size: 4rem;
//     color: rgba(49, 130, 206, 0.2);
//     position: absolute;
//     line-height: 1;
//   }

//   &::before {
//     top: -2rem;
//     left: -1rem;
//   }

//   &::after {
//     bottom: -4rem;
//     right: -1rem;
//     transform: rotate(180deg);
//   }
// `;

// const TestimonialStars = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 0.25rem;
//   color: #ecc94b;
//   margin-bottom: 1.5rem;
// `;

// const TestimonialAuthor = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 0.5rem;
// `;

// const TestimonialAvatar = styled.div`
//   width: 5rem;
//   height: 5rem;
//   border-radius: 50%;
//   overflow: hidden;
//   border: 3px solid #3182ce;
//   margin-bottom: 1rem;
// `;

// const TestimonialAvatarImg = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

// const TestimonialName = styled.div`
//   font-weight: 700;
//   font-size: 1.25rem;
//   color: #2d3748;
// `;

// const TestimonialRole = styled.div`
//   font-size: 0.875rem;
//   color: #718096;
// `;

// // Pricing Section
// const PricingContainer = styled.div`
//   display: flex;
//   gap: 2rem;
//   justify-content: center;
//   width: 100%;

//   @media (max-width: 1024px) {
//     flex-direction: column;
//     align-items: center;
//     max-width: 500px;
//     margin: 0 auto;
//   }
// `;

// const PricingCard = styled.div<{ featured?: boolean }>`
//   background-color: white;
//   border-radius: 1rem;
//   padding: 2.5rem;
//   box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
//     0 8px 10px -6px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   max-width: 350px;
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
//   position: relative;
//   animation: ${fadeIn} 0.8s ease-out;
//   animation-fill-mode: both;

//   &:nth-child(2) {
//     animation-delay: 0.2s;
//   }

//   &:nth-child(3) {
//     animation-delay: 0.4s;
//   }

//   ${(props) =>
//     props.featured &&
//     css`
//       border: 2px solid #3182ce;
//       transform: scale(1.05);

//       @media (max-width: 1024px) {
//         transform: scale(1);
//       }

//       &::after {
//         content: "Most Popular";
//         position: absolute;
//         top: -12px;
//         left: 50%;
//         transform: translateX(-50%);
//         background-color: #3182ce;
//         color: white;
//         font-size: 0.75rem;
//         font-weight: 600;
//         padding: 0.25rem 1rem;
//         border-radius: 9999px;
//       }
//     `}
// `;

// const PricingHeader = styled.div`
//   text-align: center;
// `;

// const PricingTitle = styled.h3`
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: #2d3748;
//   margin-bottom: 0.5rem;
// `;

// const PricingPrice = styled.div`
//   font-size: 3rem;
//   font-weight: 700;
//   color: #2d3748;
//   margin-bottom: 0.5rem;

//   span {
//     font-size: 1rem;
//     font-weight: 500;
//     color: #718096;
//   }
// `;

// const PricingDescription = styled.div`
//   font-size: 0.875rem;
//   color: #718096;
//   text-align: center;
// `;

// const PricingFeatures = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   flex-grow: 1;
// `;

// const PricingFeatureItem = styled.li`
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   font-size: 0.875rem;
//   color: #4b5563;
// `;

// // FAQ Section
// const FAQContainer = styled.div`
//   max-width: 800px;
//   width: 100%;
//   margin: 0 auto;
// `;

// const FAQItem = styled.div`
//   border-bottom: 1px solid #e2e8f0;
//   padding: 1.5rem 0;
//   animation: ${fadeIn} 0.8s ease-out;
//   animation-fill-mode: both;

//   &:nth-child(2) {
//     animation-delay: 0.2s;
//   }

//   &:nth-child(3) {
//     animation-delay: 0.4s;
//   }

//   &:nth-child(4) {
//     animation-delay: 0.6s;
//   }

//   &:nth-child(5) {
//     animation-delay: 0.8s;
//   }
// `;

// const FAQQuestion = styled.button<{ isOpen: boolean }>`
//   width: 100%;
//   text-align: left;
//   background: none;
//   border: none;
//   padding: 0;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   cursor: pointer;
//   font-size: 1.125rem;
//   font-weight: 600;
//   color: ${(props) => (props.isOpen ? "#3182ce" : "#2d3748")};
//   transition: color 0.2s ease;

//   &:hover {
//     color: #3182ce;
//   }
// `;

// const FAQAnswer = styled.div<{ isOpen: boolean }>`
//   font-size: 1rem;
//   color: #4b5563;
//   line-height: 1.6;
//   max-height: ${(props) => (props.isOpen ? "1000px" : "0")};
//   overflow: hidden;
//   transition: all 0.3s ease;
//   opacity: ${(props) => (props.isOpen ? 1 : 0)};
//   margin-top: ${(props) => (props.isOpen ? "1rem" : "0")};
// `;

// // Contact Section
// const ContactGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 3rem;
//   width: 100%;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const ContactInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
//   animation: ${fadeIn} 0.8s ease-out;
// `;

// const ContactTitle = styled.h3`
//   font-size: 1.5rem;
//   font-weight: 600;
//   color: white;
//   margin-bottom: 1rem;
// `;

// const ContactText = styled.p`
//   font-size: 1rem;
//   color: rgba(255, 255, 255, 0.8);
//   line-height: 1.6;
//   margin-bottom: 2rem;
// `;

// const ContactMethods = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
// `;

// const ContactMethod = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   color: white;
// `;

// const ContactIcon = styled.div`
//   width: 2.5rem;
//   height: 2.5rem;
//   border-radius: 50%;
//   background-color: rgba(255, 255, 255, 0.1);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const ContactForm = styled.form`
//   background-color: white;
//   border-radius: 1rem;
//   padding: 2.5rem;
//   box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
//     0 8px 10px -6px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
//   animation: ${fadeIn} 0.8s ease-out;
//   animation-delay: 0.3s;
//   animation-fill-mode: both;
// `;

// const FormGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const FormLabel = styled.label`
//   font-size: 0.875rem;
//   font-weight: 500;
//   color: #4a5568;
// `;

// const FormInput = styled.input`
//   padding: 0.75rem 1rem;
//   border: 1px solid #e2e8f0;
//   border-radius: 0.375rem;
//   font-size: 1rem;
//   transition: all 0.2s ease;

//   &:focus {
//     outline: none;
//     border-color: #3182ce;
//     box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
//   }
// `;

// const FormTextarea = styled.textarea`
//   padding: 0.75rem 1rem;
//   border: 1px solid #e2e8f0;
//   border-radius: 0.375rem;
//   font-size: 1rem;
//   min-height: 150px;
//   resize: vertical;
//   transition: all 0.2s ease;

//   &:focus {
//     outline: none;
//     border-color: #3182ce;
//     box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
//   }
// `;

// const SubmitButton = styled(BlueButton)`
//   width: 100%;
//   padding: 1rem;
//   font-weight: 600;
//   margin-top: 1rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;

//   &:hover {
//     transform: translateY(-2px);
//   }
// `;

// // Footer
// const Footer = styled.footer`
//   background-color: #1a202c;
//   color: white;
//   padding: 2rem;
//   text-align: center;
// `;

// const FooterInner = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 1.5rem;
// `;

// const FooterLogo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// const FooterLogoText = styled.span`
//   font-weight: bold;
//   font-size: 1.25rem;
// `;

// const FooterLinks = styled.div`
//   display: flex;
//   gap: 1.5rem;
//   flex-wrap: wrap;
//   justify-content: center;
// `;

// const FooterLink = styled.a`
//   color: rgba(255, 255, 255, 0.7);
//   font-size: 0.875rem;
//   transition: color 0.2s ease;

//   &:hover {
//     color: white;
//   }
// `;

// const FooterSocial = styled.div`
//   display: flex;
//   gap: 1rem;
// `;

// const SocialLink = styled.a`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 2.5rem;
//   height: 2.5rem;
//   border-radius: 50%;
//   background-color: rgba(255, 255, 255, 0.1);
//   color: white;
//   transition: all 0.2s ease;

//   &:hover {
//     background-color: #3182ce;
//     transform: translateY(-2px);
//   }
// `;

// const FooterCopyright = styled.div`
//   font-size: 0.875rem;
//   color: rgba(255, 255, 255, 0.5);
// `;

// // FAQ data
// const faqData = [
//   {
//     question: "How does the QR code menu system work?",
//     answer:
//       "Our QR code menu system is simple to use. After signing up, you create your digital menu through our intuitive dashboard. We generate a unique QR code that you can print and place on your tables. When customers scan the code with their smartphone camera, they instantly see your beautifully designed digital menu.",
//   },
//   {
//     question: "Can I update my menu in real-time?",
//     answer:
//       "Yes! One of the biggest advantages of our system is the ability to update your menu instantly. You can change prices, add new items, or mark items as sold out in real-time. All changes are immediately reflected on your digital menu without needing to reprint anything.",
//   },
//   {
//     question: "Do customers need to download an app to view the menu?",
//     answer:
//       "No, customers don't need to download any app. Our QR codes open the menu directly in their phone's web browser, making it accessible and convenient for everyone. The menu is optimized for all devices and loads quickly even on slower connections.",
//   },
//   {
//     question: "What kind of analytics do you provide?",
//     answer:
//       "Our platform provides comprehensive analytics including view counts, peak usage times, most viewed items, and customer engagement metrics. This data helps you understand customer preferences and optimize your menu for better results.",
//   },
//   {
//     question: "Is it possible to customize the design of my digital menu?",
//     answer:
//       "We offer multiple professionally designed templates that you can customize with your brand colors, logo, and fonts. For businesses on our Premium and Enterprise plans, we also offer custom design services to create a unique look that perfectly matches your brand identity.",
//   },
// ];

// export default function OnePageLayout() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [openFAQ, setOpenFAQ] = useState<number | null>(0);
//   const [activeSection, setActiveSection] = useState("home");
//   const [showBackToTop, setShowBackToTop] = useState(false);

//   const sections = [
//     "home",
//     "features",
//     "how-it-works",
//     "testimonials",
//     "pricing",
//     "faq",
//     "contact",
//   ];
//   const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

//   const toggleFAQ = (index: number) => {
//     setOpenFAQ(openFAQ === index ? null : index);
//   };

//   const scrollToSection = (id: string) => {
//     setMobileMenuOpen(false);
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       // Show/hide back to top button
//       if (window.scrollY > 500) {
//         setShowBackToTop(true);
//       } else {
//         setShowBackToTop(false);
//       }

//       // Determine active section
//       const scrollPosition = window.scrollY + window.innerHeight / 2;

//       for (const section of sections.reverse()) {
//         const element = document.getElementById(section);
//         if (element && element.offsetTop <= scrollPosition) {
//           setActiveSection(section);
//           break;
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <Container>
//       <GlobalStyle />

//       <Header>
//         <LogoContainer>
//           <QrCode size={32} color="#3182ce" />
//           <LogoText>MenuQR</LogoText>
//         </LogoContainer>

//         <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
//           <MenuIcon size={24} />
//         </MobileMenuButton>

//         <MobileMenuOverlay
//           isOpen={mobileMenuOpen}
//           onClick={() => setMobileMenuOpen(false)}
//         />

//         <Nav isOpen={mobileMenuOpen}>
//           <CloseButton onClick={() => setMobileMenuOpen(false)}>
//             <X size={24} />
//           </CloseButton>
//           <NavLink
//             href="#home"
//             active={activeSection === "home"}
//             onClick={() => scrollToSection("home")}
//           >
//             Home
//           </NavLink>
//           <NavLink
//             href="#features"
//             active={activeSection === "features"}
//             onClick={() => scrollToSection("features")}
//           >
//             Features
//           </NavLink>
//           <NavLink
//             href="#how-it-works"
//             active={activeSection === "how-it-works"}
//             onClick={() => scrollToSection("how-it-works")}
//           >
//             How It Works
//           </NavLink>
//           <NavLink
//             href="#testimonials"
//             active={activeSection === "testimonials"}
//             onClick={() => scrollToSection("testimonials")}
//           >
//             Testimonials
//           </NavLink>
//           <NavLink
//             href="#pricing"
//             active={activeSection === "pricing"}
//             onClick={() => scrollToSection("pricing")}
//           >
//             Pricing
//           </NavLink>
//           <NavLink
//             href="#contact"
//             active={activeSection === "contact"}
//             onClick={() => scrollToSection("contact")}
//           >
//             Contact
//           </NavLink>
//         </Nav>
//       </Header>

//       <BackToTop visible={showBackToTop} onClick={scrollToTop}>
//         <ArrowUp size={20} />
//       </BackToTop>

//       <main>
//         {/* Hero Section */}
//         <Section id="home" ref={(el) => (sectionRefs.current.home = el)}>
//           <SectionInner>
//             <HeroContent>
//               <HeroBadge>
//                 <QrCode size={16} />
//                 Next-Gen Restaurant Solution
//               </HeroBadge>
//               <div>
//                 <HeroTitle>Digital Menus, Reimagined</HeroTitle>
//                 <HeroSubtitle>For the modern restaurant</HeroSubtitle>
//               </div>
//               <HeroText>
//                 Transform your dining experience with beautiful QR code menus.
//                 Update instantly, reduce costs, and collect valuable customer
//                 insights.
//               </HeroText>
//               <ButtonGroup>
//                 <BlueButton>Create Your Menu</BlueButton>
//                 <OutlineButton>
//                   Watch Demo{" "}
//                   <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
//                 </OutlineButton>
//               </ButtonGroup>

//               <AnimationWrapper>
//                 <QrMenuAnimation />
//               </AnimationWrapper>
//             </HeroContent>
//           </SectionInner>

//           <ScrollIndicator onClick={() => scrollToSection("features")}>
//             <span>Scroll Down</span>
//             <ChevronDown size={20} />
//           </ScrollIndicator>
//         </Section>

//         {/* Features Section */}
//         <Section
//           id="features"
//           bgColor="#f7fafc"
//           ref={(el) => (sectionRefs.current.features = el)}
//         >
//           <FeaturesBg />
//           <SectionInner>
//             <SectionHeader>
//               <SectionTitle>Everything You Need</SectionTitle>
//               <SectionSubtitle>
//                 Our platform provides all the tools you need to create, manage,
//                 and optimize your digital menu experience.
//               </SectionSubtitle>
//             </SectionHeader>

//             <FeaturesGrid>
//               <FeatureCard>
//                 <FeatureIcon>
//                   <Zap size={24} />
//                 </FeatureIcon>
//                 <FeatureTitle>Instant Updates</FeatureTitle>
//                 <FeatureDescription>
//                   Change prices, add items, or mark dishes as sold out in
//                   real-time. Updates appear instantly on your customers'
//                   devices.
//                 </FeatureDescription>
//               </FeatureCard>

//               <FeatureCard>
//                 <FeatureIcon>
//                   <Smartphone size={24} />
//                 </FeatureIcon>
//                 <FeatureTitle>Mobile Optimized</FeatureTitle>
//                 <FeatureDescription>
//                   Beautifully designed menus that look great on any device, with
//                   fast loading times and intuitive navigation.
//                 </FeatureDescription>
//               </FeatureCard>

//               <FeatureCard>
//                 <FeatureIcon>
//                   <BarChart3 size={24} />
//                 </FeatureIcon>
//                 <FeatureTitle>Detailed Analytics</FeatureTitle>
//                 <FeatureDescription>
//                   Gain insights into customer behavior with comprehensive
//                   analytics on views, popular items, and peak times.
//                 </FeatureDescription>
//               </FeatureCard>

//               <FeatureCard>
//                 <FeatureIcon>
//                   <Globe size={24} />
//                 </FeatureIcon>
//                 <FeatureTitle>Multilingual Support</FeatureTitle>
//                 <FeatureDescription>
//                   Automatically translate your menu into multiple languages to
//                   accommodate international guests.
//                 </FeatureDescription>
//               </FeatureCard>

//               <FeatureCard>
//                 <FeatureIcon>
//                   <Users size={24} />
//                 </FeatureIcon>
//                 <FeatureTitle>Team Collaboration</FeatureTitle>
//                 <FeatureDescription>
//                   Multiple staff members can manage the menu with different
//                   permission levels for security and control.
//                 </FeatureDescription>
//               </FeatureCard>

//               <FeatureCard>
//                 <FeatureIcon>
//                   <Clock size={24} />
//                 </FeatureIcon>
//                 <FeatureTitle>Time-Based Menus</FeatureTitle>
//                 <FeatureDescription>
//                   Schedule different menus for breakfast, lunch, dinner, or
//                   happy hour that automatically switch at set times.
//                 </FeatureDescription>
//               </FeatureCard>
//             </FeaturesGrid>
//           </SectionInner>

//           <ScrollIndicator onClick={() => scrollToSection("how-it-works")}>
//             <span>Continue</span>
//             <ChevronDown size={20} />
//           </ScrollIndicator>
//         </Section>

//         {/* How It Works Section */}
//         <Section
//           id="how-it-works"
//           ref={(el) => (sectionRefs.current["how-it-works"] = el)}
//         >
//           <SectionInner>
//             <SectionHeader>
//               <SectionTitle>How It Works</SectionTitle>
//               <SectionSubtitle>
//                 Get started with MenuQR in three simple steps and transform your
//                 restaurant experience.
//               </SectionSubtitle>
//             </SectionHeader>

//             <StepsContainer>
//               <Step>
//                 <StepNumber>1</StepNumber>
//                 <StepContent>
//                   <StepTitle>Create Your Digital Menu</StepTitle>
//                   <StepDescription>
//                     Use our intuitive dashboard to build your menu. Add
//                     categories, items, descriptions, prices, and high-quality
//                     images. Choose from our professionally designed templates
//                     and customize colors and fonts to match your brand.
//                   </StepDescription>
//                 </StepContent>
//               </Step>

//               <Step>
//                 <StepNumber>2</StepNumber>
//                 <StepContent>
//                   <StepTitle>Generate & Print QR Codes</StepTitle>
//                   <StepDescription>
//                     Once your menu is ready, generate unique QR codes for your
//                     restaurant. Print them on table tents, stickers, or directly
//                     on your physical menus. We provide high-resolution files
//                     ready for printing.
//                   </StepDescription>
//                 </StepContent>
//               </Step>

//               <Step>
//                 <StepNumber>3</StepNumber>
//                 <StepContent>
//                   <StepTitle>Customers Scan & Order</StepTitle>
//                   <StepDescription>
//                     When customers visit your restaurant, they simply scan the
//                     QR code with their smartphone camera. Your beautiful digital
//                     menu opens instantly in their browser, no app download
//                     required. They can browse your offerings, see images, and
//                     make informed choices.
//                   </StepDescription>
//                 </StepContent>
//               </Step>
//             </StepsContainer>
//           </SectionInner>

//           <ScrollIndicator onClick={() => scrollToSection("testimonials")}>
//             <span>Next</span>
//             <ChevronDown size={20} />
//           </ScrollIndicator>
//         </Section>

//         {/* Testimonials Section */}
//         <Section
//           id="testimonials"
//           bgColor="#f7fafc"
//           ref={(el) => (sectionRefs.current.testimonials = el)}
//         >
//           <FeaturesBg />
//           <SectionInner>
//             <SectionHeader>
//               <SectionTitle>What Our Customers Say</SectionTitle>
//               <SectionSubtitle>
//                 Join thousands of satisfied restaurant owners who have
//                 transformed their business with MenuQR.
//               </SectionSubtitle>
//             </SectionHeader>

//             <TestimonialsContainer>
//               <TestimonialCard>
//                 <TestimonialContent>
//                   <TestimonialStars>
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} size={24} fill="#ecc94b" />
//                     ))}
//                   </TestimonialStars>

//                   <TestimonialQuote>
//                     MenuQR has completely transformed how we manage our
//                     restaurant. We can update our menu instantly, and the
//                     analytics have helped us identify our most popular dishes.
//                     Our customers love the convenience, and we've saved
//                     thousands on printing costs. It's been a game-changer for
//                     our business!
//                   </TestimonialQuote>

//                   <TestimonialAuthor>
//                     <TestimonialAvatar>
//                       <TestimonialAvatarImg
//                         src="/placeholder.svg?height=80&width=80&text=JD"
//                         alt="John Doe"
//                       />
//                     </TestimonialAvatar>
//                     <TestimonialName>John Doe</TestimonialName>
//                     <TestimonialRole>Owner, The Italian Place</TestimonialRole>
//                   </TestimonialAuthor>
//                 </TestimonialContent>
//               </TestimonialCard>
//             </TestimonialsContainer>
//           </SectionInner>

//           <ScrollIndicator onClick={() => scrollToSection("pricing")}>
//             <span>Continue</span>
//             <ChevronDown size={20} />
//           </ScrollIndicator>
//         </Section>

//         {/* Pricing Section */}
//         <Section id="pricing" ref={(el) => (sectionRefs.current.pricing = el)}>
//           <SectionInner>
//             <SectionHeader>
//               <SectionTitle>Simple, Transparent Pricing</SectionTitle>
//               <SectionSubtitle>
//                 Choose the plan that's right for your restaurant, with no hidden
//                 fees or long-term commitments.
//               </SectionSubtitle>
//             </SectionHeader>

//             <PricingContainer>
//               <PricingCard>
//                 <PricingHeader>
//                   <PricingTitle>Starter</PricingTitle>
//                   <PricingPrice>
//                     $29<span>/month</span>
//                   </PricingPrice>
//                   <PricingDescription>
//                     Perfect for small cafés and food trucks
//                   </PricingDescription>
//                 </PricingHeader>

//                 <PricingFeatures>
//                   <PricingFeatureItem>
//                     <CheckCircle2 size={16} color="#3182ce" />1 QR code menu
//                   </PricingFeatureItem>
//                   <PricingFeatureItem>
//                     <CheckCircle2 size={16} color="#3182ce" />
//                     Up to 50 menu items
//                   </PricingFeatureItem>
//                   <PricingFeatureItem>
//                     <CheckCircle2 size={16} color="#3182ce" />
//                     Basic analytics
//                   </PricingFeatureItem>
//                   <PricingFeatureItem>
//                     <CheckCircle2 size={16} color="#3182ce" />3 menu templates
//                   </PricingFeatureItem>
//                   <PricingFeatureItem>
//                     <CheckCircle2 size={16} color="#3182ce" />
//                     Email support
//                   </PricingFeatureItem>
//                 </PricingFeatures>

//                 <BlueButton>Get Started</BlueButton>
//               </PricingCard>

//               <PricingCard featured>
//                 <PricingHeader>
//                   <PricingTitle>Professional</PricingTitle>
//                   <PricingPrice>
//                     $79<span>/month</span>
//                   </PricingPrice>
//                   <PricingDescription>
//                     Ideal for restaurants and bars
//                   </PricingDescription>
//                 </PricingHeader>

//                 <PricingFeatures>
//                   <PricingFeatureItem>
//                     <CheckCircle2 size={16} color="#3182ce" />5 QR code menus
//                   </PricingFeatureItem>
//                   <PricingFeatureItem>
//                     <CheckCircle2 size={16} color="#3182ce" />
//                     Unlimited menu items
//                   </PricingFeatureItem>
//                   <PricingFeatureItem>
//                     <CheckCircle2 size={16} color="#3182ce" />
//                     Advanced analytics
//                   </PricingFeatureItem>
//                   <PricingFeatureItem>
//                     <CheckCircle2 size={16} color="#3182ce" />
//                     All menu templates
//                   </PricingFeatureItem>
//                   <PricingFeatureItem>
//                     <CheckCircle2 size={16} color="#3182ce" />
//                     Priority support
//                   </PricingFeatureItem>
//                   <PricingFeatureItem>
//                     <CheckCircle2 size={16} color="#3182ce" />
//                     Multilingual menus
//                   </PricingFeatureItem>
//                 </PricingFeatures>

//                 <BlueButton>Get Started</BlueButton>
//               </PricingCard>

//               <PricingCard>
//                 <PricingHeader>
//                   <PricingTitle>Enterprise</PricingTitle>
//                   <PricingPrice>
//                     $199<span>/month</span>
//                   </PricingPrice>
//                   <PricingDescription>
//                     For restaurant groups and chains
//                   </PricingDescription>
//                 </PricingHeader>

//                 <PricingFeatures>
//                   <PricingFeatureItem>
//                     <CheckCircle2 size={16} color="#3182ce" />
//                     Unlimited QR code menus
//                   </PricingFeatureItem>
//                   <PricingFeatureItem>
//                     <CheckCircle2 size={16} color="#3182ce" />
//                     Unlimited menu items
//                   </PricingFeatureItem>
//                   <PricingFeatureItem>
//                     <CheckCircle2 size={16} color="#3182ce" />
//                     Enterprise analytics
//                   </PricingFeatureItem>
//                   <PricingFeatureItem>
//                     <CheckCircle2 size={16} color="#3182ce" />
//                     Custom menu design
//                   </PricingFeatureItem>
//                   <PricingFeatureItem>
//                     <CheckCircle2 size={16} color="#3182ce" />
//                     Dedicated account manager
//                   </PricingFeatureItem>
//                   <PricingFeatureItem>
//                     <CheckCircle2 size={16} color="#3182ce" />
//                     API access
//                   </PricingFeatureItem>
//                 </PricingFeatures>

//                 <BlueButton>Contact Sales</BlueButton>
//               </PricingCard>
//             </PricingContainer>
//           </SectionInner>

//           <ScrollIndicator onClick={() => scrollToSection("faq")}>
//             <span>Next</span>
//             <ChevronDown size={20} />
//           </ScrollIndicator>
//         </Section>

//         {/* FAQ Section */}
//         <Section
//           id="faq"
//           bgColor="#f7fafc"
//           ref={(el) => (sectionRefs.current.faq = el)}
//         >
//           <FeaturesBg />
//           <SectionInner>
//             <SectionHeader>
//               <SectionTitle>Frequently Asked Questions</SectionTitle>
//               <SectionSubtitle>
//                 Find answers to common questions about our digital menu
//                 solution.
//               </SectionSubtitle>
//             </SectionHeader>

//             <FAQContainer>
//               {faqData.map((faq, index) => (
//                 <FAQItem key={index}>
//                   <FAQQuestion
//                     isOpen={openFAQ === index}
//                     onClick={() => toggleFAQ(index)}
//                   >
//                     {faq.question}
//                     {openFAQ === index ? (
//                       <ChevronDown size={20} />
//                     ) : (
//                       <ChevronDown size={20} />
//                     )}
//                   </FAQQuestion>
//                   <FAQAnswer isOpen={openFAQ === index}>{faq.answer}</FAQAnswer>
//                 </FAQItem>
//               ))}
//             </FAQContainer>
//           </SectionInner>

//           <ScrollIndicator onClick={() => scrollToSection("contact")}>
//             <span>Contact Us</span>
//             <ChevronDown size={20} />
//           </ScrollIndicator>
//         </Section>

//         {/* Contact Section */}
//         <Section
//           id="contact"
//           bgColor="#3182ce"
//           ref={(el) => (sectionRefs.current.contact = el)}
//         >
//           <SectionInner>
//             <SectionHeader>
//               <SectionTitle style={{ color: "white" }}>
//                 Get In Touch
//               </SectionTitle>
//               <SectionSubtitle style={{ color: "rgba(255, 255, 255, 0.8)" }}>
//                 Have questions or ready to get started? Contact our team today.
//               </SectionSubtitle>
//             </SectionHeader>

//             <ContactGrid>
//               <ContactInfo>
//                 <div>
//                   <ContactTitle>Contact Information</ContactTitle>
//                   <ContactText>
//                     Fill out the form and our team will get back to you within
//                     24 hours. We're here to help you transform your restaurant
//                     experience.
//                   </ContactText>
//                 </div>

//                 <ContactMethods>
//                   <ContactMethod>
//                     <ContactIcon>
//                       <Phone size={20} />
//                     </ContactIcon>
//                     <div>+1 (555) 123-4567</div>
//                   </ContactMethod>

//                   <ContactMethod>
//                     <ContactIcon>
//                       <Mail size={20} />
//                     </ContactIcon>
//                     <div>support@menuqr.com</div>
//                   </ContactMethod>

//                   <ContactMethod>
//                     <ContactIcon>
//                       <MapPin size={20} />
//                     </ContactIcon>
//                     <div>123 Restaurant Ave, San Francisco, CA 94103</div>
//                   </ContactMethod>
//                 </ContactMethods>
//               </ContactInfo>

//               <ContactForm>
//                 <FormGroup>
//                   <FormLabel>Full Name</FormLabel>
//                   <FormInput type="text" placeholder="John Doe" />
//                 </FormGroup>

//                 <FormGroup>
//                   <FormLabel>Email Address</FormLabel>
//                   <FormInput type="email" placeholder="john@example.com" />
//                 </FormGroup>

//                 <FormGroup>
//                   <FormLabel>Restaurant Name</FormLabel>
//                   <FormInput type="text" placeholder="Your Restaurant" />
//                 </FormGroup>

//                 <FormGroup>
//                   <FormLabel>Message</FormLabel>
//                   <FormTextarea placeholder="How can we help you?" />
//                 </FormGroup>

//                 <SubmitButton type="submit">
//                   Send Message <Send size={16} />
//                 </SubmitButton>
//               </ContactForm>
//             </ContactGrid>
//           </SectionInner>
//         </Section>
//       </main>

//       <Footer>
//         <FooterInner>
//           <FooterLogo>
//             <QrCode size={24} color="white" />
//             <FooterLogoText>MenuQR</FooterLogoText>
//           </FooterLogo>

//           <FooterLinks>
//             <FooterLink href="#home">Home</FooterLink>
//             <FooterLink href="#features">Features</FooterLink>
//             <FooterLink href="#how-it-works">How It Works</FooterLink>
//             <FooterLink href="#testimonials">Testimonials</FooterLink>
//             <FooterLink href="#pricing">Pricing</FooterLink>
//             <FooterLink href="#contact">Contact</FooterLink>
//             <FooterLink href="#">Privacy Policy</FooterLink>
//             <FooterLink href="#">Terms of Service</FooterLink>
//           </FooterLinks>

//           <FooterSocial>
//             <SocialLink href="#">
//               <Facebook size={16} />
//             </SocialLink>
//             <SocialLink href="#">
//               <Twitter size={16} />
//             </SocialLink>
//             <SocialLink href="#">
//               <Instagram size={16} />
//             </SocialLink>
//             <SocialLink href="#">
//               <Linkedin size={16} />
//             </SocialLink>
//           </FooterSocial>

//           <FooterCopyright>
//             © {new Date().getFullYear()} MenuQR. All rights reserved.
//           </FooterCopyright>
//         </FooterInner>
//       </Footer>
//     </Container>
//   );
// }

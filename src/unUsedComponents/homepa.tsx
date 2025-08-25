// "use client";

// import { useEffect, useState, useRef } from "react";
// import styled, { css, keyframes, createGlobalStyle } from "styled-components";
// import {
//   ArrowRight,
//   QrCode,
//   Star,
//   MapPin,
//   ChevronRight,
//   Heart,
//   Share2,
//   Camera,
//   ImageIcon,
//   Sparkles,
// } from "lucide-react";

// import Restaurant from "./restaurant.jpg";
// import Fettucine from "./Fettuccine.jpg";
// import Pizza from "./pizza.jpeg";
// import Salad from "./salad.jpg";

// // Enhanced Animations
// const scanAnimation = keyframes`
//   0% { top: 0; opacity: 0.8; }
//   50% { opacity: 1; }
//   100% { top: 100%; opacity: 0.8; }
// `;

// const fadeIn = keyframes`
//   from { opacity: 0; transform: scale(0.9); }
//   to { opacity: 1; transform: scale(1); }
// `;

// const pulse = keyframes`
//   0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.4); }
//   70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(13, 148, 136, 0); }
//   100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(13, 148, 136, 0); }
// `;

// const float = keyframes`
//   0% { transform: translateY(0px) rotate(0deg); }
//   50% { transform: translateY(-10px) rotate(0.5deg); }
//   100% { transform: translateY(0px) rotate(0deg); }
// `;

// const shimmer = keyframes`
//   0% { background-position: -200% 0; }
//   100% { background-position: 200% 0; }
// `;

// const breathe = keyframes`
//   0% { opacity: 0.7; }
//   50% { opacity: 1; }
//   100% { opacity: 0.7; }
// `;

// const rotateIn = keyframes`
//   from { transform: rotate(-10deg) scale(0.9); opacity: 0; }
//   to { transform: rotate(0) scale(1); opacity: 1; }
// `;

// const GlobalStyle = createGlobalStyle`
//   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

//   body {
//     font-family: 'Inter', sans-serif;
//   }
// `;

// // Styled Components
// const Container = styled.div`
//   min-height: 100vh;
//   background-color: white;
//   font-family: "Inter", sans-serif;
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

// const SmallButton = styled(Button)`
//   padding: 0.5rem 0.75rem;
//   font-size: 0.875rem;
// `;

// const LargeButton = styled(Button)`
//   padding: 0.75rem 1.5rem;
//   font-size: 1rem;
// `;

// const TealButton = styled(Button)`
//   background-color: #0d9488;
//   color: white;

//   &:hover {
//     background-color: #0f766e;
//   }
// `;

// const OutlineButton = styled(Button)`
//   background-color: transparent;
//   border: 1px solid #0d9488;
//   color: #0d9488;

//   &:hover {
//     background-color: rgba(13, 148, 136, 0.1);
//   }
// `;

// const HeroSection = styled.section`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 3rem 1rem;

//   @media (min-width: 768px) {
//     padding: 5rem 1rem;
//   }
// `;

// const HeroGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 3rem;
//   align-items: center;

//   @media (min-width: 1024px) {
//     grid-template-columns: 1fr 1fr;
//   }
// `;

// const HeroContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
//   text-align: center;

//   @media (min-width: 1024px) {
//     text-align: left;
//   }
// `;

// const HeroTitle = styled.h1`
//   font-size: 2.5rem;
//   font-weight: bold;
//   line-height: 1.2;

//   @media (min-width: 768px) {
//     font-size: 3.75rem;
//   }
// `;

// const TealSpan = styled.span`
//   color: #0d9488;
//   position: relative;

//   &::after {
//     content: "";
//     position: absolute;
//     bottom: 0.1em;
//     left: 0;
//     width: 100%;
//     height: 0.1em;
//     background-color: rgba(13, 148, 136, 0.2);
//     z-index: -1;
//   }
// `;

// const HeroText = styled.p`
//   font-size: 1.125rem;
//   color: #4b5563;
//   max-width: 28rem;
//   margin: 0 auto;

//   @media (min-width: 1024px) {
//     margin: 0;
//   }
// `;

// const ButtonGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   justify-content: center;

//   @media (min-width: 640px) {
//     flex-direction: row;
//   }

//   @media (min-width: 1024px) {
//     justify-content: flex-start;
//   }
// `;

// // Enhanced Animation Container
// const AnimationContainer = styled.div`
//   position: relative;
//   height: 550px;
//   margin: 0 auto;
//   perspective: 1000px;
// `;

// const SceneBackground = styled.div`
//   position: absolute;
//   inset: -20px;
//   border-radius: 1.5rem;
//   background: linear-gradient(to bottom right, #f8fafc, #f1f5f9);
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
//     0 2px 4px -2px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5);
//   overflow: hidden;
//   z-index: 0;

//   &::before {
//     content: "";
//     position: absolute;
//     width: 300px;
//     height: 300px;
//     border-radius: 50%;
//     background: radial-gradient(
//       circle,
//       rgba(13, 148, 136, 0.1) 0%,
//       rgba(13, 148, 136, 0) 70%
//     );
//     top: -100px;
//     right: -100px;
//   }

//   &::after {
//     content: "";
//     position: absolute;
//     width: 200px;
//     height: 200px;
//     border-radius: 50%;
//     background: radial-gradient(
//       circle,
//       rgba(13, 148, 136, 0.05) 0%,
//       rgba(13, 148, 136, 0) 70%
//     );
//     bottom: -50px;
//     left: -50px;
//   }
// `;

// const TableBackground = styled.div`
//   position: absolute;
//   inset: 20px;
//   border-radius: 1rem;
//   overflow: hidden;
//   box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
//     0 8px 10px -6px rgba(0, 0, 0, 0.1);
//   z-index: 1;
// `;

// const TableImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

// const TableOverlay = styled.div`
//   position: absolute;
//   inset: 0;
//   background: linear-gradient(
//     to bottom,
//     rgba(0, 0, 0, 0.1),
//     rgba(0, 0, 0, 0.3)
//   );
//   z-index: 2;
// `;

// const AmbientElements = styled.div`
//   position: absolute;
//   inset: 0;
//   z-index: 3;
//   pointer-events: none;
// `;

// const AmbientElement = styled.div`
//   position: absolute;
//   width: 80px;
//   height: 80px;
//   border-radius: 0.5rem;
//   background-color: rgba(255, 255, 255, 0.9);
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

//   &:nth-child(1) {
//     top: 10%;
//     left: 10%;
//     transform: rotate(-5deg);
//     width: 60px;
//     height: 60px;
//     background-color: rgba(255, 255, 255, 0.8);
//   }

//   &:nth-child(2) {
//     bottom: 15%;
//     right: 15%;
//     transform: rotate(8deg);
//     width: 70px;
//     height: 70px;
//   }
// `;

// const QrCodeContainer = styled.div<{
//   isAnimating: boolean;
//   isPulsing: boolean;
// }>`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(
//       -50%,
//       ${(props) => (props.isAnimating ? "-60%" : "-50%")}
//     )
//     ${(props) => (props.isAnimating ? "scale(1.1)" : "scale(1)")};
//   transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
//   z-index: 10;

//   ${(props) =>
//     props.isPulsing &&
//     css`
//       animation: ${pulse} 2s infinite;
//     `}
// `;

// const QrCodeBox = styled.div`
//   background-color: white;
//   padding: 1.25rem;
//   border-radius: 0.75rem;
//   box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
//     0 4px 6px -4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05);
//   text-align: center;
//   position: relative;

//   &::before {
//     content: "";
//     position: absolute;
//     inset: -3px;
//     border-radius: 0.9rem;
//     background: linear-gradient(45deg, #0d9488, #14b8a6);
//     z-index: -1;
//     opacity: 0.3;
//   }
// `;

// const QrCodeInner = styled.div`
//   position: relative;

//   &::after {
//     content: "";
//     position: absolute;
//     inset: -8px;
//     border-radius: 0.5rem;
//     background: linear-gradient(
//       45deg,
//       rgba(13, 148, 136, 0.1),
//       rgba(20, 184, 166, 0.1)
//     );
//     z-index: -1;
//     opacity: 0;
//     transition: opacity 0.3s ease;
//   }

//   &:hover::after {
//     opacity: 1;
//   }
// `;

// const QrCodeLogo = styled.div`
//   position: absolute;
//   inset: 50%;
//   transform: translate(-50%, -50%);
//   width: 30px;
//   height: 30px;
//   background-color: white;
//   border-radius: 6px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.8);
// `;

// const QrCodeText = styled.div`
//   margin-top: 0.75rem;
//   font-size: 0.875rem;
//   font-weight: 600;
//   color: #0d9488;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.25rem;
// `;

// const PhoneContainer = styled.div<{
//   isAnimating: boolean;
//   animationStage: number;
// }>`
//   position: absolute;
//   bottom: 0;
//   right: 0;
//   transform: translate(
//       ${(props) => {
//         if (props.animationStage === 0) return "100px";
//         if (props.animationStage === 1) return "0";
//         return "0";
//       }},
//       ${(props) => {
//         if (props.animationStage === 0) return "100px";
//         if (props.animationStage === 1) return "0";
//         return "0";
//       }}
//     )
//     rotate(
//       ${(props) => {
//         if (props.animationStage === 0) return "45deg";
//         if (props.animationStage === 1) return "0deg";
//         return "0deg";
//       }}
//     );
//   transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
//   z-index: 20;
//   filter: drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15));
// `;

// const Phone = styled.div`
//   position: relative;
//   width: 220px;
//   height: 440px;
//   background-color: #111827;
//   border-radius: 40px;
//   padding: 0.75rem;
//   border: 8px solid #1f2937;
//   box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
//     inset 0 2px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.1);
//   overflow: hidden;
// `;

// const PhoneButtons = styled.div`
//   position: absolute;
//   left: -8px;
//   top: 100px;
//   width: 3px;
//   height: 60px;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;

//   &::before,
//   &::after {
//     content: "";
//     height: 25px;
//     width: 3px;
//     background-color: #1f2937;
//     border-top-left-radius: 2px;
//     border-bottom-left-radius: 2px;
//   }
// `;

// const PhoneButtonRight = styled.div`
//   position: absolute;
//   right: -8px;
//   top: 120px;
//   width: 3px;
//   height: 30px;
//   background-color: #1f2937;
//   border-top-right-radius: 2px;
//   border-bottom-right-radius: 2px;
// `;

// const PhoneNotch = styled.div`
//   position: absolute;
//   top: 0;
//   left: 50%;
//   transform: translateX(-50%);
//   width: 40%;
//   height: 1.75rem;
//   background-color: #1f2937;
//   border-bottom-left-radius: 1rem;
//   border-bottom-right-radius: 1rem;
//   display: flex;
//   justify-content: center;
//   align-items: flex-end;
//   padding-bottom: 4px;

//   &::before {
//     content: "";
//     width: 6px;
//     height: 6px;
//     border-radius: 50%;
//     background-color: rgba(255, 255, 255, 0.5);
//   }
// `;

// const PhoneScreen = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: white;
//   border-radius: 32px;
//   overflow: hidden;
//   position: relative;
//   display: flex;
//   flex-direction: column;
// `;

// const PhoneStatusBar = styled.div`
//   height: 28px;
//   background-color: #f3f4f6;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0 12px;
//   font-size: 12px;
//   color: #111827;
//   font-weight: 500;
//   border-bottom: 1px solid rgba(0, 0, 0, 0.05);
// `;

// const PhoneTime = styled.div`
//   font-weight: 600;
// `;

// const PhoneIcons = styled.div`
//   display: flex;
//   gap: 6px;
//   align-items: center;
// `;

// const PhoneIcon = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 2px;

//   &::before {
//     content: "";
//     display: block;
//     width: 3px;
//     height: 8px;
//     background-color: #111827;
//     border-radius: 1px;
//   }

//   &::after {
//     content: "";
//     display: block;
//     width: 3px;
//     height: 6px;
//     background-color: #111827;
//     border-radius: 1px;
//   }
// `;

// const PhoneBattery = styled.div`
//   width: 14px;
//   height: 8px;
//   border: 1px solid #111827;
//   border-radius: 2px;
//   padding: 1px;
//   display: flex;
//   align-items: center;

//   &::before {
//     content: "";
//     display: block;
//     width: 8px;
//     height: 4px;
//     background-color: #111827;
//     border-radius: 1px;
//   }

//   &::after {
//     content: "";
//     display: block;
//     width: 1px;
//     height: 3px;
//     background-color: #111827;
//     margin-left: 1px;
//   }
// `;

// const PhoneCameraUI = styled.div<{ isScanning: boolean }>`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   background-color: ${(props) => (props.isScanning ? "#000" : "#f3f4f6")};
//   transition: background-color 0.3s ease;
// `;

// const PhoneAppBar = styled.div`
//   height: 50px;
//   background-color: #0d9488;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0 16px;
//   color: white;
//   font-weight: 500;
// `;

// const PhoneAppTitle = styled.div`
//   font-size: 16px;
//   display: flex;
//   align-items: center;
//   gap: 6px;
// `;

// const PhoneAppActions = styled.div`
//   display: flex;
//   gap: 16px;
// `;

// const CameraViewfinder = styled.div`
//   flex: 1;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   overflow: hidden;
// `;

// const CameraGrid = styled.div`
//   position: absolute;
//   inset: 0;
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   grid-template-rows: repeat(3, 1fr);
//   opacity: 0.2;
//   pointer-events: none;

//   &::before,
//   &::after {
//     content: "";
//     position: absolute;
//     background-color: white;
//   }

//   &::before {
//     top: 33.33%;
//     left: 0;
//     right: 0;
//     height: 1px;
//   }

//   &::after {
//     left: 33.33%;
//     top: 0;
//     bottom: 0;
//     width: 1px;
//   }
// `;

// const CameraOverlay = styled.div`
//   position: absolute;
//   inset: 0;
//   background-color: rgba(0, 0, 0, 0.3);

//   &::before {
//     content: "";
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     width: 200px;
//     height: 200px;
//     background-color: transparent;
//     box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5);
//   }
// `;

// const CameraControls = styled.div`
//   height: 80px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 20px;
//   background-color: rgba(0, 0, 0, 0.8);
// `;

// const CameraButton = styled.div`
//   width: 60px;
//   height: 60px;
//   border-radius: 50%;
//   border: 3px solid white;
//   background-color: rgba(255, 255, 255, 0.2);
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   &::after {
//     content: "";
//     width: 52px;
//     height: 52px;
//     border-radius: 50%;
//     background-color: white;
//     transform: scale(0.9);
//     transition: transform 0.2s ease;
//   }

//   &:hover::after {
//     transform: scale(0.85);
//   }
// `;

// const CameraMode = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: rgba(255, 255, 255, 0.1);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 12px;
//   color: white;
//   transition: all 0.2s ease;

//   &:hover {
//     background-color: rgba(255, 255, 255, 0.2);
//   }
// `;

// const ScanResult = styled.div<{ isVisible: boolean }>`
//   position: absolute;
//   top: 20px;
//   left: 20px;
//   right: 20px;
//   background-color: rgba(13, 148, 136, 0.95);
//   padding: 12px;
//   border-radius: 8px;
//   color: white;
//   font-size: 13px;
//   font-weight: 500;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   opacity: ${(props) => (props.isVisible ? 1 : 0)};
//   transform: translateY(${(props) => (props.isVisible ? "0" : "-20px")});
//   transition: all 0.3s ease;
//   transition-delay: ${(props) => (props.isVisible ? "1.5s" : "0s")};
//   z-index: 30;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

//   &::before {
//     content: "";
//     position: absolute;
//     left: 0;
//     bottom: -5px;
//     width: 100%;
//     height: 5px;
//     background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), transparent);
//   }
// `;

// const ScanResultLoader = styled.div`
//   position: relative;
//   width: 100px;
//   height: 4px;
//   background-color: rgba(255, 255, 255, 0.3);
//   border-radius: 2px;
//   overflow: hidden;
//   margin-left: auto;

//   &::after {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     height: 100%;
//     width: 30%;
//     background-color: white;
//     border-radius: 2px;
//     animation: ${shimmer} 1.5s infinite linear;
//     background: linear-gradient(
//       90deg,
//       rgba(255, 255, 255, 0.3) 0%,
//       rgba(255, 255, 255, 1) 50%,
//       rgba(255, 255, 255, 0.3) 100%
//     );
//     background-size: 200% 100%;
//   }
// `;

// const ScanningOverlay = styled.div<{ isScanning: boolean }>`
//   position: absolute;
//   inset: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   opacity: ${(props) => (props.isScanning ? 1 : 0)};
//   transition: opacity 0.5s ease-in-out;
// `;

// const ScanningBackground = styled.div`
//   position: absolute;
//   inset: 0;
//   background-color: rgba(0, 0, 0, 0.5);
// `;

// const ScanningLine = styled.div<{ isScanning: boolean }>`
//   position: absolute;
//   left: 0;
//   right: 0;
//   height: 2px;
//   background: linear-gradient(
//     to right,
//     rgba(13, 148, 136, 0) 0%,
//     rgba(13, 148, 136, 1) 50%,
//     rgba(13, 148, 136, 0) 100%
//   );
//   box-shadow: 0 0 10px 2px rgba(13, 148, 136, 0.5);

//   ${(props) =>
//     props.isScanning &&
//     css`
//       animation: ${scanAnimation} 1.5s cubic-bezier(0.4, 0, 0.2, 1);
//     `}
// `;

// const ScanningCorners = styled.div`
//   position: absolute;
//   inset: 50%;
//   width: 200px;
//   height: 200px;
//   transform: translate(-50%, -50%);
//   pointer-events: none;
// `;

// const ScanCorner = styled.div`
//   position: absolute;
//   width: 30px;
//   height: 30px;
//   border: 3px solid #0d9488;
//   opacity: 0.8;

//   &:nth-child(1) {
//     top: 0;
//     left: 0;
//     border-right: none;
//     border-bottom: none;
//     border-top-left-radius: 4px;
//   }

//   &:nth-child(2) {
//     top: 0;
//     right: 0;
//     border-left: none;
//     border-bottom: none;
//     border-top-right-radius: 4px;
//   }

//   &:nth-child(3) {
//     bottom: 0;
//     left: 0;
//     border-right: none;
//     border-top: none;
//     border-bottom-left-radius: 4px;
//   }

//   &:nth-child(4) {
//     bottom: 0;
//     right: 0;
//     border-left: none;
//     border-top: none;
//     border-bottom-right-radius: 4px;
//   }
// `;

// const ScanningEffect = styled.div`
//   position: absolute;
//   inset: 50%;
//   width: 220px;
//   height: 220px;
//   transform: translate(-50%, -50%);
//   border-radius: 10px;
//   box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5);
//   pointer-events: none;

//   &::before {
//     content: "";
//     position: absolute;
//     inset: -5px;
//     border-radius: 15px;
//     background: linear-gradient(
//       45deg,
//       #0d9488,
//       transparent,
//       #0d9488,
//       transparent
//     );
//     background-size: 400% 400%;
//     animation: ${shimmer} 3s linear infinite;
//     opacity: 0.5;
//   }
// `;

// const DigitalMenu = styled.div<{ isVisible: boolean }>`
//   position: absolute;
//   top: 10%;
//   left: 10%;
//   width: 320px;
//   background-color: white;
//   border-radius: 1rem;
//   box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
//     0 0 0 1px rgba(0, 0, 0, 0.05);
//   overflow: hidden;
//   opacity: ${(props) => (props.isVisible ? 1 : 0)};
//   transform: ${(props) =>
//     props.isVisible ? "scale(1) rotate(0deg)" : "scale(0.8) rotate(-5deg)"};
//   transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
//   transition-delay: ${(props) => (props.isVisible ? "1.8s" : "0s")};
//   z-index: 333;

//   ${(props) =>
//     props.isVisible &&
//     css`
//       animation: ${float} 4s ease-in-out infinite;
//       animation-delay: 2.5s;
//     `}
// `;

// const MenuHeader = styled.div`
//   position: relative;
//   height: 140px;
//   overflow: hidden;
// `;

// const MenuHeaderImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   filter: brightness(0.7);
// `;

// const MenuHeaderOverlay = styled.div`
//   position: absolute;
//   inset: 0;
//   background: linear-gradient(
//     to bottom,
//     rgba(0, 0, 0, 0.3),
//     rgba(0, 0, 0, 0.7)
//   );
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   padding: 1rem;
//   color: white;
// `;

// const MenuBadge = styled.div`
//   display: inline-flex;
//   align-items: center;
//   background-color: rgba(13, 148, 136, 0.9);
//   color: white;
//   font-size: 10px;
//   font-weight: 600;
//   padding: 4px 8px;
//   border-radius: 4px;
//   margin-bottom: 8px;
//   gap: 4px;
// `;

// const MenuTitle = styled.h3`
//   font-weight: bold;
//   margin: 0;
//   font-size: 24px;
//   display: flex;
//   align-items: center;
//   gap: 6px;
// `;

// const MenuTagline = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   margin-top: 6px;
//   font-size: 12px;
//   opacity: 0.9;
// `;

// const MenuRating = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 4px;
//   font-weight: 500;
// `;

// const MenuInfo = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 12px 16px;
//   border-bottom: 1px solid #e5e7eb;
// `;

// const MenuInfoItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 4px;
// `;

// const MenuInfoLabel = styled.div`
//   font-size: 10px;
//   color: #6b7280;
// `;

// const MenuInfoValue = styled.div`
//   font-size: 14px;
//   font-weight: 600;
//   color: #111827;
// `;

// const MenuContent = styled.div`
//   padding: 1rem;
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
//   max-height: 300px;
//   overflow-y: auto;

//   &::-webkit-scrollbar {
//     width: 4px;
//   }

//   &::-webkit-scrollbar-track {
//     background: #f1f5f9;
//   }

//   &::-webkit-scrollbar-thumb {
//     background-color: #cbd5e1;
//     border-radius: 2px;
//   }
// `;

// const MenuSection = styled.div`
//   margin-bottom: 10px;
// `;

// const MenuSectionTitle = styled.h4`
//   font-size: 16px;
//   font-weight: 600;
//   color: #111827;
//   margin: 0 0 12px 0;
//   padding-bottom: 8px;
//   border-bottom: 1px solid #e5e7eb;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const MenuSectionAction = styled.span`
//   font-size: 12px;
//   color: #0d9488;
//   font-weight: 500;
//   display: flex;
//   align-items: center;
//   gap: 2px;
//   cursor: pointer;
// `;

// const MenuItem = styled.div<{ delay: number; isVisible: boolean }>`
//   display: flex;
//   gap: 12px;
//   padding: 8px;
//   border-radius: 8px;
//   transition: background-color 0.2s ease;
//   cursor: pointer;
//   opacity: ${(props) => (props.isVisible ? 1 : 0)};
//   transform: ${(props) =>
//     props.isVisible ? "translateY(0)" : "translateY(10px)"};
//   transition: all 0.5s ease-out;
//   transition-delay: ${(props) =>
//     props.isVisible ? `${2 + props.delay * 0.2}s` : "0s"};

//   &:hover {
//     background-color: #f9fafb;
//   }

//   &:active {
//     background-color: #f3f4f6;
//   }
// `;

// const MenuItemImage = styled.div`
//   width: 80px;
//   height: 80px;
//   flex-shrink: 0;
//   background-color: #f3f4f6;
//   border-radius: 8px;
//   overflow: hidden;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// `;

// const MenuItemImageContent = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   transition: transform 0.3s ease;

//   ${MenuItem}:hover & {
//     transform: scale(1.05);
//   }
// `;

// const MenuItemContent = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// const MenuItemTitle = styled.div`
//   font-weight: 600;
//   font-size: 14px;
//   color: #111827;
//   margin-bottom: 4px;
// `;

// const MenuItemDescription = styled.div`
//   font-size: 12px;
//   color: #6b7280;
//   margin-bottom: 6px;
//   line-height: 1.4;
// `;

// const MenuItemBottom = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const MenuItemPrice = styled.div`
//   font-weight: 600;
//   font-size: 14px;
//   color: #0d9488;
// `;

// const MenuItemAction = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 24px;
//   height: 24px;
//   border-radius: 50%;
//   background-color: #0d9488;
//   color: white;
//   font-size: 14px;
//   transition: all 0.2s ease;

//   &:hover {
//     background-color: #0f766e;
//     transform: scale(1.1);
//   }
// `;

// const MenuFooter = styled.div`
//   padding: 12px 16px;
//   background-color: #f9fafb;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   font-size: 12px;
//   color: #6b7280;
//   border-top: 1px solid #e5e7eb;
// `;

// const MenuFooterLink = styled.span`
//   color: #0d9488;
//   font-weight: 500;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 4px;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const MenuActions = styled.div`
//   display: flex;
//   gap: 8px;
// `;

// const MenuActionButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 32px;
//   height: 32px;
//   border-radius: 50%;
//   background-color: white;
//   color: #111827;
//   border: none;
//   cursor: pointer;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//   transition: all 0.2s ease;

//   &:hover {
//     background-color: #f3f4f6;
//     transform: translateY(-2px);
//   }
// `;

// // Tabs Components
// const TabsSection = styled.section`
//   padding: 5rem 1rem;
//   background-color: #f9fafb;
// `;

// const TabsInner = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const TabsHeader = styled.div`
//   text-align: center;
//   margin-bottom: 3rem;
// `;

// const TabsTitle = styled.h2`
//   font-size: 1.875rem;
//   font-weight: bold;
// `;

// const TabsDescription = styled.p`
//   color: #4b5563;
//   margin-top: 1rem;
//   max-width: 36rem;
//   margin-left: auto;
//   margin-right: auto;
// `;

// const TabsContainer = styled.div`
//   max-width: 48rem;
//   margin: 0 auto;
// `;

// const TabsList = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   margin-bottom: 2rem;
//   border-radius: 0.5rem;
//   overflow: hidden;
// `;

// const TabTrigger = styled.button<{ isActive: boolean }>`
//   padding: 0.75rem;
//   background-color: ${(props) => (props.isActive ? "white" : "#e5e7eb")};
//   font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
//   border: none;
//   cursor: pointer;
//   transition: all 0.2s;
//   color: ${(props) => (props.isActive ? "#0d9488" : "#4b5563")};

//   &:hover {
//     background-color: ${(props) => (props.isActive ? "white" : "#d1d5db")};
//   }
// `;

// const TabContent = styled.div<{ isActive: boolean }>`
//   display: ${(props) => (props.isActive ? "block" : "none")};
//   border: 1px solid #e5e7eb;
//   border-radius: 0.75rem;
//   overflow: hidden;
//   box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//   transition: all 0.3s ease;
//   animation: ${fadeIn} 0.5s ease-out;
// `;

// const TabImageContainer = styled.div`
//   aspect-ratio: 4/3;
//   position: relative;
// `;

// const TabImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// `;

// const TabTextContent = styled.div`
//   padding: 1.5rem;
//   background-color: white;
// `;

// const TabContentTitle = styled.h3`
//   font-size: 1.25rem;
//   font-weight: bold;
//   margin-bottom: 0.5rem;
//   text-transform: capitalize;
//   color: #111827;
// `;

// const TabContentDescription = styled.p`
//   color: #4b5563;
//   margin-bottom: 1rem;
// `;

// const CTASection = styled.section`
//   padding: 5rem 1rem;
//   background: linear-gradient(to bottom, white, #f9fafb);
// `;

// const CTAInner = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   text-align: center;
// `;

// const CTATitle = styled.h2`
//   font-size: 1.875rem;
//   font-weight: bold;
//   margin-bottom: 1.5rem;
// `;

// const CTADescription = styled.p`
//   color: #4b5563;
//   max-width: 36rem;
//   margin: 0 auto 2rem;
// `;

// const CTASmallText = styled.p`
//   font-size: 0.875rem;
//   color: #6b7280;
//   margin-top: 1rem;
// `;

// export default function AnimatedLayout() {
//   const [animationStage, setAnimationStage] = useState(0);
//   const [isScanning, setIsScanning] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [isPulsing, setIsPulsing] = useState(true);
//   const [activeTab, setActiveTab] = useState("elegant");
//   const animationTimer = useRef<NodeJS.Timeout | null>(null);

//   // Enhanced animation sequence
//   useEffect(() => {
//     const startAnimation = () => {
//       // Reset states
//       setAnimationStage(0);
//       setIsScanning(false);
//       setShowMenu(false);
//       setIsPulsing(true);

//       // Start animation sequence
//       setTimeout(() => {
//         setIsPulsing(false);
//         setAnimationStage(1); // Move phone into position

//         setTimeout(() => {
//           setIsScanning(true); // Start scanning animation

//           setTimeout(() => {
//             setIsScanning(false); // End scanning
//             setShowMenu(true); // Show menu

//             // Reset after complete cycle
//             setTimeout(() => {
//               setShowMenu(false);
//               setAnimationStage(0);

//               // Wait before starting again
//               setTimeout(() => {
//                 setIsPulsing(true);
//               }, 500);
//             }, 5000);
//           }, 1800);
//         }, 1200);
//       }, 2000);
//     };

//     // Start animation and set up loop
//     startAnimation();

//     // Set up repeating animation
//     animationTimer.current = setInterval(startAnimation, 12000);

//     return () => {
//       if (animationTimer.current) {
//         clearInterval(animationTimer.current);
//       }
//     };
//   }, []);

//   return (
//     <Container>
//       <GlobalStyle />

//       <main>
//         <HeroSection>
//           <HeroGrid>
//             <HeroContent>
//               <HeroTitle>
//                 <TealSpan>Scan, View, Order.</TealSpan> The Future of Restaurant
//                 Menus
//               </HeroTitle>
//               <HeroText>
//                 Create beautiful digital menus accessible via QR codes. Update
//                 instantly, reduce costs, and enhance your customers' dining
//                 experience.
//               </HeroText>
//               <ButtonGroup>
//                 <LargeButton as={TealButton}>Create Your Menu</LargeButton>
//                 <LargeButton as={OutlineButton}>
//                   See Demo{" "}
//                   <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
//                 </LargeButton>
//               </ButtonGroup>
//             </HeroContent>

//             {/* Enhanced Interactive Animation Section */}
//             <AnimationContainer>
//               <SceneBackground />

//               {/* Restaurant table background */}
//               <TableBackground>
//                 <TableImage src={Restaurant} alt="Restaurant table" />
//                 <TableOverlay />
//               </TableBackground>

//               <AmbientElements>
//                 <AmbientElement />
//                 <AmbientElement />
//               </AmbientElements>

//               {/* QR code on table */}
//               <QrCodeContainer
//                 isAnimating={animationStage >= 1}
//                 isPulsing={isPulsing}
//               >
//                 <QrCodeBox>
//                   <QrCodeInner>
//                     <QrCode size={96} color="#0d9488" />
//                     <QrCodeLogo>
//                       <QrCode size={16} color="#0d9488" />
//                     </QrCodeLogo>
//                   </QrCodeInner>
//                   <QrCodeText>
//                     <Sparkles size={14} />
//                     Scan to view menu
//                   </QrCodeText>
//                 </QrCodeBox>
//               </QrCodeContainer>

//               {/* Digital menu appearing */}
//               <DigitalMenu isVisible={showMenu}>
//                 <MenuHeader>
//                   <MenuHeaderImage src={Restaurant} alt="Restaurant" />
//                   <MenuHeaderOverlay>
//                     <MenuBadge>
//                       <Sparkles size={10} />
//                       FEATURED RESTAURANT
//                     </MenuBadge>
//                     <MenuTitle>Delicious Bites</MenuTitle>
//                     <MenuTagline>
//                       <MapPin size={12} /> Italian & Mediterranean Cuisine
//                       <MenuRating>
//                         <Star size={12} fill="#facc15" color="#facc15" />
//                         4.8
//                       </MenuRating>
//                     </MenuTagline>
//                   </MenuHeaderOverlay>
//                   <MenuActions>
//                     <MenuActionButton>
//                       <Heart size={16} />
//                     </MenuActionButton>
//                     <MenuActionButton>
//                       <Share2 size={16} />
//                     </MenuActionButton>
//                   </MenuActions>
//                 </MenuHeader>

//                 <MenuInfo>
//                   <MenuInfoItem>
//                     <MenuInfoLabel>PRICE RANGE</MenuInfoLabel>
//                     <MenuInfoValue>$$</MenuInfoValue>
//                   </MenuInfoItem>
//                   <MenuInfoItem>
//                     <MenuInfoLabel>HOURS</MenuInfoLabel>
//                     <MenuInfoValue>11AM - 10PM</MenuInfoValue>
//                   </MenuInfoItem>
//                   <MenuInfoItem>
//                     <MenuInfoLabel>WAIT TIME</MenuInfoLabel>
//                     <MenuInfoValue>~15 min</MenuInfoValue>
//                   </MenuInfoItem>
//                 </MenuInfo>

//                 <MenuContent>
//                   <MenuSection>
//                     <MenuSectionTitle>
//                       Featured Items
//                       <MenuSectionAction>
//                         View all <ChevronRight size={14} />
//                       </MenuSectionAction>
//                     </MenuSectionTitle>
//                     <MenuItem delay={0} isVisible={showMenu}>
//                       <MenuItemImage>
//                         <MenuItemImageContent
//                           src={Pizza}
//                           alt="Margherita Pizza"
//                         />
//                       </MenuItemImage>
//                       <MenuItemContent>
//                         <div>
//                           <MenuItemTitle>Margherita Pizza</MenuItemTitle>
//                           <MenuItemDescription>
//                             Fresh tomatoes, mozzarella, basil, olive oil
//                           </MenuItemDescription>
//                         </div>
//                         <MenuItemBottom>
//                           <MenuItemPrice>$14.99</MenuItemPrice>
//                           <MenuItemAction>+</MenuItemAction>
//                         </MenuItemBottom>
//                       </MenuItemContent>
//                     </MenuItem>
//                   </MenuSection>

//                   <MenuItem delay={1} isVisible={showMenu}>
//                     <MenuItemImage>
//                       <MenuItemImageContent
//                         src={Fettucine}
//                         alt="Fettuccine Alfredo"
//                       />
//                     </MenuItemImage>
//                     <MenuItemContent>
//                       <div>
//                         <MenuItemTitle>Fettuccine Alfredo</MenuItemTitle>
//                         <MenuItemDescription>
//                           Creamy parmesan sauce, fresh pasta
//                         </MenuItemDescription>
//                       </div>
//                       <MenuItemBottom>
//                         <MenuItemPrice>$16.99</MenuItemPrice>
//                         <MenuItemAction>+</MenuItemAction>
//                       </MenuItemBottom>
//                     </MenuItemContent>
//                   </MenuItem>

//                   <MenuItem delay={2} isVisible={showMenu}>
//                     <MenuItemImage>
//                       <MenuItemImageContent
//                         src={Salad}
//                         alt="Mediterranean Salad"
//                       />
//                     </MenuItemImage>
//                     <MenuItemContent>
//                       <div>
//                         <MenuItemTitle>Mediterranean Salad</MenuItemTitle>
//                         <MenuItemDescription>
//                           Cucumber, tomatoes, olives, feta cheese
//                         </MenuItemDescription>
//                       </div>
//                       <MenuItemBottom>
//                         <MenuItemPrice>$9.99</MenuItemPrice>
//                         <MenuItemAction>+</MenuItemAction>
//                       </MenuItemBottom>
//                     </MenuItemContent>
//                   </MenuItem>
//                 </MenuContent>
//                 <MenuFooter>
//                   <div>Powered by MenuQR</div>
//                   <MenuFooterLink>
//                     View Full Menu <ChevronRight size={12} />
//                   </MenuFooterLink>
//                 </MenuFooter>
//               </DigitalMenu>

//               {/* Phone scanning */}
//               <PhoneContainer
//                 isAnimating={true}
//                 animationStage={animationStage}
//               >
//                 <Phone>
//                   <PhoneButtons />
//                   <PhoneButtonRight />
//                   <PhoneNotch />
//                   <PhoneScreen>
//                     <PhoneStatusBar>
//                       <PhoneTime>12:30</PhoneTime>
//                       <PhoneIcons>
//                         <PhoneIcon />
//                         <span>5G</span>
//                         <PhoneBattery />
//                       </PhoneIcons>
//                     </PhoneStatusBar>

//                     <PhoneAppBar>
//                       <PhoneAppTitle>
//                         <QrCode size={18} />
//                         QR Scanner
//                       </PhoneAppTitle>
//                       <PhoneAppActions>
//                         <ImageIcon size={18} />
//                         <Sparkles size={18} />
//                       </PhoneAppActions>
//                     </PhoneAppBar>

//                     <PhoneCameraUI isScanning={isScanning}>
//                       <CameraViewfinder>
//                         <CameraGrid />
//                         <CameraOverlay />

//                         {/* Camera scanning animation */}
//                         <ScanningOverlay isScanning={isScanning}>
//                           <ScanningBackground />
//                           <ScanningLine isScanning={isScanning} />
//                           <ScanningCorners>
//                             <ScanCorner />
//                             <ScanCorner />
//                             <ScanCorner />
//                             <ScanCorner />
//                           </ScanningCorners>
//                           <ScanningEffect />
//                         </ScanningOverlay>

//                         <ScanResult
//                           isVisible={isScanning && animationStage >= 1}
//                         >
//                           <QrCode size={16} color="white" />
//                           QR Code detected - Loading menu...
//                           <ScanResultLoader />
//                         </ScanResult>
//                       </CameraViewfinder>

//                       <CameraControls>
//                         <CameraMode>
//                           <QrCode size={18} />
//                         </CameraMode>
//                         <CameraButton />
//                         <CameraMode>
//                           <Camera size={18} />
//                         </CameraMode>
//                       </CameraControls>
//                     </PhoneCameraUI>
//                   </PhoneScreen>
//                 </Phone>
//               </PhoneContainer>
//             </AnimationContainer>
//           </HeroGrid>
//         </HeroSection>

//         <TabsSection>
//           <TabsInner>
//             <TabsHeader>
//               <TabsTitle>Choose Your Style</TabsTitle>
//               <TabsDescription>
//                 Customize your digital menu to match your restaurant's unique
//                 style and brand.
//               </TabsDescription>
//             </TabsHeader>

//             <TabsContainer>
//               <TabsList>
//                 <TabTrigger
//                   isActive={activeTab === "elegant"}
//                   onClick={() => setActiveTab("elegant")}
//                 >
//                   Elegant
//                 </TabTrigger>
//                 <TabTrigger
//                   isActive={activeTab === "casual"}
//                   onClick={() => setActiveTab("casual")}
//                 >
//                   Casual
//                 </TabTrigger>
//                 <TabTrigger
//                   isActive={activeTab === "modern"}
//                   onClick={() => setActiveTab("modern")}
//                 >
//                   Modern
//                 </TabTrigger>
//               </TabsList>

//               {["elegant", "casual", "modern"].map((style) => (
//                 <TabContent key={style} isActive={activeTab === style}>
//                   <TabImageContainer>
//                     <TabImage src={Restaurant} alt={`${style} menu style`} />
//                   </TabImageContainer>
//                   <TabTextContent>
//                     <TabContentTitle>{style} Style</TabContentTitle>
//                     <TabContentDescription>
//                       {style === "elegant" &&
//                         "Perfect for fine dining establishments with a sophisticated atmosphere."}
//                       {style === "casual" &&
//                         "Great for family restaurants and cafés with a relaxed vibe."}
//                       {style === "modern" &&
//                         "Ideal for contemporary venues with a sleek, minimalist aesthetic."}
//                     </TabContentDescription>
//                     <OutlineButton>Preview Template</OutlineButton>
//                   </TabTextContent>
//                 </TabContent>
//               ))}
//             </TabsContainer>
//           </TabsInner>
//         </TabsSection>

//         <CTASection>
//           <CTAInner>
//             <CTATitle>Ready to Transform Your Restaurant Experience?</CTATitle>
//             <CTADescription>
//               Join thousands of restaurants already using our QR code menu
//               solution to enhance their dining experience.
//             </CTADescription>
//             <LargeButton as={TealButton}>Get Started for Free</LargeButton>
//             <CTASmallText>
//               No credit card required. 14-day free trial.
//             </CTASmallText>
//           </CTAInner>
//         </CTASection>
//       </main>
//     </Container>
//   );
// }

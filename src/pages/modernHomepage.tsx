"use client";

import { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

import { ModernHeader } from "../components/ModernHeader";

import { HomapageHeroSection } from "./HomePageSections/HomapageHeroSection";
import { HomepageFeaturesSection } from "./HomePageSections/HomepageFeaturesSection";
import { HomepageHowItWorksSection } from "./HomePageSections/HomepageHowItWorksSection";
import { HomepageTestionialsSection } from "./HomePageSections/HomepageTestionialsSection";
import { HomepagePricingSection } from "./HomePageSections/HomepagePricingSection";
import { HomepageCTASection } from "./HomePageSections/HomepageCTASection";

export default function ModernTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const heroRef = useRef<HTMLElement | null>(null);

  console.log(scrolled, "scrolled");

  console.log(mobileMenuOpen, "mobileMenuOpen");

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);

    console.log(element, "element");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <Container mobileMenuOpen={mobileMenuOpen}>
      <GlobalStyle />
      <ModernHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
        scrolled={scrolled}
      />

      <main>
        {/* Hero Section */}
        <HomapageHeroSection ref={heroRef} />
        {/* Features Section */}
        <HomepageFeaturesSection sectionRefs={sectionRefs} />
        {/* How It Works Section */}
        <HomepageHowItWorksSection sectionRefs={sectionRefs} />
        {/* Testimonials Section */}
        <HomepageTestionialsSection sectionRefs={sectionRefs} />
        {/* Pricing Section */}
        <HomepagePricingSection sectionRefs={sectionRefs} />
        {/* CTA Section */}
        <HomepageCTASection />
      </main>
    </Container>
  );
}

// Global styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  


  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: #1F2937;
    line-height: 1.5;
    background-color: #FAFAFA;
    overflow-x: hidden;
  }
  
  a {
    text-decoration: none;
    color: #1f2937;
  }
  
  button {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
`;

// Styled Components
const Container = styled.div<{ mobileMenuOpen: boolean }>`
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: ${(props) => (props.mobileMenuOpen ? "hidden" : "auto")};
  position: relative;

  /* overflow: ${(props) => (props.mobileMenuOpen ? "hidden" : "auto")}; */
`;

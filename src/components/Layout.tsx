import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;

  @media (min-width: 1200px) {
    padding-left: 10rem;
    padding-right: 10rem;
  }

  min-height: 100vh;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Wrapper>
      <main>{children}</main>
    </Wrapper>
  );
};

export default Layout;

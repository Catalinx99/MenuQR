// components/ui/Button.tsx
import styled from "styled-components";

type ButtonProps = {
  primary?: boolean;
};

export const Button = styled.button<ButtonProps>`
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
`;

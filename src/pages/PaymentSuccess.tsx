import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f7f7f7;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2e7d32;
`;

const Message = styled.p`
  font-size: 1.1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  background-color: #2e7d32;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #1b5e20;
  }
`;

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Title>Thank you for your payment!</Title>
      <Message>Your order has been successfully processed.</Message>
      <Button onClick={() => navigate("/")}>Go to Homepage</Button>
    </Wrapper>
  );
};

export default PaymentSuccess;

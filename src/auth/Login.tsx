"use client";

import type React from "react";
import { useState } from "react";
import styled from "styled-components";
import { atom, useAtom } from "jotai";
import { auth } from "../firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { isAuthenticatedAtom, userAtom } from "../atoms/authAtoms";

// Jotai atoms
const rememberMeAtom = atom(false);

// Update the SignIn component to use the new layout
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useAtom(rememberMeAtom);
  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate(); // pentru a naviga după login

  // Keep all the validation functions and handleSubmit the same

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!re.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      setIsSubmitting(true);

      // Autentificare Firebase
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user: any = userCredential.user;
          console.log("Logged in with:", user);

          // Resetarea inputurilor după autentificare
          setEmail("");
          setPassword("");
          setUser(user);
          localStorage.setItem("accessToken", user.accessToken);
          localStorage.setItem("user", JSON.stringify(user));

          setIsAuthenticated(true); // Marcare ca autentificat

          // Redirecționare către dashboard sau altă pagină
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          if (
            errorCode === "auth/invalid-email" ||
            errorCode === "auth/user-not-found"
          ) {
            setEmailError("Invalid email or password.");
          } else {
            setPasswordError("Something went wrong. Please try again.");
          }
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <PageContainer>
      <MainContent>
        <FormCard>
          <FormImageColumn>
            <WelcomeText>
              <WelcomeTitle>Welcome back!</WelcomeTitle>
              <WelcomeMessage>
                Sign in to continue creating and managing your digital
                restaurant menus. Access all your QR codes and analytics in one
                place.
              </WelcomeMessage>
              <QRImageContainer />
            </WelcomeText>
          </FormImageColumn>

          <FormContentColumn>
            <FormHeader>
              <FormTitle>Sign in to your account</FormTitle>
              <FormSubtitle>
                Welcome back! Please enter your details.
              </FormSubtitle>
            </FormHeader>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => validateEmail(email)}
                />
                {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => validatePassword(password)}
                />
                {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
              </FormGroup>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <RememberMeContainer>
                  <Checkbox
                    id="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <RememberMeLabel htmlFor="rememberMe">
                    Remember me
                  </RememberMeLabel>
                </RememberMeContainer>
                <ForgotPasswordLink href="#">
                  Forgot password?
                </ForgotPasswordLink>
              </div>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </SubmitButton>

              {/* <Divider>
                <span>OR</span>
              </Divider> */}

              {/* <SocialButtonsContainer>
                <SocialButton type="button">
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </SocialButton>
                <SocialButton type="button">
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      fill="#1877F2"
                    />
                  </svg>
                  Facebook
                </SocialButton>
              </SocialButtonsContainer> */}
            </Form>

            <SignUpPrompt>
              Don't have an account? <a href="/register">Sign up</a>
            </SignUpPrompt>
          </FormContentColumn>
        </FormCard>
      </MainContent>
    </PageContainer>
  );
};

export default Login;

// Styled Components
const PageContainer = styled.div`
  font-family: "DM Sans", sans-serif;
  color: #1a202c;
  background-color: #f7fafc;
  min-height: 100vh;
  display: flex;
  width: 100vw;
  max-width: 100%;
  overflow-y: hidden;
  flex-direction: column;
`;

// Update the MainContent component to be more responsive
const MainContent = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f7fafc;
`;

// Replace the FormCard component with a more responsive version
const FormCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 1000px;
  display: flex;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 450px;
  }
`;

// Add these new components for the two-column layout
const FormImageColumn = styled.div`
  flex: 1;
  background-color: #3182ce;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(
      circle at 30% 40%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    z-index: 1;
  }
`;

const FormContentColumn = styled.div`
  flex: 1;
  padding: 2.5rem;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const WelcomeText = styled.div`
  color: white;
  z-index: 2;
  position: relative;
`;

const WelcomeTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const WelcomeMessage = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const QRImageContainer = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;

  &::before {
    content: "";
    position: absolute;
    width: 80%;
    height: 80%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M0,0 L40,0 L40,40 L0,40 Z M10,10 L10,30 L30,30 L30,10 Z M15,15 L25,15 L25,25 L15,25 Z M60,0 L100,0 L100,40 L60,40 Z M70,10 L70,30 L90,30 L90,10 Z M75,15 L85,15 L85,25 L75,25 Z M0,60 L40,60 L40,100 L0,100 Z M10,70 L10,90 L30,90 L30,70 Z M15,75 L25,75 L25,85 L15,85 Z M60,60 L70,60 L70,70 L60,70 Z M80,60 L90,60 L90,70 L100,70 L100,60 L100,100 L80,100 Z M60,80 L70,80 L70,100 L60,100 Z M80,80 L80,90 L90,90 L90,80 Z' fill='%233182ce'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.75rem;
`;

const FormSubtitle = styled.p`
  color: #718096;
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const ForgotPasswordLink = styled.a`
  font-size: 0.875rem;
  color: #3182ce;
  text-decoration: none;
  align-self: flex-end;

  &:hover {
    text-decoration: underline;
  }
`;

const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  accent-color: #3182ce;
`;

const RememberMeLabel = styled.label`
  font-size: 0.875rem;
  color: #4a5568;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #2c5282;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #e2e8f0;
  }

  span {
    padding: 0 1rem;
    color: #a0aec0;
    font-size: 0.875rem;
  }
`;

const SocialButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: #f7fafc;
    border-color: #cbd5e0;
  }
`;

const SignUpPrompt = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-size: 0.875rem;
  color: #4a5568;

  a {
    color: #3182ce;
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

"use client";

import type React from "react";
import { useState } from "react";
import styled from "styled-components";
import { atom, useAtom } from "jotai";
import { auth, createUserWithEmailAndPassword } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

// Update the Register component to use the new layout
const Register: React.FC = () => {
  // Keep all the state variables and validation functions the same
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useAtom(termsAcceptedAtom);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // Keep all the validation functions the same
  const validateFirstName = (name: string) => {
    if (!name) {
      setFirstNameError("First name is required");
      return false;
    }
    setFirstNameError("");
    return true;
  };

  const validateLastName = (name: string) => {
    if (!name) {
      setLastNameError("Last name is required");
      return false;
    }
    setLastNameError("");
    return true;
  };

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

  const checkPasswordStrength = (password: string) => {
    if (!password) return 0;

    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 1;

    // Contains lowercase and uppercase
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;

    // Contains numbers
    if (/[0-9]/.test(password)) strength += 1;

    // Contains special characters
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

    return strength;
  };

  const validatePassword = (password: string) => {
    const strength = checkPasswordStrength(password);
    setPasswordStrength(strength);

    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    } else if (strength < 3) {
      setPasswordError("Password is too weak");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = (confirmPwd: string) => {
    if (!confirmPwd) {
      setConfirmPasswordError("Please confirm your password");
      return false;
    } else if (confirmPwd !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const validateTerms = (accepted: boolean) => {
    if (!accepted) {
      setTermsError("You must accept the terms and conditions");
      return false;
    }
    setTermsError("");
    return true;
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isFirstNameValid = validateFirstName(firstName);
    const isLastNameValid = validateLastName(lastName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    const areTermsAccepted = validateTerms(termsAccepted);

    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      areTermsAccepted
    ) {
      setIsSubmitting(true);

      try {
        // Crează utilizatorul în Firebase
        await createUserWithEmailAndPassword(auth, email, password);

        // Resetează toate inputurile la valoare goală
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // Poți adăuga acum un utilizator în baza de date Firebase sau redirecționa utilizatorul
        // în funcție de necesități (ex: router.push("/dashboard"))
        navigate("/login");
      } catch (error: any) {
        const errorMessage = error.message;
        console.error("Error creating user:", errorMessage);

        // Afișează un mesaj de eroare
        setPasswordError("Eroare la crearea contului: " + errorMessage);
      }

      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <MainContent>
        <FormCard>
          <FormImageColumn>
            <WelcomeText>
              <WelcomeTitle>Create amazing digital menus</WelcomeTitle>
              <WelcomeMessage>
                Join thousands of restaurants using MenuQR to create beautiful,
                interactive menus that customers can access instantly with a
                simple scan.
              </WelcomeMessage>
              <PhonePreview>
                <PhoneNotch />
                <PhoneScreen>
                  <MenuHeader>
                    <MenuTitle>Coastal Bistro</MenuTitle>
                    <MenuSubtitle>Fresh Seafood & More</MenuSubtitle>
                  </MenuHeader>
                  <MenuItems>
                    <MenuItem>
                      <MenuItemTitle>Grilled Salmon</MenuItemTitle>
                      <MenuItemDescription>
                        Fresh Atlantic salmon with lemon butter sauce
                      </MenuItemDescription>
                    </MenuItem>
                    <MenuItem>
                      <MenuItemTitle>Lobster Pasta</MenuItemTitle>
                      <MenuItemDescription>
                        Linguine with fresh lobster in a creamy sauce
                      </MenuItemDescription>
                    </MenuItem>
                    <MenuItem>
                      <MenuItemTitle>Seafood Platter</MenuItemTitle>
                      <MenuItemDescription>
                        Assortment of daily catch with sides
                      </MenuItemDescription>
                    </MenuItem>
                    <MenuItem>
                      <MenuItemTitle>Clam Chowder</MenuItemTitle>
                      <MenuItemDescription>
                        New England style with fresh clams
                      </MenuItemDescription>
                    </MenuItem>
                  </MenuItems>
                </PhoneScreen>
              </PhonePreview>
            </WelcomeText>
          </FormImageColumn>

          <FormContentColumn>
            <FormHeader>
              <FormTitle>Create your account</FormTitle>
              <FormSubtitle>
                Start creating beautiful digital menus today!
              </FormSubtitle>
            </FormHeader>

            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onBlur={() => validateFirstName(firstName)}
                  />
                  {firstNameError && (
                    <ErrorMessage>{firstNameError}</ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onBlur={() => validateLastName(lastName)}
                  />
                  {lastNameError && (
                    <ErrorMessage>{lastNameError}</ErrorMessage>
                  )}
                </FormGroup>
              </FormRow>

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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordStrength(checkPasswordStrength(e.target.value));
                  }}
                  onBlur={() => validatePassword(password)}
                />
                <PasswordStrengthMeter>
                  <PasswordStrengthIndicator strength={passwordStrength} />
                </PasswordStrengthMeter>
                {password && (
                  <PasswordStrengthText strength={passwordStrength}>
                    {getPasswordStrengthText()}
                  </PasswordStrengthText>
                )}
                {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => validateConfirmPassword(confirmPassword)}
                />
                {confirmPasswordError && (
                  <ErrorMessage>{confirmPasswordError}</ErrorMessage>
                )}
              </FormGroup>

              <TermsContainer>
                <Checkbox
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                />
                <TermsText htmlFor="terms">
                  I agree to the <a href="#">Terms of Service</a> and{" "}
                  <a href="#">Privacy Policy</a>
                </TermsText>
              </TermsContainer>
              {termsError && <ErrorMessage>{termsError}</ErrorMessage>}

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Create account"}
              </SubmitButton>

              {/* <Divider>
                <span>OR</span>
              </Divider>

              <SocialButtonsContainer>
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

            <SignInPrompt>
              Already have an account? <a href="/login">Sign in</a>
            </SignInPrompt>
          </FormContentColumn>
        </FormCard>
      </MainContent>
    </PageContainer>
  );
};

export default Register;

// Jotai atoms
const termsAcceptedAtom = atom(false);

// Styled Components
const PageContainer = styled.div`
  font-family: "DM Sans", sans-serif;
  color: #1a202c;
  background-color: #f7fafc;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  max-width: 100%;
  overflow-y: hidden;
  padding: 0px !important;
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

  @media (max-width: 850px) {
    flex-direction: column;
    max-width: 500px;
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

  @media (max-width: 850px) {
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

  @media (max-width: 850px) {
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

const PhonePreview = styled.div`
  width: 220px;
  height: 440px;
  background-color: white;
  border-radius: 24px;
  border: 8px solid #2d3748;
  margin-top: 2rem;
  position: relative;
  z-index: 2;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const PhoneNotch = styled.div`
  width: 80px;
  height: 20px;
  background-color: #2d3748;
  border-radius: 0 0 10px 10px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const PhoneScreen = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
`;

const MenuHeader = styled.div`
  text-align: center;
  margin-bottom: 0.75rem;
  padding-top: 1rem;
`;

const MenuTitle = styled.div`
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #2d3748;
`;

const MenuSubtitle = styled.div`
  font-size: 0.7rem;
  color: #718096;
`;

const MenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  flex: 1;
`;

const MenuItem = styled.div`
  background-color: #f7fafc;
  border-radius: 6px;
  padding: 0.5rem;
`;

const MenuItemTitle = styled.div`
  font-weight: 600;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
  color: #2d3748;
`;

const MenuItemDescription = styled.div`
  font-size: 0.6rem;
  color: #718096;
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
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

const TermsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  margin-top: 0.25rem;
  cursor: pointer;
  accent-color: #3182ce;
`;

const TermsText = styled.label`
  font-size: 0.875rem;
  color: #4a5568;
  cursor: pointer;

  a {
    color: #3182ce;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
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

const SignInPrompt = styled.div`
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

const PasswordStrengthMeter = styled.div`
  height: 4px;
  background-color: #e2e8f0;
  border-radius: 2px;
  margin-top: 0.5rem;
  overflow: hidden;
`;

const PasswordStrengthIndicator = styled.div<{ strength: number }>`
  height: 100%;
  width: ${(props) => props.strength * 25}%;
  background-color: ${(props) => {
    if (props.strength === 0) return "#e2e8f0";
    if (props.strength === 1) return "#e53e3e";
    if (props.strength === 2) return "#dd6b20";
    if (props.strength === 3) return "#d69e2e";
    return "#38a169";
  }};
  transition: all 0.3s;
`;

const PasswordStrengthText = styled.div<{ strength: number }>`
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: ${(props) => {
    if (props.strength === 0) return "#a0aec0";
    if (props.strength === 1) return "#e53e3e";
    if (props.strength === 2) return "#dd6b20";
    if (props.strength === 3) return "#d69e2e";
    return "#38a169";
  }};
`;

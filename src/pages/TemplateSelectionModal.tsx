// "use client";

// import React from "react";
// import styled from "styled-components";

// // Types
// export type TemplateType = "basic" | "standard" | "advanced";

// interface TemplateSelectionModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSelectTemplate: (templateType: TemplateType) => void;
// }

// // Styled Components
// const Modal = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 50;
// `;

// const ModalContent = styled.div`
//   background-color: white;
//   border-radius: 8px;
//   padding: 2rem;
//   width: 100%;
//   max-width: 800px;
//   max-height: 90vh;
//   overflow-y: auto;
// `;

// const ModalHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1.5rem;
// `;

// const ModalTitle = styled.h3`
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: #2d3748;
// `;

// const CloseButton = styled.button`
//   background: none;
//   border: none;
//   font-size: 1.5rem;
//   cursor: pointer;
//   color: #718096;

//   &:hover {
//     color: #2d3748;
//   }
// `;

// const TemplatesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 1.5rem;

//   @media (max-width: 640px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const TemplateCard = styled.div<{ selected: boolean }>`
//   border: 2px solid ${(props) => (props.selected ? "#3182ce" : "#e2e8f0")};
//   border-radius: 8px;
//   overflow: hidden;
//   cursor: pointer;
//   transition: all 0.2s;

//   &:hover {
//     border-color: ${(props) => (props.selected ? "#3182ce" : "#cbd5e0")};
//     transform: translateY(-2px);
//     box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//   }
// `;

// const TemplatePreview = styled.div`
//   height: 160px;
//   background-color: #f7fafc;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-bottom: 1px solid #e2e8f0;
// `;

// const TemplateInfo = styled.div`
//   padding: 1rem;
// `;

// const TemplateName = styled.h4`
//   font-size: 1rem;
//   font-weight: 600;
//   color: #2d3748;
//   margin-bottom: 0.5rem;
// `;

// const TemplateDescription = styled.p`
//   font-size: 0.875rem;
//   color: #718096;
//   line-height: 1.4;
// `;

// const ModalFooter = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 1rem;
//   margin-top: 2rem;
// `;

// const Button = styled.button<{ variant?: "primary" | "secondary" }>`
//   padding: 0.5rem 1rem;
//   font-size: 0.875rem;
//   font-weight: 600;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: all 0.2s;

//   background-color: ${(props) =>
//     props.variant === "primary" ? "#3182ce" : "white"};
//   color: ${(props) => (props.variant === "primary" ? "white" : "#3182ce")};
//   border: ${(props) =>
//     props.variant === "primary" ? "none" : "1px solid #3182ce"};

//   &:hover {
//     background-color: ${(props) =>
//       props.variant === "primary" ? "#2c5282" : "#edf2f7"};
//   }
// `;

// const CheckIcon = () => (
//   <svg
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M20 6L9 17L4 12"
//       stroke="#3182ce"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({
//   isOpen,
//   onClose,
//   onSelectTemplate,
// }) => {
//   const [selectedTemplate, setSelectedTemplate] =
//     React.useState<TemplateType>("standard");

//   if (!isOpen) return null;

//   const templates = [
//     {
//       type: "basic" as TemplateType,
//       name: "Basic",
//       description: "Simple menu with product name, description, and price.",
//     },
//     {
//       type: "standard" as TemplateType,
//       name: "Standard",
//       description:
//         "Enhanced menu with product name, description, price, and image.",
//     },
//     {
//       type: "advanced" as TemplateType,
//       name: "Advanced",
//       description:
//         "Complete menu with product name, description, price, product images, and category images.",
//     },
//   ];

//   const handleSelectTemplate = () => {
//     onSelectTemplate(selectedTemplate);
//     onClose();
//   };

//   return (
//     <Modal>
//       <ModalContent>
//         <ModalHeader>
//           <ModalTitle>Choose a Template</ModalTitle>
//           <CloseButton onClick={onClose}>&times;</CloseButton>
//         </ModalHeader>

//         <TemplatesGrid>
//           {templates.map((template) => (
//             <TemplateCard
//               key={template.type}
//               selected={selectedTemplate === template.type}
//               onClick={() => setSelectedTemplate(template.type)}
//             >
//               <TemplatePreview>
//                 {selectedTemplate === template.type && <CheckIcon />}
//               </TemplatePreview>
//               <TemplateInfo>
//                 <TemplateName>{template.name}</TemplateName>
//                 <TemplateDescription>
//                   {template.description}
//                 </TemplateDescription>
//               </TemplateInfo>
//             </TemplateCard>
//           ))}
//         </TemplatesGrid>

//         <ModalFooter>
//           <Button onClick={onClose}>Cancel</Button>
//           <Button variant="primary" onClick={handleSelectTemplate}>
//             Continue
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default TemplateSelectionModal;

"use client";

import React from "react";
import styled from "styled-components";

// Types
export type TemplateType = "Basic" | "Standard" | "Advanced";

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateType: TemplateType) => void;
}

// Styled Components
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.75rem;
  cursor: pointer;
  color: #718096;
  transition: color 0.2s;
  line-height: 1;

  &:hover {
    color: #2d3748;
  }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TemplateCard = styled.div<{
  selected: boolean;
  templateType: TemplateType;
}>`
  border: 2px solid
    ${(props) =>
      props.selected ? getTemplateColor(props.templateType).border : "#e2e8f0"};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border-color: ${(props) => getTemplateColor(props.templateType).border};
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${(props) => getTemplateColor(props.templateType).primary};
  }
`;

const TemplatePreview = styled.div<{ templateType: TemplateType }>`
  height: 180px;
  background: ${(props) => getTemplateColor(props.templateType).light};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
  }
`;

const TemplateBadge = styled.span<{ templateType: TemplateType }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${(props) => getTemplateColor(props.templateType).primary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TemplateInfo = styled.div`
  padding: 1.5rem;
`;

const TemplateName = styled.h4`
  font-size: 1.125rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.75rem;
`;

const TemplateDescription = styled.p`
  font-size: 0.9375rem;
  color: #4a5568;
  line-height: 1.5;
  margin-bottom: 1.25rem;
`;

const TemplateFeatures = styled.ul`
  padding-left: 1.25rem;
  margin: 0;
  color: #718096;
  font-size: 0.875rem;
  line-height: 1.6;

  li {
    margin-bottom: 0.5rem;
    position: relative;

    &::before {
      content: "•";
      position: absolute;
      left: -1rem;
      color: #3182ce;
    }
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
`;

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  background-color: ${(props) =>
    props.variant === "primary" ? "#3182ce" : "white"};
  color: ${(props) => (props.variant === "primary" ? "white" : "#3182ce")};
  border: ${(props) =>
    props.variant === "primary" ? "none" : "1px solid #3182ce"};

  &:hover {
    background-color: ${(props) =>
      props.variant === "primary" ? "#2c5282" : "#edf2f7"};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CheckIcon = styled.div<{ templateType: TemplateType }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${(props) => getTemplateColor(props.templateType).primary};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  svg {
    width: 24px;
    height: 24px;
    stroke: white;
    stroke-width: 3;
  }
`;

// Template color scheme
const getTemplateColor = (type: TemplateType) => {
  switch (type) {
    case "Basic":
      return {
        primary: "#48BB78", // green
        light: "#F0FFF4",
        border: "#48BB78",
      };
    case "Standard":
      return {
        primary: "#4299E1", // blue
        light: "#EBF8FF",
        border: "#4299E1",
      };
    case "Advanced":
      return {
        primary: "#9F7AEA", // purple
        light: "#FAF5FF",
        border: "#9F7AEA",
      };
    default:
      return {
        primary: "#4299E1",
        light: "#EBF8FF",
        border: "#4299E1",
      };
  }
};

const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  const [selectedTemplate, setSelectedTemplate] =
    React.useState<TemplateType>("Standard");

  if (!isOpen) return null;

  const templates = [
    {
      type: "Basic" as TemplateType,
      name: "Basic",
      description: "Perfect for simple menus with essential information.",
      features: [
        "Product name and description",
        "Price display",
        "Clean, minimalist layout",
        "Mobile-responsive",
      ],
    },
    {
      type: "Standard" as TemplateType,
      name: "Standard",
      description: "Great for most restaurants with visual appeal.",
      features: [
        "Everything in Basic",
        "Product images",
        "Category organization",
        "Enhanced styling",
      ],
    },
    {
      type: "Advanced" as TemplateType,
      name: "Premium",
      description: "For establishments wanting a premium digital experience.",
      features: [
        "Everything in Standard",
        "Category images",
        "Advanced animations",
        "Custom theme options",
        "Priority support",
      ],
    },
  ];

  const handleSelectTemplate = () => {
    onSelectTemplate(selectedTemplate);
    onClose();
  };

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Choose Your Menu Style</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <TemplatesGrid>
          {templates.map((template) => (
            <TemplateCard
              key={template.type}
              selected={selectedTemplate === template.type}
              onClick={() => setSelectedTemplate(template.type)}
              templateType={template.type}
            >
              <TemplatePreview templateType={template.type}>
                {selectedTemplate === template.type ? (
                  <CheckIcon templateType={template.type}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </CheckIcon>
                ) : (
                  <TemplateBadge templateType={template.type}>
                    {template.type}
                  </TemplateBadge>
                )}
              </TemplatePreview>
              <TemplateInfo>
                <TemplateName>{template.name}</TemplateName>
                <TemplateDescription>
                  {template.description}
                </TemplateDescription>
                <TemplateFeatures>
                  {template.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </TemplateFeatures>
              </TemplateInfo>
            </TemplateCard>
          ))}
        </TemplatesGrid>

        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSelectTemplate}>
            Select Template
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TemplateSelectionModal;

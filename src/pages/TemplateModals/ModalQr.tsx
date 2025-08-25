import React, { useRef } from "react";
import styled from "styled-components";
import { QRCodeSVG } from "qrcode.react";

const ModalQr = ({ setIsQRCodeModalOpen, menuUrl, downloadQRCode }) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  return (
    <QRCodeModal>
      <QRCodeContent>
        <ModalHeader>
          <ModalTitle>Menu QR Code</ModalTitle>
          <CloseButton onClick={() => setIsQRCodeModalOpen(false)}>
            &times;
          </CloseButton>
        </ModalHeader>

        <QRCodeDescription>
          Scan this QR code with your smartphone camera to view the digital
          menu.
        </QRCodeDescription>

        <QRCodeContainer ref={qrCodeRef}>
          <QRCodeSVG
            value={menuUrl}
            size={200}
            level="H" // High error correction capability
            includeMargin={true}
            bgColor={"#FFFFFF"}
            fgColor={"#000000"}
          />
        </QRCodeContainer>

        <button onClick={() => window.open(menuUrl, "_blank")}>Redirect</button>

        <QRCodeActions>
          <Button onClick={() => downloadQRCode(qrCodeRef)}>
            <DownloadIcon /> Download QR Code
          </Button>
          <Button onClick={() => setIsQRCodeModalOpen(false)}>Close</Button>
        </QRCodeActions>
      </QRCodeContent>
    </QRCodeModal>
  );
};

export default ModalQr;

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

const QRCodeModal = styled(Modal)`
  z-index: 60;
`;

const QRCodeContainer = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;
const QRCodeContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  padding: 1rem;

  @media (max-width: 480px) {
    width: 100%;
    padding: 0.5rem;

    ${QRCodeContainer} {
      margin: 1rem 0;
    }
  }
`;

const QRCodeDescription = styled.p`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #4a5568;
`;

const QRCodeActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #718096;

  &:hover {
    color: #2d3748;
  }
`;

const Button = styled.button<{
  variant?: "primary" | "secondary" | "danger" | "success";
}>`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  background-color: ${(props) => {
    if (props.variant === "primary") return "#3182ce";
    if (props.variant === "danger") return "#e53e3e";
    if (props.variant === "success") return "#38a169";
    return "white";
  }};

  color: ${(props) => {
    if (
      props.variant === "primary" ||
      props.variant === "danger" ||
      props.variant === "success"
    )
      return "white";
    return "#3182ce";
  }};

  border: ${(props) => {
    if (
      props.variant === "primary" ||
      props.variant === "danger" ||
      props.variant === "success"
    )
      return "none";
    return "1px solid #3182ce";
  }};

  &:hover {
    background-color: ${(props) => {
      if (props.variant === "primary") return "#2c5282";
      if (props.variant === "danger") return "#c53030";
      if (props.variant === "success") return "#2f855a";
      return "#edf2f7";
    }};
  }
`;
const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 10L12 15L17 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15V3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

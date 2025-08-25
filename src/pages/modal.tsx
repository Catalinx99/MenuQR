import Modal from "react-modal";
import { ThemePreviewPage } from "./ChooseTheme";

Modal.setAppElement("#root");

export const ModalWrapper = ({
  isOpen,
  onRequestClose,
}: {
  isOpen: boolean;
  onRequestClose: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Preview Themes"
      style={{
        content: {
          top: "5%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          padding: 0,
          overflow: "auto",
          zIndex: 60,
          height: "81vh",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
      }}
    >
      <ThemePreviewPage />
    </Modal>
  );
};

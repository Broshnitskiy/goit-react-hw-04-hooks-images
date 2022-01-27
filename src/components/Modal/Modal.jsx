import { createPortal } from "react-dom";
import { useEffect } from "react";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

export const Modal = ({ onClose, imgUrl, imageName, children }) => {
  // componentDidMount() {
  //   window.addEventListener("keydown", this.handleKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("keydown", this.handleKeyDown);
  // }

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>
        <img src={imgUrl} alt={imageName} />
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  imgUrl: PropTypes.string,
  imageName: PropTypes.string,
  children: PropTypes.element,
};

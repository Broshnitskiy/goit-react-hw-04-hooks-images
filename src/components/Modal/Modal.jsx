import { createPortal } from "react-dom";
import { Component } from "react";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={styles.Overlay} onClick={this.handleBackdropClick}>
        <div className={styles.Modal}>
          <img src={this.props.imgUrl} alt={this.props.imageName} />
          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  imgUrl: PropTypes.string,
  imageName: PropTypes.string,
};

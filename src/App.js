import "./App.css";
import React, { Component } from "react";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { Modal } from "./components/Modal/Modal";
import { Button } from "./components/Button/Button";

import { getImages } from "./fetch-api/fetchBackend";
import { Loader } from "./components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Scroll from "react-scroll";

class App extends Component {
  state = {
    imageName: "",
    gallery: [],
    page: null,
    error: null,
    isLoading: false,
    showButton: false,
    showModal: false,
    bigImgUrl: "",
  };

  handleFormSubmit = (imageName) => {
    this.setState({ imageName, page: 1 });
  };

  handleClick = async () => {
    this.setState((prevState) => {
      return {
        page: prevState.page + 1,
      };
    });
    let scroll = Scroll.animateScroll;
    scroll.scrollMore(400, {
      duration: 1000,

      smooth: "easeInOutQuint",
    });
  };

  toggleModal = (imgUrl) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      bigImgUrl: imgUrl,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const newName = this.state.imageName;
    const { page } = this.state;

    if (prevName !== newName || prevState.page !== this.state.page) {
      this.setState({ isLoading: true });
      this.setState({ showButton: true });
      try {
        const data = await getImages(newName.trim(), page);

        if (data.hits.length === 0) {
          toast.error(
            "Sorry, there are no images matching your search query. Please try again."
          );
          this.setState({ showButton: false });
          return;
        }
        if (page * 12 >= data.totalHits) {
          toast.warn(
            "We're sorry, but you've reached the end of search results."
          );
          this.setState({ showButton: false });
        }
        page === 1
          ? this.setState({ gallery: data.hits })
          : this.setState((prevState) => {
              return { gallery: [...prevState.gallery, ...data.hits] };
            });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const {
      gallery,
      imageName,
      error,
      isLoading,
      showButton,
      showModal,
      bigImgUrl,
    } = this.state;

    return (
      <div className={"App"}>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.handleFormSubmit} />
        {gallery.length > 0 && (
          <ImageGallery
            imageName={imageName}
            gallery={gallery}
            toggleModal={this.toggleModal}
          />
        )}

        {showButton && !isLoading && <Button onClick={this.handleClick} />}
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            imgUrl={bigImgUrl}
            imageName={imageName}
          >
            <button
              type="button"
              onClick={() => this.toggleModal()}
              className={"ModalButton"}
            >
              X
            </button>
          </Modal>
        )}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;

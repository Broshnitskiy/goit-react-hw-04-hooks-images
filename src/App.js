import "./App.css";
import { useState, useEffect } from "react";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { Modal } from "./components/Modal/Modal";
import { Button } from "./components/Button/Button";

import { getImages } from "./fetch-api/fetchBackend";
import { Loader } from "./components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Scroll from "react-scroll";

function App() {
  // state = {
  //   imageName: "",
  //   gallery: [],
  //   page: null,
  //   error: null,
  //   isLoading: false,
  //   showButton: false,
  //   showModal: false,
  //   bigImgUrl: "",
  // };
  const [imageName, setImageName] = useState("");
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bigImgUrl, setBigImgUrl] = useState("");

  const handleFormSubmit = (inputImageName) => {
    setImageName(inputImageName);
    setPage(1);
    // this.setState({ imageName, page: 1 });
  };

  const handleClick = async () => {
    setPage((prevPage) => prevPage + 1);
    // this.setState((prevState) => {
    //   return {
    //     page: prevState.page + 1,
    //   };
    // });
    let scroll = Scroll.animateScroll;
    scroll.scrollMore(400, {
      duration: 1000,

      smooth: "easeInOutQuint",
    });
  };

  const toggleModal = (imgUrl) => {
    setShowModal((prevValue) => !prevValue);
    setBigImgUrl(imgUrl);
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    //   bigImgUrl: imgUrl,
    // }));
  };

  useEffect(() => {
    if (!imageName) {
      return;
    }
    async function fetchImages() {
      setIsLoading(true);
      setShowButton(true);
      try {
        const data = await getImages(imageName.trim(), page);

        if (data.hits.length === 0) {
          toast.error(
            "Sorry, there are no images matching your search query. Please try again."
          );
          setShowButton(false);
          // this.setState({ showButton: false });
          return;
        }
        if (page * 12 >= data.totalHits) {
          toast.warn(
            "We're sorry, but you've reached the end of search results."
          );
          setShowButton(false);
          // this.setState({ showButton: false });
        }
        page === 1
          ? setGallery(data.hits)
          : setGallery((prevValue) => {
              return [...prevValue, ...data.hits];
            });
      } catch (error) {
        setError(error);
        // this.setState({ error });
      } finally {
        setIsLoading(false);
        // this.setState({ isLoading: false });
      }
    }
    fetchImages();
  }, [imageName, page]);

  // async componentDidUpdate(prevProps, prevState) {
  //   const prevName = prevState.imageName;
  //   const newName = this.state.imageName;
  //   const { page } = this.state;

  //   if (prevName !== newName || prevState.page !== this.state.page) {
  //     this.setState({ isLoading: true });
  //     this.setState({ showButton: true });
  //     try {
  //       const data = await getImages(newName.trim(), page);

  //       if (data.hits.length === 0) {
  //         toast.error(
  //           "Sorry, there are no images matching your search query. Please try again."
  //         );
  //         this.setState({ showButton: false });
  //         return;
  //       }
  //       if (page * 12 >= data.totalHits) {
  //         toast.warn(
  //           "We're sorry, but you've reached the end of search results."
  //         );
  //         this.setState({ showButton: false });
  //       }
  //       page === 1
  //         ? this.setState({ gallery: data.hits })
  //         : this.setState((prevState) => {
  //             return { gallery: [...prevState.gallery, ...data.hits] };
  //           });
  //     } catch (error) {
  //       this.setState({ error });
  //     } finally {
  //       this.setState({ isLoading: false });
  //     }
  //   }
  // }

  return (
    <div className={"App"}>
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {isLoading && <Loader />}
      <Searchbar onSubmit={handleFormSubmit} />
      {gallery.length > 0 && (
        <ImageGallery
          imageName={imageName}
          gallery={gallery}
          toggleModal={toggleModal}
        />
      )}

      {showButton && !isLoading && <Button onClick={handleClick} />}
      {showModal && (
        <Modal onClose={toggleModal} imgUrl={bigImgUrl} imageName={imageName}>
          <button
            type="button"
            onClick={() => toggleModal()}
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

export default App;

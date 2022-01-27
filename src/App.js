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
  const [imageName, setImageName] = useState("");
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bigImgUrl, setBigImgUrl] = useState("");

  const scroll = Scroll.animateScroll;

  const handleFormSubmit = (inputImageName) => {
    setImageName(inputImageName);
    setPage(1);

    scroll.scrollToTop();
  };

  const handleClick = () => {
    setPage((prevPage) => prevPage + 1);

    scroll.scrollMore(400, {
      duration: 1000,
      smooth: "easeInOutQuint",
    });
  };

  const toggleModal = (imgUrl) => {
    setShowModal((prevValue) => !prevValue);
    setBigImgUrl(imgUrl);
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

          return;
        }
        if (page * 12 >= data.totalHits) {
          toast.warn(
            "We're sorry, but you've reached the end of search results."
          );
          setShowButton(false);
        }
        page === 1
          ? setGallery(data.hits)
          : setGallery((prevValue) => {
              return [...prevValue, ...data.hits];
            });
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImages();
  }, [imageName, page]);

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

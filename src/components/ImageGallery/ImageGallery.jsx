import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import styles from "./ImageGallery.module.css";
import PropTypes from "prop-types";

export const ImageGallery = ({ gallery, imageName, toggleModal }) => {
  return (
    <ul className={styles.ImageGallery}>
      {gallery.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          onOpen={toggleModal}
          imageUrl={webformatURL}
          imageName={imageName}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
};

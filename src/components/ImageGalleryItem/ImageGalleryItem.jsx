import propTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  largeImageURL,
  previewImage,
  tags,
  showModal,
  getLargeImageURL
}) => {
  return (
    <GalleryItem onClick={() => getLargeImageURL(largeImageURL)}>
      <GalleryItemImage
        src={previewImage}
        alt={tags}
        onClick={showModal}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  previewImage: propTypes.string.isRequired,
  getLargeImageURL: propTypes.func,
  showModal: propTypes.func,
};
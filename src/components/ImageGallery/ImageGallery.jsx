import propTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ gallery, showModal, getLargeImageURL }) => {
  return (
    <Gallery>
      {gallery.map(({ id, largeImageURL, webformatURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            largeImageURL={largeImageURL}
            previewImage={webformatURL}
            tags={tags}
            showModal={showModal}
            getLargeImageURL={getLargeImageURL}

          />
        );
      })}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  gallery: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      webformatURL: propTypes.string.isRequired,
      tags: propTypes.string.isRequired,
      largeImageURL: propTypes.string,
    })
  ).isRequired,
  getLargeImageURL: propTypes.func,
};
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ searchedArray, imgClick }) => {
  return (
    <ul className={s.ImageGallery}>
      {searchedArray.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            id={image.id}
            src={image.webformatURL}
            alt={image.tags}
            modalSrc={image.largeImageURL}
            onClick={() => imgClick(image.largeImageURL, image.tags)}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  searchedArray: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      modalSrc: PropTypes.string,
    })
  ),
  imgClick: PropTypes.func,
};

export default ImageGallery;

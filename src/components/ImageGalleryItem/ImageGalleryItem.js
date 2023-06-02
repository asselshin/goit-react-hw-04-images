import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, src, alt, onClick }) => {
  return (
    <li className={s.ImageGalleryItem} onClick={onClick}>
      <img id={id} src={src} alt={alt} className={s.ImageGalleryItemImage} />
    </li>
  );
};

ImageGalleryItem.propType = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

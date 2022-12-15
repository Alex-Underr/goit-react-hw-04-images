import styles from './imageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  onClick,
  largeImageURL,
  id,
  webformatURL,
}) {
  const showImg = () => {
    onClick(largeImageURL, id);
  };

  return (
    <li className={styles.imageGalleryItem} onClick={showImg}>
      <img src={webformatURL} alt={id} className={styles.galleryItem} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

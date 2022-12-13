import styles from './imageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';

export default class ImageGalleryItem extends Component {
  showImg = () => {
    this.props.onClick(this.props.largeImageURL, this.props.id);
  };

  render() {
    return (
      <li className={styles.imageGalleryItem} onClick={this.showImg}>
        <img
          src={this.props.webformatURL}
          alt={this.props.id}
          className={styles.galleryItem}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

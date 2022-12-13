import styles from './imageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import { Component } from 'react';
import Loader from '../Loader/Loader';
import PropTypes from 'prop-types';
export default class ImageGallery extends Component {
  state = {
    imageData: null,
    arrayData: [],
    error: null,
    loading: false,
    button: false,
    totalHits: null,
  };
  componentDidUpdate(prevProps, prevState) {
    let fetchString = `https://pixabay.com/api/?q=${this.props.request}&page=${this.props.page}&key=31176122-470dd6c20579d2a67d5e2ecc1&image_type=photo&orientation=horizontal&per_page=12`;

    if (
      this.props.request !== prevProps.request ||
      prevProps.page !== this.props.page
    ) {
      this.setState({ loading: true });
      fetch(fetchString)
        .then(res => res.json())
        .then(data => {
          if (!data.hits?.length) {
            alert('Cant find image');
          }
          if (data.hits?.length) {
            console.log(`We find ${data.totalHits} images!`);
          }
          this.setState(prevState => ({
            arrayData: [...prevState.arrayData, ...data.hits],
            totalHits: data.totalHits,
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  showImg = (largeImageURL, id) => {
    this.props.onClick(largeImageURL, id);
  };

  render() {
    return (
      <>
        <ul className={styles.gallery}>
          {this.state.arrayData &&
            this.state.arrayData.map(e => (
              <ImageGalleryItem
                key={e.id}
                onClick={this.showImg}
                largeImageURL={e.largeImageURL}
                webformatURL={e.webformatURL}
              />
            ))}
        </ul>
        {this.state.arrayData?.length < this.state.totalHits &&
          !this.state.loading && <Button onClick={this.props.loadMore} />}
        {this.state.loading && <Loader />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  request: PropTypes.string,
  page: PropTypes.number,
  loadMore: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

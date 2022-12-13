import styles from './app.module.css';
import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    modalShow: false,
    request: '',
    largeImageURL: null,
    id: null,
    page: 1,
  };

  toggleModal = (largeImageURL, id) => {
    this.setState({ largeImageURL: largeImageURL, id: id });
    this.setState(({ modalShow }) => ({
      modalShow: !modalShow,
    }));
  };
  searchBarSubmit = query => {
    if (query !== this.state.request) {
      this.setState({ request: query, page: 1 });
    }
  };
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { modalShow } = this.state;
    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.searchBarSubmit} />
        {modalShow && (
          <Modal
            onClose={this.toggleModal}
            modalShow={this.modalShow}
            id={this.state.id}
            largeImageURL={this.state.largeImageURL}
          >
            <img src={this.state.largeImageURL} alt={this.state.id} />
          </Modal>
        )}
        <ImageGallery
          request={this.state.request}
          onClick={this.toggleModal}
          loadMore={this.loadMore}
          page={this.state.page}
        />
      </div>
    );
  }
}

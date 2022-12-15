import styles from './app.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { useState } from 'react';

export function App() {
  const [modalShow, setmodalShow] = useState(false);
  const [request, setRequest] = useState('');
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [id, setId] = useState(null);
  const [page, setPage] = useState(1);

  const toggleModal = (largeImageURL, id) => {
    setLargeImageURL(largeImageURL);
    setId({ id });
    setmodalShow(modalShow => !modalShow);
  };
  const searchBarSubmit = query => {
    if (query !== request) {
      setRequest(query);
      setPage(1);
    }
  };
  const loadMore = () => {
    setPage(page + 1);

    // switch (page) {
    //   case 'page':
    //     setPage(page + 1);
    //     console.log(loadMore());
    //     break;

    //   default:
    //     break;
    // }
  };
  return (
    <div className={styles.app}>
      <Searchbar onSubmit={searchBarSubmit} />
      {modalShow && (
        <Modal
          onClose={toggleModal}
          modalShow={modalShow}
          id={id}
          largeImageURL={largeImageURL}
        >
          <img src={largeImageURL} alt={id} />
        </Modal>
      )}
      <ImageGallery
        request={request}
        onClick={toggleModal}
        loadMore={loadMore}
        page={page}
      />
    </div>
  );
}

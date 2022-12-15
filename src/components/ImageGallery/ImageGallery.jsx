import styles from './imageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
export default function ImageGallery({ request, page, onClick, loadMore }) {
  // const [imageData, setImageData] = useState(null);
  const [arrayData, setArrayData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [button, setButton] = useState(false);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    // let fetchString = `https://pixabay.com/api/?q=${request}&page=${page}&key=31176122-470dd6c20579d2a67d5e2ecc1&image_type=photo&orientation=horizontal&per_page=12`;

    if (!request || !page) {
      setLoading(true);
      fetch(fetchString)
        .then(res => res.json())
        .then(data => {
          if (!data.hits?.length) {
            alert('Cant find image');
          }
          if (data.hits?.length) {
            console.log(`We find ${data.totalHits} images!`);
          }
          setArrayData([...arrayData, ...data.hits]);
          setTotalHits(data.totalHits);
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }
    // return res.ok ? await res.json() : Promise.reject(new Error ('Not found'));
  }, [request, page, arrayData]);

  const showImg = (largeImageURL, id) => {
    onClick(largeImageURL, id);
  };

  return (
    <>
      <ul className={styles.gallery}>
        {arrayData &&
          arrayData.map(e => (
            <ImageGalleryItem
              key={e.id}
              onClick={showImg}
              largeImageURL={e.largeImageURL}
              webformatURL={e.webformatURL}
            />
          ))}
      </ul>
      {arrayData?.length < totalHits && !loading && (
        <Button onClick={loadMore} />
      )}
      {loading && <Loader />}
    </>
  );
}

ImageGallery.propTypes = {
  request: PropTypes.string,
  page: PropTypes.number,
  loadMore: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

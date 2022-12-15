import styles from './imageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
export default function ImageGallery({
  request,
  page,
  onClick,
  loadMore,
  setArrayData,
  arrayData,
}) {
  const [, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    let fetchString = `https://pixabay.com/api/?q=${request}&page=${page}&key=31176122-470dd6c20579d2a67d5e2ecc1&image_type=photo&orientation=horizontal&per_page=12`;

    if (request) {
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
          setArrayData(prev => [...prev, ...data.hits]);
          setTotalHits(data.totalHits);
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }
  }, [request, page, setArrayData]);

  const showImg = (largeImageURL, id) => {
    onClick(largeImageURL, id);
  };

  return (
    <>
      <ul className={styles.gallery}>
        {arrayData.length
          ? arrayData.map(e => (
              <ImageGalleryItem
                key={e.id}
                onClick={showImg}
                largeImageURL={e.largeImageURL}
                webformatURL={e.webformatURL}
              />
            ))
          : null}
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

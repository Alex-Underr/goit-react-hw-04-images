import styles from './searchbar.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
export default function Searchbar({ onSubmit }) {
  const [request, setRequest] = useState('');

  const handleInputChange = event => {
    setRequest(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (request.trim() === '') {
      alert('Please, enter your request');
      return;
    }
    setRequest('');
    onSubmit(request);
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          <span className={styles.buttonLabel}></span>
        </button>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={request}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

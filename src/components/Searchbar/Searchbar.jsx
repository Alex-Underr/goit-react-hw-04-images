import styles from './searchbar.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    request: '',
  };
  handleInputChange = event => {
    this.setState({ request: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.request.trim() === '') {
      alert('Please, enter your request');
      return;
    }

    this.props.onSubmit(this.state.request);
    this.setState({ request: '' });
  };
  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.button}>
            <span className={styles.buttonLabel}></span>
          </button>
          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.request}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

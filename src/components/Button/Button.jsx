import styles from './button.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';
export default class Button extends Component {
  handleClick = () => {
    this.props.onClick();
  };
  render() {
    return (
      <button
        type="button"
        className={styles.Button}
        onClick={this.handleClick}
      >
        Load more
      </button>
    );
  }
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

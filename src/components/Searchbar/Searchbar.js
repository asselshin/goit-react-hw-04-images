import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './SearchBar.module.css';

class Searchbar extends Component {
  state = {
    searchInput: '',
  };

  handleChange = ev => {
    const { name, value } = ev.currentTarget;
    this.setState({ [name]: value.trim() });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ searchInput: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.label}>Search</span>
          </button>

          <input
            value={this.state.searchInput}
            onChange={this.handleChange}
            name="searchInput"
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './SearchBar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = ev => {
    setSearchInput(ev.target.value.trim());
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    onSubmit(searchInput);
    setSearchInput('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.label}>Search</span>
        </button>

        <input
          value={searchInput}
          onChange={handleChange}
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

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

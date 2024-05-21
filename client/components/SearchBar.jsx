// components/SearchBar.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '@/styles/SearchBar.module.css';

const SearchBar = ({ onSearchSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <form className={`form-inline ${styles.searchBar}`} onSubmit={handleSubmit}>
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
};

export default SearchBar;

// src/components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form
      className="search-form d-flex"
      onSubmit={handleSubmit}
      style={{ maxWidth: '300px' }} // Retained style from original implementation
    >
      {/* This div structure and classes are from your original MainPage.jsx */}
      <div className="form-control search-input-ratio"> 
        <input
          name="search" // name attribute is good practice
          type="text"
          className="form-control" // Standard Bootstrap class, may be part of search-input-ratio styling
          placeholder="Szukaj spółki…"
          aria-label="Szukaj spółki"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary search-button-ratio">
          Szukaj
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
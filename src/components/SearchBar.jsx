import React, { useState } from 'react';
import './styles/searchBar.css'

const SearchBar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  }

  const handleLocationClick = () => {
    getWeatherByLocation(); 
  }

  return (
    <div className="navbar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar ciudad o país"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
    
  );
}

export default SearchBar;

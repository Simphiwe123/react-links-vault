import React from 'react';
import './styles.css';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="🔍 Search by title, URL, tags..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
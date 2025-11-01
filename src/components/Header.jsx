import React from 'react';
import { Search, Filter } from 'lucide-react';
import './Header.css';

const Header = ({
  searchTerm,
  onSearchChange,
  filterHomeworld,
  onFilterChange,
  homeworlds
}) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-title-section">
          <h1 className="header-title">Star Wars Character</h1>
          <p className="header-subtitle">
            Discover characters from a galaxy far, far away
          </p>
        </div>

        <div className="header-controls">
          <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search characters by name..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-wrapper">
            <Filter className="filter-icon" size={20} />
            <select
              value={filterHomeworld}
              onChange={(e) => onFilterChange(e.target.value)}
              className="filter-select"
            >
              <option value="">All Homeworlds</option>
              {homeworlds.map(world => (
                <option key={world.url} value={world.url}>
                  {world.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
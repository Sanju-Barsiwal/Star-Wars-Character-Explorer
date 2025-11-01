import React, { useState, useEffect } from 'react';
import { Loader, AlertCircle, Users } from 'lucide-react';
import Header from './components/Header';
import CharacterCard from './components/CharacterCard';
import CharacterModal from './components/CharacterModal';
import './App.css';


const App = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [homeworlds, setHomeworlds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHomeworld, setFilterHomeworld] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://swapi.dev/api/people/?page=${currentPage}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch characters');
        return res.json();
      })
      .then(data => {
        setCharacters(data.results);
        setFilteredCharacters(data.results);
        setTotalPages(Math.ceil(data.count / 10));
        setLoading(false);

        const uniqueHomeworlds = [...new Set(data.results.map(c => c.homeworld))];
        Promise.all(uniqueHomeworlds.map(url => fetch(url).then(r => r.json())))
          .then(worlds => setHomeworlds(worlds))
          .catch(err => console.error('Failed to fetch homeworlds:', err));
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    let filtered = characters;

    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterHomeworld) {
      filtered = filtered.filter(c => c.homeworld === filterHomeworld);
    }

    setFilteredCharacters(filtered);
  }, [searchTerm, filterHomeworld, characters]);

  return (
    <div className="app">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterHomeworld={filterHomeworld}
        onFilterChange={setFilterHomeworld}
        homeworlds={homeworlds}
      />

      <main className="main-content">
        {loading ? (
          <div className="loading-state">
            <Loader className="animate-spin loading-spinner" size={48} />
            <p className="loading-text">Loading characters from a galaxy far, far away...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <AlertCircle size={48} className="error-icon" />
            <p className="error-title">Oops! Something went wrong</p>
            <p className="error-message">{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="character-grid">
              {filteredCharacters.map((character) => (
                <CharacterCard
                  key={character.url}
                  character={character}
                  onClick={() => setSelectedCharacter(character)}
                />
              ))}
            </div>

            {filteredCharacters.length === 0 && (
              <div className="empty-state">
                <Users size={48} className="empty-icon" />
                <p className="empty-title">No characters found</p>
                <p className="empty-message">Try adjusting your search or filters</p>
              </div>
            )}

            {filteredCharacters.length > 0 && !searchTerm && !filterHomeworld && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="pagination-button"
                >
                  Previous
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="pagination-button"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
};

export default App;
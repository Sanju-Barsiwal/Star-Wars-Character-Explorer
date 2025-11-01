import React, { useState, useEffect } from 'react';
import { X, Film, Globe, Loader } from 'lucide-react';
import { formatDate, getRandomImage, formatNumber } from '../utils/helpers';
import './CharacterModal.css';


const CharacterModal = ({ character, onClose }) => {
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(character.homeworld)
      .then(res => res.json())
      .then(data => {
        setHomeworld(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [character.homeworld]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="modal-overlay animate-fadeIn" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{character.name}</h2>
          <button onClick={onClose} className="modal-close" aria-label="Close modal">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <img
            src={getRandomImage(character.name)}
            alt={character.name}
            className="modal-image"
          />

          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Height</p>
              <p className="stat-value">
                {character.height !== 'unknown' 
                  ? `${(character.height / 100).toFixed(2)} m` 
                  : 'Unknown'}
              </p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Mass</p>
              <p className="stat-value">
                {character.mass !== 'unknown' ? `${character.mass} kg` : 'Unknown'}
              </p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Birth Year</p>
              <p className="stat-value">{character.birth_year}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Films</p>
              <p className="stat-value stat-with-icon">
                <Film size={20} className="stat-icon" />
                {character.films.length}
              </p>
            </div>
          </div>

          <div className="details-grid">
            <div className="detail-card">
              <p className="detail-label">Gender</p>
              <p className="detail-value">{character.gender}</p>
            </div>
            <div className="detail-card">
              <p className="detail-label">Hair Color</p>
              <p className="detail-value">{character.hair_color}</p>
            </div>
            <div className="detail-card">
              <p className="detail-label">Eye Color</p>
              <p className="detail-value">{character.eye_color}</p>
            </div>
            <div className="detail-card">
              <p className="detail-label">Skin Color</p>
              <p className="detail-value">{character.skin_color}</p>
            </div>
          </div>

          <div className="date-card">
            <p className="detail-label">Date Added</p>
            <p className="date-value">{formatDate(character.created)}</p>
          </div>

          {loading ? (
            <div className="loading-container">
              <Loader className="animate-spin loading-icon" size={32} />
            </div>
          ) : homeworld ? (
            <div className="homeworld-card">
              <h3 className="homeworld-title">
                <Globe className="homeworld-icon" />
                Homeworld: {homeworld.name}
              </h3>
              <div className="homeworld-details">
                <div>
                  <p className="homeworld-label">Terrain</p>
                  <p className="homeworld-value">{homeworld.terrain}</p>
                </div>
                <div>
                  <p className="homeworld-label">Climate</p>
                  <p className="homeworld-value">{homeworld.climate}</p>
                </div>
                <div>
                  <p className="homeworld-label">Population</p>
                  <p className="homeworld-value">{formatNumber(homeworld.population)}</p>
                </div>
                <div>
                  <p className="homeworld-label">Diameter</p>
                  <p className="homeworld-value">
                    {homeworld.diameter !== 'unknown' 
                      ? `${formatNumber(homeworld.diameter)} km` 
                      : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="error-message">
              Unable to load homeworld data
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
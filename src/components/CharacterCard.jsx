import React from 'react';
import { getSpeciesColor, getRandomImage } from '../utils/helpers';
import './CharacterCard.css';


const CharacterCard = ({ character, onClick }) => {
  const gradientColors = getSpeciesColor(character.species);

  return (
    <div
      onClick={onClick}
      className="character-card"
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      style={{ '--gradient-from': gradientColors.from, '--gradient-to': gradientColors.to }}
    >
      <div className="character-image-wrapper">
        <div className="character-gradient-overlay" />
        <img
          src={getRandomImage(character.name)}
          alt={character.name}
          className="character-image"
          loading="lazy"
        />
      </div>
      <div className="character-info">
        <h3 className="character-name">{character.name}</h3>
      </div>
    </div>
  );
};

export default CharacterCard;
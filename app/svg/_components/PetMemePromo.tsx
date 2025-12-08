import React from 'react';
import './PetMemePromo.css';

const PetMemePromo = () => {
  return (
    <div className="pet-meme-promo">
      <div className="pet-meme-content">
        <h3 className="pet-meme-title">
          🐶 PetMeme.org <span className="pet-meme-badge">New</span>
        </h3>
        <p className="pet-meme-description">
          Turn your pet photos into hilarious AI memes instantly! No prompts needed.
        </p>
        <a 
          href="https://petmeme.org" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="pet-meme-button"
        >
          ✨ Create Pet Memes
        </a>
      </div>
    </div>
  );
};

export default PetMemePromo;

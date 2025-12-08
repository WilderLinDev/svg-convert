import React from 'react';
import NextImage from 'next/image';
import './PetMemePromo.css';

const PetMemePromo = () => {
  return (
    <div className="pet-meme-promo">
      <div className="pet-meme-content">
        <div className="pet-meme-header">
          <h3 className="pet-meme-title">
            🐶 PetMeme.org
          </h3>
          <span className="pet-meme-badge">New</span>
        </div>
        <p className="pet-meme-description">
          Turn your pet photos into hilarious AI memes instantly! No prompts needed.
        </p>
        <div className="pet-meme-image-container">
          <NextImage
            src="/meme.png"
            alt="Funny pet meme example"
            width={280}
            height={200}
            className="pet-meme-image"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
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

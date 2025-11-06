import React from "react";

const ArtworkPreview = ({ artwork, onClose }) => {
  if (!artwork) return null;

  return (
    <div className="preview-overlay" onClick={onClose} data-animate="fade-up">
      <div className="preview-content" onClick={(e) => e.stopPropagation()} data-animate="zoom-in">
        <img src={artwork.imageUrl} alt={artwork.title} />
        <div className="preview-info" data-animate="fade-up">
          <h2>{artwork.title}</h2>
          <p>By {artwork.artist}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtworkPreview;

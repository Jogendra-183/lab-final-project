import React from "react";

const BuyArtworkModal = ({ artwork, onClose }) => {
  if (!artwork) return null;

  return (
    <div className="preview-overlay" onClick={onClose}>
      <div className="preview-content" onClick={(e) => e.stopPropagation()}>
        <img src={artwork.imageUrl} alt={artwork.title} />

        <div className="preview-info">
          <h2>{artwork.title}</h2>
          <p>By {artwork.artist}</p>
          <h3 style={{marginTop: "1rem"}}>Price: ${artwork.price}</h3>

          <button className="btn btn-primary" style={{marginTop: "1.5rem"}}>
            Contact Artist to Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyArtworkModal;

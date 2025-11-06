import React, { useEffect } from "react";

const Lightbox = ({ open, onClose, artwork }) => {
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open || !artwork) return null;

  return (
    <div className="lb-overlay" onClick={onClose}>
      <div className="lb-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="lb-close btn btn-secondary" onClick={onClose}>Close ✕</button>
        <div className="lb-media">
          <img src={artwork.imageUrl} alt={artwork.title} />
        </div>
        <div className="lb-meta">
          <h2>{artwork.title}</h2>
          <p className="lb-artist">by {artwork.artist}</p>
          <div className="lb-tags">
            <span className="status-badge status-for-sale">{artwork.status}</span>
            <span className="status-badge">{artwork.style}</span>
            {artwork.price != null && <span className="status-badge">₹ {artwork.price}</span>}
          </div>
          <p className="lb-desc">A curated piece from our premium collection.</p>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;

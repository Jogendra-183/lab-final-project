import React, { useState } from 'react';

const ArtCard = ({ title, artist, imageUrl, price, onClickBuy }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  return (
    <div className="art-card" data-animate="zoom-in">
      <div className="art-card-image-wrapper" onClick={onClickBuy} style={{cursor: "zoom-in"}}>
        <img src={imageUrl} alt={title} />
      </div>

      <div className="art-card-info">
        <div
          className={`art-card-favorite ${isLiked ? 'liked' : ''}`}
          onClick={toggleLike}
          title="Save to Favorites"
          data-animate="fade-left"
        >
          ❤
        </div>

        <h3 data-animate="fade-up">{title}</h3>
        <p data-animate="fade-up">by {artist}</p>
        {price != null && <p className="art-price" data-animate="fade-up">${price}</p>}

        {onClickBuy && (
          <button className="btn btn-primary" onClick={onClickBuy} data-animate="fade-up">
            Buy / View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default ArtCard;

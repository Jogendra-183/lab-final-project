import React, { useState, useEffect } from 'react';
import ArtCard from '../components/ArtCard.jsx';
import { Link } from 'react-router-dom';
import apiService from '../services/apiService.js';

const HomePage = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [trendingArtworks, setTrendingArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getArtworks = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.get('/artworks');
        setFeaturedArtworks(response.data.slice(0, 8));
        setTrendingArtworks(response.data.slice(8, 12));
      } catch (error) {
        console.error("Failed to fetch artworks", error);
      }
      setIsLoading(false);
    };
    getArtworks();
  }, []);
useEffect(() => {
  const elements = document.querySelectorAll("[data-animate]");
  const reveal = () => {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) el.classList.add("visible");
    });
  };
  reveal();
  window.addEventListener("scroll", reveal);
  return () => window.removeEventListener("scroll", reveal);
}, []);

  return (
    <div>

      {/* ——— HERO SECTION (with background + animation) ——— */}
      <section className="hero-section" data-animate="fade-up">
        <h1 className="hero-title" data-animate="fade-up">Where Art & Connection Flourish</h1>
        <p className="hero-sub" data-animate="fade-up">
          The premier platform for discovering exceptional artists and curating world-class digital exhibitions.
        </p>
        <Link to="/visitor-dashboard" className="btn btn-primary hero-btn" data-animate="zoom-in">
          Explore The Gallery
        </Link>
      </section>

      {/* ——— FEATURED COLLECTION ——— */}
      <h2 className="section-header" data-animate="fade-left">Featured Collection</h2>
      
      {isLoading ? (
        <p data-animate="fade-up">Loading collection...</p>
      ) : (
        <div className="grid-container">
          {featuredArtworks.map(art => (
            <div data-animate="fade-up" key={art.id}>
              <ArtCard
                title={art.title}
                artist={art.artist}
                imageUrl={art.imageUrl}
              />
            </div>
          ))}
        </div>
      )}

      {/* ——— TRENDING NOW ——— */}
      <h2 className="section-header" style={{ marginTop: '3rem' }} data-animate="fade-left">Trending Now</h2>

      {isLoading ? (
        <p data-animate="fade-up">Loading artworks...</p>
      ) : (
        <div className="grid-container">
          {trendingArtworks.map(art => (
            <div data-animate="fade-up" key={art.id}>
              <ArtCard
                title={art.title}
                artist={art.artist}
                imageUrl={art.imageUrl}
              />
            </div>
          ))}
        </div>
      )}

      {/* ——— EXHIBITION SPOTLIGHT SECTION ——— */}
      <section className="exhibition-highlight" data-animate="fade-up">
  <div className="exhibition-image"></div>

  <div className="exhibition-text">
    <h2>Featured Exhibition</h2>
    <h3>Echoes of Stillness</h3>
    <p>
      A curated journey through contemporary abstract expression,
      showcasing emerging voices whose works speak to memory, silence, and human emotion.
    </p>

    <Link to="/visitor-dashboard" className="explore-btn">
      View Exhibition →
    </Link>
  </div>
</section>


      {/* ——— CTA SECTION ——— */}
      <section className="card cta-section" style={{ marginTop: '3rem' }} data-animate="fade-up">
        <div className="cta-box" data-animate="fade-up">
          <h2 style={{ margin: 0 }}>Are you an Artist?</h2>
          <p style={{ color: 'var(--secondary-text-color)' }}>Showcase your portfolio to the world.</p>
          <Link to="/signup" className="btn btn-secondary">Join as Artist</Link>
        </div>
        <div className="cta-box" data-animate="fade-up">
          <h2 style={{ margin: 0 }}>Are you a Curator?</h2>
          <p style={{ color: 'var(--secondary-text-color)' }}>Create stunning digital exhibitions.</p>
          <Link to="/signup" className="btn btn-secondary">Join as Curator</Link>
        </div>
      </section>

    </div>
  );
};

export default HomePage;

import React, { useState, useEffect } from "react";
import apiService from "../services/apiService.js";

const ArtistDashboard = () => {
  const [myArtworks, setMyArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newArtTitle, setNewArtTitle] = useState("");
  const [newArtFile, setNewArtFile] = useState(null);

  useEffect(() => {
    const getArtworks = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.get("/my-artworks");
        setMyArtworks(response.data);
      } catch (error) {
        console.error("Failed to fetch artworks", error);
      }
      setIsLoading(false);
    };
    getArtworks();
  }, []);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newArtTitle) return alert("Please enter a title.");

    const newArtwork = {
      id: Date.now(),
      title: newArtTitle,
      artist: "You",
      imageUrl: newArtFile
        ? URL.createObjectURL(newArtFile)
        : "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200&auto=format&fit=crop",
      status: "For Sale",
    };

    setMyArtworks([newArtwork, ...myArtworks]);
    setNewArtTitle("");
    setNewArtFile(null);
  };

  const handleDeleteArtwork = (idToDelete) => {
    if (window.confirm("Delete this artwork?")) {
      setMyArtworks(myArtworks.filter((art) => art.id !== idToDelete));
    }
  };

  return (
    <div className="artist-page">
      <div className="artist-hero" data-animate="blur-up">
        <h1>Your Studio</h1>
        <p>Showcase. Sell. Inspire the world with your art.</p>
      </div>

      <div className="artist-stats">
        <div className="stat-box" data-animate="fade-up">
          <h3>{myArtworks.length}</h3>
          <p>Total Artworks</p>
        </div>
        <div className="stat-box" data-animate="fade-up">
          <h3>12.4k</h3>
          <p>Profile Views</p>
        </div>
        <div className="stat-box" data-animate="fade-up">
          <h3>89</h3>
          <p>Favorites</p>
        </div>
      </div>

      <div className="upload-card" data-animate="fade-up">
        <h2>Upload New Artwork</h2>
        <form onSubmit={handleUploadSubmit}>
          <input
            type="text"
            placeholder="Artwork Title"
            value={newArtTitle}
            onChange={(e) => setNewArtTitle(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setNewArtFile(e.target.files[0])}
          />
          <button className="btn btn-primary">Upload</button>
        </form>
    </div>

      <h2 className="section-title" data-animate="fade-left">Your Portfolio</h2>

      {isLoading ? (
        <p className="loading-text" data-animate="fade-up">Loading your artwork...</p>
      ) : (
        <div className="art-gallery">
          {myArtworks.map((art) => (
            <div className="art-card-premium" key={art.id} data-animate="zoom-in">
              <img src={art.imageUrl} alt={art.title} />
              <div className="art-info">
                <h4>{art.title}</h4>
                <span className={`badge ${art.status === "For Sale" ? "badge-sale" : "badge-sold"}`}>
                  {art.status}
                </span>
              </div>
              <button className="delete-btn" onClick={() => handleDeleteArtwork(art.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtistDashboard;

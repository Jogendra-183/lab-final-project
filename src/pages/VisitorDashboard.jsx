import React, { useState, useEffect } from "react";
import ArtCard from "../components/ArtCard.jsx";
import ArtworkPreview from "../components/ArtworkPreview.jsx";
import apiService from "../services/apiService.js";

const VisitorDashboard = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);

  // Filters
  const [search, setSearch] = useState("");
  const [styleFilter, setStyleFilter] = useState("All");
  const [maxPrice, setMaxPrice] = useState("0");
  const [sortBy, setSortBy] = useState("default");
  const [availability, setAvailability] = useState("All");

  // Fullscreen Preview
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  useEffect(() => {
    const getArtworks = async () => {
      try {
        const response = await apiService.get("/artworks");
        setArtworks(response.data);
        setFilteredArtworks(response.data);
      } catch (error) {
        console.error("Failed to fetch artworks", error);
      }
    };
    getArtworks();
  }, []);

  useEffect(() => {
    let filtered = [...artworks];

    if (search.trim() !== "") {
      filtered = filtered.filter(art =>
        art.title.toLowerCase().includes(search.toLowerCase()) ||
        art.artist.toLowerCase().includes(search.toLowerCase()) ||
        art.style.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (styleFilter !== "All") filtered = filtered.filter(art => art.style === styleFilter);
    if (availability !== "All") filtered = filtered.filter(art => art.status === availability);
    if (maxPrice !== "0") filtered = filtered.filter(art => art.price <= parseInt(maxPrice));

    if (sortBy === "priceLow") filtered.sort((a, b) => a.price - b.price);
    if (sortBy === "priceHigh") filtered.sort((a, b) => b.price - a.price);
    if (sortBy === "newest") filtered.sort((a, b) => b.id - a.id);

    setFilteredArtworks(filtered);
  }, [search, styleFilter, maxPrice, sortBy, availability, artworks]);

  return (
    <div>
      <div className="page-header" data-animate="fade-up">
        <h1>Gallery</h1>
        <p>Explore curated artworks. Filter by style, search, sort, and view in full screen.</p>
      </div>

      {/* Filter Bar */}
      <div className="gallery-filters" data-animate="fade-up">
        <div className="filter-group">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search title, artist, style..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Style</label>
          <select value={styleFilter} onChange={(e) => setStyleFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Modern">Modern</option>
            <option value="Abstract">Abstract</option>
            <option value="Impressionism">Impressionism</option>
            <option value="Realism">Realism</option>
            <option value="Pop Art">Pop Art</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort By</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Recommended</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Availability</label>
          <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
            <option value="All">All</option>
            <option value="For Sale">For Sale</option>
            <option value="Sold">Sold</option>
          </select>
        </div>

        <div className="filter-group price-filter">
          <label>Max Price</label>
          <input
            type="range"
            min="0"
            max="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <span className="price-value">
            {maxPrice === "0" ? "Any" : `≤ $${maxPrice}`}
          </span>
        </div>
      </div>

      {/* Artwork Grid */}
      <div className="grid-container">
        {filteredArtworks.length > 0 ? (
          filteredArtworks.map((art, idx) => (
            <div key={art.id} onClick={() => setSelectedArtwork(art)} style={{ cursor: "zoom-in" }} data-animate="zoom-in">
              <ArtCard
                title={art.title}
                artist={art.artist}
                imageUrl={art.imageUrl}
                price={art.price}
                onClickBuy={() => setSelectedArtwork(art)}
              />
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "2rem", color: "#6f6457" }} data-animate="fade-up">
            No artworks match your filters.
          </p>
        )}
      </div>

      {/* Fullscreen Preview */}
      <ArtworkPreview
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </div>
  );
};

export default VisitorDashboard;

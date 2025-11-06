import React, { useState, useEffect } from "react";
import apiService from "../services/apiService.js";

const CuratorDashboard = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newCover, setNewCover] = useState(null);

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const response = await apiService.get("/exhibitions");
        setExhibitions(response.data);
      } catch (error) {
        console.log("Failed to load exhibitions");
      }
    };
    fetchExhibitions();
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle) return alert("Please enter a title.");

    const newExhibition = {
      id: Date.now(),
      title: newTitle,
      status: "Draft",
      cover: newCover
        ? URL.createObjectURL(newCover)
        : "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1200&auto=format&fit=crop",
    };

    setExhibitions([newExhibition, ...exhibitions]);
    setNewTitle("");
    setNewCover(null);
  };

  const toggleStatus = (id) => {
    setExhibitions(
      exhibitions.map((ex) =>
        ex.id === id
          ? { ...ex, status: ex.status === "Published" ? "Draft" : "Published" }
          : ex
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this exhibition?")) {
      setExhibitions(exhibitions.filter((ex) => ex.id !== id));
    }
  };

  return (
    <div className="curator-page">
      <div className="curator-hero" data-animate="blur-up">
        <h1>Your Exhibition Studio</h1>
        <p>Create cultural experiences that inspire & tell stories through art.</p>
      </div>

      <div className="create-exhibition-card" data-animate="fade-up">
        <h2>Create New Exhibition</h2>
        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Exhibition Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input type="file" onChange={(e) => setNewCover(e.target.files[0])} />
          <button className="btn btn-primary">Create Exhibition</button>
        </form>
      </div>

      <h2 className="section-title" data-animate="fade-left">Managed Exhibitions</h2>

      <div className="exhibition-grid">
        {exhibitions.map((ex) => (
          <div className="exhibition-card" key={ex.id} data-animate="zoom-in">
            <img src={ex.cover} alt={ex.title} />
            <div className="exhibition-info">
              <h3>{ex.title}</h3>
              <span className={`badge ${ex.status === "Published" ? "badge-published" : "badge-draft"}`}>
                {ex.status}
              </span>
            </div>

            <div className="exhibition-actions">
              <button className="btn btn-secondary" onClick={() => toggleStatus(ex.id)}>
                {ex.status === "Published" ? "Unpublish" : "Publish"}
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(ex.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CuratorDashboard;

import React, { useEffect, useMemo, useRef, useState } from "react";
import apiService from "../services/apiService.js";

/* Helpers for localStorage */
const getLS = (k, d) => { try { return JSON.parse(localStorage.getItem(k) ?? JSON.stringify(d)); } catch { return d; } };
const setLS = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const ArtworkModal = ({ open, onClose, artwork, onLike, likes }) => {
  if (!open || !artwork) return null;
  const handleShare = async () => {
    const url = window.location.href + `#art-${artwork.id}`;
    try { await navigator.clipboard.writeText(url); alert("Link copied to clipboard!"); }
    catch { alert("Copy failed—please copy manually."); }
  };
  return (
    <div className="expo-modal-overlay" onClick={onClose} data-animate="fade-up">
      <div className="expo-modal" onClick={(e) => e.stopPropagation()} data-animate="zoom-in">
        <button className="expo-close" onClick={onClose}>✕</button>
        <div className="expo-modal-media">
          <img src={artwork.imageUrl} alt={artwork.title} />
        </div>
        <div className="expo-modal-meta">
          <h2 data-animate="fade-up">{artwork.title}</h2>
          <p className="expo-artist" data-animate="fade-up">by {artwork.artist}</p>
          <div className="expo-tags" data-animate="fade-up">
            {artwork.style && <span className="badge">{artwork.style}</span>}
            {artwork.status && <span className="badge">{artwork.status}</span>}
            {artwork.price != null && <span className="badge">₹ {artwork.price}</span>}
          </div>
          <ul className="expo-specs" data-animate="fade-up">
            <li><strong>Medium:</strong> {artwork.medium || "Mixed media on canvas"}</li>
            <li><strong>Size:</strong> {artwork.size || "60 × 80 cm"}</li>
          </ul>
          <div className="expo-actions" data-animate="fade-up">
            <button className="btn btn-primary" onClick={() => onLike(artwork.id)}>
              ❤️ Like <span className="like-bubble">{likes[artwork.id] || 0}</span>
            </button>
            <button className="btn btn-secondary" onClick={handleShare}>🔗 Share</button>
          </div>
          <p className="expo-desc" data-animate="fade-up">
            A curated piece from our premium exhibition. Experience the texture and color in full.
          </p>
        </div>
      </div>
    </div>
  );
};

const ExhibitionPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [title, setTitle] = useState("The Living Canvas");
  const [theme, setTheme] = useState("Modern expressions of light, form, and emotion.");
  const [desc, setDesc] = useState("A digital exhibition featuring emerging and established voices.");
  const [dates] = useState({ start: "2025-11-01", end: "2026-01-15" });
  const [location] = useState("Online • ArtConnect");
  const [social] = useState({
    instagram: "https://instagram.com/",
    twitter: "https://x.com/",
    mail: "mailto:hello@artconnect.example"
  });

  const [likes, setLikes] = useState(() => getLS("expo_likes", {}));
  const [comments, setComments] = useState(() => getLS("expo_comments", []));
  const [commentText, setCommentText] = useState("");
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const galleryRef = useRef(null);

  const [dark, setDark] = useState(() => getLS("expo_theme_dark", false));
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    setLS("expo_theme_dark", dark);
  }, [dark]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiService.get("/artworks");
        setArtworks(res.data);
      } catch (e) {
        console.error("Failed loading artworks", e);
      }
      try {
        const ex = await apiService.get("/exhibitions");
        if (Array.isArray(ex.data) && ex.data.length) {
          setTitle(ex.data[0].title || title);
        }
      } catch {}
    })();
  }, []);

  const heroImage = useMemo(
    () => (artworks[0]?.imageUrl) || "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1600&auto=format&fit=crop",
    [artworks]
  );

  const artists = useMemo(() => {
    const map = new Map();
    artworks.forEach(a => {
      if (!map.has(a.artist)) {
        map.set(a.artist, {
          name: a.artist,
          bio: `Creator in ${a.style || "Contemporary Art"}`,
          photo: a.imageUrl
        });
      }
    });
    return Array.from(map.values()).slice(0, 8);
  }, [artworks]);

  const openModal = (art) => { setSelected(art); setOpen(true); };
  const closeModal = () => setOpen(false);

  const handleLike = (id) => {
    setLikes(prev => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 };
      setLS("expo_likes", next);
      return next;
    });
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const item = { id: Date.now(), text: commentText.trim(), at: new Date().toISOString() };
    const next = [item, ...comments];
    setComments(next);
    setLS("expo_comments", next);
    setCommentText("");
  };

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="expo-page">
      {/* HERO */}
      <section className="expo-hero" style={{ backgroundImage: `url(${heroImage})` }} data-animate="blur-up">
        <div className="expo-hero-shade">
          <div className="expo-hero-inner">
            <h1 className="expo-title" data-animate="fade-up">{title}</h1>
            <p className="expo-theme" data-animate="fade-up">{theme}</p>
            <p className="expo-desc" data-animate="fade-up">{desc}</p>
            <div className="expo-hero-actions" data-animate="fade-up">
              <button className="btn btn-primary" onClick={() => scrollTo(galleryRef)}>Explore Art ↓</button>
              <button className="btn btn-secondary" onClick={() => setDark(d => !d)}>{dark ? "Light Mode" : "Dark Mode"}</button>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section ref={galleryRef} className="expo-section" data-animate="fade-up">
        <h2 className="expo-h2" data-animate="fade-left">Gallery</h2>
        <div className="expo-masonry">
          {artworks.map(a => (
            <article key={a.id} id={`art-${a.id}`} className="expo-card" onClick={() => openModal(a)} data-animate="zoom-in">
              <div className="expo-thumb"><img src={a.imageUrl} alt={a.title} loading="lazy" /></div>
              <div className="expo-meta">
                <h3>{a.title}</h3>
                <p className="by">{a.artist}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ARTISTS */}
      <section className="expo-section" data-animate="fade-up">
        <h2 className="expo-h2" data-animate="fade-left">Artists</h2>
        <div className="expo-artists">
          {artists.map(ar => (
            <div key={ar.name} className="artist-mini" data-animate="fade-up">
              <div className="avatar"><img src={ar.photo} alt={ar.name} /></div>
              <div className="mini-meta">
                <h4>{ar.name}</h4>
                <p>{ar.bio}</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    const hit = artworks.find(x => x.artist === ar.name);
                    if (hit) {
                      const el = document.getElementById(`art-${hit.id}`);
                      el?.scrollIntoView({ behavior: "smooth", block: "center" });
                      el?.classList.add("pulse");
                      setTimeout(() => el?.classList.remove("pulse"), 1200);
                    } else {
                      scrollTo(galleryRef);
                    }
                  }}
                >
                  View Artworks
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GUESTBOOK */}
      <section className="expo-section" data-animate="fade-up">
        <h2 className="expo-h2" data-animate="fade-left">Guestbook</h2>
        <form className="guestbook" onSubmit={addComment} data-animate="fade-up">
          <textarea
            placeholder="Leave a thoughtful note for the artists…"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">Post</button>
        </form>

        <ul className="comments-list" data-animate="fade-up">
          {comments.length === 0 && <li className="empty">Be the first to leave a note.</li>}
          {comments.map(c => (
            <li key={c.id} data-animate="fade-up">
              <div className="bubble">{c.text}</div>
              <time>{new Date(c.at).toLocaleString()}</time>
            </li>
          ))}
        </ul>

        <div className="expo-sharebar" data-animate="fade-up">
          <button
            className="btn btn-secondary"
            onClick={async () => {
              try { await navigator.clipboard.writeText(window.location.href); alert("Exhibition link copied!"); }
              catch {}
            }}
          >
            🔗 Share Exhibition
          </button>
        </div>
      </section>

      {/* INFO STRIP */}
      <section className="expo-infostrip" data-animate="fade-up">
        <div><strong>Start:</strong> {dates.start}</div>
        <div><strong>End:</strong> {dates.end}</div>
        <div><strong>Where:</strong> {location}</div>
        <div className="links">
          <a href={social.mail}>Email</a>
          <a href={social.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={social.twitter} target="_blank" rel="noreferrer">X / Twitter</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="expo-footer" data-animate="fade-up">
        <div>© {new Date().getFullYear()} ArtConnect — curated with care.</div>
        <div className="links">
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Terms</a>
        </div>
      </footer>

      <ArtworkModal
        open={open}
        onClose={closeModal}
        artwork={selected}
        likes={likes}
        onLike={handleLike}
      />
    </div>
  );
};

export default ExhibitionPage;

import React, { useState } from "react";

const OMDB_API_KEY = "6c14f328";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function searchMovies() {
    if (!query) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(
          query
        )}&type=movie`
      );
      const data = await res.json();

      if (data.Response === "True") {
        const moviesWithDetails = await Promise.all(
          data.Search.map(async (m) => {
            const r = await fetch(
              `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${m.imdbID}&plot=short`
            );
            const details = await r.json();
            return { ...m, details };
          })
        );

        setMovies(moviesWithDetails);
      } else {
        setMovies([]);
        setError(data.Error || "No results");
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }
  function toggleFavorite(movie) {
    const exists = favorites.find((f) => f.imdbID === movie.imdbID);
    if (exists) {
      setFavorites(favorites.filter((f) => f.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  }

  function isFavorite(movie) {
    return favorites.some((f) => f.imdbID === movie.imdbID);
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "system-ui, sans-serif",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#1e3a8a" }}>
        🎬 Movie Search & Favorites
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
          gap: "8px",
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          style={{
            padding: "8px 12px",
            width: "250px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={searchMovies}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
      <h2 style={{ marginTop: "30px", color: "#1e293b" }}>Movies</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginTop: "10px",
        }}
      >
        {movies.map((m) => {
          const poster =
            m.Poster && m.Poster !== "N/A"
              ? m.Poster
              : "https://via.placeholder.com/300x450?text=No+Poster";
          const details = m.details || {};
          const genre = details.Genre || "Unknown Genre";

          return (
            <div
              key={m.imdbID}
              style={{
                background: "white",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src={poster}
                alt={m.Title}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: "10px 12px", flex: 1 }}>
                <h3 style={{ margin: "6px 0", fontSize: "16px" }}>{m.Title}</h3>
                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: "14px",
                    color: "#475569",
                  }}
                >
                  {m.Year} • {genre}
                </p>

                <button
                  onClick={() => toggleFavorite(m)}
                  style={{
                    width: "100%",
                    padding: "8px 0",
                    backgroundColor: isFavorite(m) ? "#facc15" : "#2563eb",
                    color: isFavorite(m) ? "#1e293b" : "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                >
                  {isFavorite(m) ? "★ Favorited" : "☆ Add to Favorites"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <h2 style={{ marginTop: "40px", color: "#1e293b" }}>Favorites</h2>
      {favorites.length === 0 ? (
        <p style={{ color: "#64748b" }}>No favorites yet — add some!</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginTop: "10px",
          }}
        >
          {favorites.map((f) => {
            const poster =
              f.Poster && f.Poster !== "N/A"
                ? f.Poster
                : "https://via.placeholder.com/300x450?text=No+Poster";
            const genre = f.details?.Genre || "Unknown Genre";

            return (
              <div
                key={f.imdbID}
                style={{
                  background: "white",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                <img
                  src={poster}
                  alt={f.Title}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ padding: "8px" }}>
                  <h4 style={{ margin: "4px 0" }}>{f.Title}</h4>
                  <p style={{ fontSize: "14px", color: "#475569" }}>
                    {f.Year} • {genre}
                  </p>
                  <button
                    onClick={() => toggleFavorite(f)}
                    style={{
                      backgroundColor: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

import React from "react";

export default function MovieCard({ movie, onFavorite, onOpen, isFavorite }) {
  const details = movie.details || {};
  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  const genreText = details.Genre || "Genre unavailable";
  const yearText = movie.Year || "Unknown Year";

  return (
    <article className="bg-white rounded shadow p-3 flex flex-col hover:shadow-lg transition-all">
      <img
        src={poster}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded mb-3"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{movie.Title}</h3>
        <p className="text-sm text-slate-500">
          {yearText} • {genreText}
        </p>
        {details.Plot && details.Plot !== "N/A" && (
          <p className="text-sm mt-2 line-clamp-3 text-slate-600">
            {details.Plot}
          </p>
        )}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={onOpen}
          className="flex-1 py-2 border rounded hover:bg-slate-100"
        >
          Details of the Movie
        </button>
        <button
          onClick={onFavorite}
          className={`px-3 py-2 rounded ${
            isFavorite ? "bg-amber-400" : "bg-slate-200"
          }`}
        >
          {isFavorite ? "Saved" : "Favorite"}
        </button>
      </div>
    </article>
  );
}

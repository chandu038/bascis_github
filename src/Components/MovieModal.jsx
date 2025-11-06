import React from 'react';

export default function MovieModal({ movie, onClose, onToggleFav, isFavorite }) {
  if (!movie) return null;

  const details = movie.details || {};
  const poster =
    movie.Poster && movie.Poster !== 'N/A'
      ? movie.Poster
      : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-3xl w-full p-4 md:p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <img
            src={poster}
            alt={movie.Title}
            className="w-36 h-52 md:w-48 md:h-72 object-cover rounded"
          />

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{movie.Title}</h3>
                <p className="text-sm text-slate-500">
                  {movie.Year} • {details.Genre}
                </p>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <button
                  onClick={onToggleFav}
                  className={`px-3 py-1 rounded ${
                    isFavorite ? 'bg-amber-400' : 'bg-slate-200'
                  }`}
                >
                  {isFavorite ? 'Saved' : 'Favorite'}
                </button>
                <button
                  onClick={onClose}
                  className="text-sm underline text-slate-600"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="mt-3 text-sm text-slate-700 space-y-1">
              <p>
                <strong>Plot: </strong>
                {details.Plot}
              </p>
              <p>
                <strong>Director: </strong>
                {details.Director}
              </p>
              <p>
                <strong>Actors: </strong>
                {details.Actors}
              </p>
              <p>
                <strong>Runtime: </strong>
                {details.Runtime}
              </p>
              <p>
                <strong>IMDB Rating: </strong>
                {details.imdbRating}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

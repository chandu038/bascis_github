import React from 'react'


export default function Favorites({ favorites, onRemove, onOpen }) {
return (
<div className="sticky top-6">
<h3 className="text-lg font-medium mb-3">Favorites ({favorites.length})</h3>
{favorites.length === 0 ? (
<div className="text-slate-500">No favorites yet — save a movie.</div>
) : (
<ul className="space-y-3">
{favorites.map(f => (
<li key={f.imdbID} className="bg-white p-3 rounded shadow flex items-center gap-3">
<img src={f.Poster && f.Poster !== 'N/A' ? f.Poster : 'https://via.placeholder.com/80x110?text=No+Poster'} alt="poster" className="w-16 h-20 object-cover rounded" />
<div className="flex-1">
<div className="font-medium">{f.Title}</div>
<div className="text-sm text-slate-500">{f.Year}</div>
</div>
<div className="flex flex-col gap-2">
<button onClick={() => onOpen(f)} className="text-sm underline">Open</button>
<button onClick={() => onRemove(f)} className="text-sm text-red-600">Remove</button>
</div>
</li>
))}
</ul>
)}
</div>
)
}
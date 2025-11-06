import React, { useState } from 'react'


export default function SearchBar({ onSearch, defaultValue = '' }) {
const [value, setValue] = useState(defaultValue)


function submit(e) {
e && e.preventDefault()
onSearch(value)
}


return (
<form onSubmit={submit} className="w-full flex gap-2">
<input
value={value}
onChange={e => setValue(e.target.value)}
placeholder="Search movies by name..."
className="flex-1 p-2 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
/>
<button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded">Search</button>
</form>
)
}
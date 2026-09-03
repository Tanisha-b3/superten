import { useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ onSearch, placeholder = 'Search for a service, scheme or department...' }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-24 py-3.5 rounded-xl text-sm transition-all duration-200 border-2 focus:ring-0"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          aria-label="Search services"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:opacity-90"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          Search
        </button>
      </div>
    </form>
  )
}

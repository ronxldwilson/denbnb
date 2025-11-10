'use client'

import { useState } from 'react'
import { Search, Calendar, Users } from 'lucide-react'

export default function SearchBar() {
  const [location, setLocation] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Searching for:', { location, checkIn, checkOut, guests })
  }

  return (
    <div className="bg-white border border-gray-300 rounded-full shadow-lg p-2">
      <div className="flex items-center divide-x divide-gray-300">
        {/* Location */}
        <div className="flex-1 px-6">
          <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wide">
            Where
          </label>
          <input
            type="text"
            placeholder="Search destinations"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-500"
          />
        </div>

        {/* Check-in */}
        <div className="flex-1 px-6">
          <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wide">
            Check in
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-sm text-gray-900"
          />
        </div>

        {/* Check-out */}
        <div className="flex-1 px-6">
          <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wide">
            Check out
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-sm text-gray-900"
          />
        </div>

        {/* Guests */}
        <div className="flex-1 px-6">
          <label className="block text-xs font-semibold text-gray-900 uppercase tracking-wide">
            Who
          </label>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-900">{guests} guest{guests !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Search Button */}
        <div className="px-2">
          <button
            onClick={handleSearch}
            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

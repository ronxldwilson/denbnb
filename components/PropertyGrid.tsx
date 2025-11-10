'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Heart, Star } from 'lucide-react'

interface Property {
  id: string
  title: string
  location: string
  price: number
  avgRating: number
  reviewCount: number
  images: string[]
  host: {
    name: string
  }
}

export default function PropertyGrid() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties')
        if (!response.ok) {
          throw new Error('Failed to fetch properties')
        }
        const data = await response.json()
        setProperties(data)
      } catch (err) {
        setError('Failed to load properties')
        console.error('Error fetching properties:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        {error}
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No properties found
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Popular destinations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="group cursor-pointer">
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={property.images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'}
                alt={property.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                <Heart className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{property.title}</h3>
                {property.avgRating > 0 && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current text-gray-900" />
                    <span className="text-sm text-gray-600">{property.avgRating}</span>
                    <span className="text-sm text-gray-400">({property.reviewCount})</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500">{property.location}</p>
              <p className="mt-1">
                <span className="font-semibold">${property.price}</span>
                <span className="text-gray-500"> night</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

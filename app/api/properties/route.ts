import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import redis from '@/lib/redis'

// GET /api/properties - Get all properties with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location')
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')
    const guests = searchParams.get('guests')

    // Create cache key based on query parameters
    const cacheKey = `properties:${JSON.stringify({ location, checkIn, checkOut, guests })}`

    // Try to get from cache first
    try {
      const cached = await redis.get(cacheKey)
      if (cached) {
        console.log('Serving from cache')
        return NextResponse.json(JSON.parse(cached))
      }
    } catch (redisError) {
      console.error('Redis error:', redisError)
      // Continue without cache if Redis fails
    }

    let where: any = {}

    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive'
      }
    }

    // For now, skip booking availability check - in real app, we'd check if property is booked
    // during the specified dates

    const properties = await prisma.property.findMany({
      where,
      include: {
        host: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        category: true,
        amenities: true,
        _count: {
          select: {
            reviews: true
          }
        }
      }
    })

    // Add average rating calculation
    const propertiesWithRating = await Promise.all(
      properties.map(async (property) => {
        const reviews = await prisma.review.findMany({
          where: { propertyId: property.id },
          select: { rating: true }
        })

        const avgRating = reviews.length > 0
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
          : 0

        return {
          ...property,
          avgRating: Math.round(avgRating * 10) / 10,
          reviewCount: reviews.length
        }
      })
    )

    // Cache the result for 5 minutes
    try {
      await redis.setEx(cacheKey, 300, JSON.stringify(propertiesWithRating))
    } catch (redisError) {
      console.error('Redis cache error:', redisError)
    }

    return NextResponse.json(propertiesWithRating)
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/properties - Create a new property (host only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { title, description, price, location, images, categoryId, amenities } = await request.json()

    if (!title || !description || !price || !location || !categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      )
    }

    // Create property
    const property = await prisma.property.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        location,
        images: images || [],
        hostId: session.user.id,
        categoryId,
        amenities: {
          connect: amenities?.map((id: string) => ({ id })) || []
        }
      },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        category: true,
        amenities: true
      }
    })

    return NextResponse.json(property, { status: 201 })
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

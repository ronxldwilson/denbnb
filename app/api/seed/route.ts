import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    // Create categories
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { name: 'Beachfront' },
        update: {},
        create: { name: 'Beachfront' }
      }),
      prisma.category.upsert({
        where: { name: 'Cabin' },
        update: {},
        create: { name: 'Cabin' }
      }),
      prisma.category.upsert({
        where: { name: 'Apartment' },
        update: {},
        create: { name: 'Apartment' }
      }),
      prisma.category.upsert({
        where: { name: 'House' },
        update: {},
        create: { name: 'House' }
      }),
      prisma.category.upsert({
        where: { name: 'Loft' },
        update: {},
        create: { name: 'Loft' }
      })
    ])

    // Create amenities
    const amenities = await Promise.all([
      prisma.amenity.upsert({
        where: { name: 'WiFi' },
        update: {},
        create: { name: 'WiFi' }
      }),
      prisma.amenity.upsert({
        where: { name: 'Kitchen' },
        update: {},
        create: { name: 'Kitchen' }
      }),
      prisma.amenity.upsert({
        where: { name: 'Free parking' },
        update: {},
        create: { name: 'Free parking' }
      }),
      prisma.amenity.upsert({
        where: { name: 'Pool' },
        update: {},
        create: { name: 'Pool' }
      }),
      prisma.amenity.upsert({
        where: { name: 'Hot tub' },
        update: {},
        create: { name: 'Hot tub' }
      }),
      prisma.amenity.upsert({
        where: { name: 'Air conditioning' },
        update: {},
        create: { name: 'Air conditioning' }
      }),
      prisma.amenity.upsert({
        where: { name: 'Washer' },
        update: {},
        create: { name: 'Washer' }
      }),
      prisma.amenity.upsert({
        where: { name: 'Dryer' },
        update: {},
        create: { name: 'Dryer' }
      })
    ])

    // Create test users
    const users = await Promise.all([
      prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
          email: 'test@example.com',
          name: 'Test User',
          password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj0pJyxO6ZK'
        }
      }),
      prisma.user.upsert({
        where: { email: 'sarah@airbnb.com' },
        update: {},
        create: {
          email: 'sarah@airbnb.com',
          name: 'Sarah Johnson',
          password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj0pJyxO6ZK'
        }
      }),
      prisma.user.upsert({
        where: { email: 'mike@airbnb.com' },
        update: {},
        create: {
          email: 'mike@airbnb.com',
          name: 'Mike Chen',
          password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj0pJyxO6ZK'
        }
      }),
      prisma.user.upsert({
        where: { email: 'emma@airbnb.com' },
        update: {},
        create: {
          email: 'emma@airbnb.com',
          name: 'Emma Rodriguez',
          password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj0pJyxO6ZK'
        }
      })
    ])

    // Create sample properties
    const sampleProperties = [
      {
        title: 'Beautiful Beach House',
        description: 'Stunning beachfront property with ocean views and private access. Wake up to the sound of waves and enjoy sunset cocktails on the deck.',
        price: 250,
        location: 'Malibu, CA',
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'],
        categoryId: categories[0].id,
        hostId: users[Math.floor(Math.random() * users.length)].id,
        amenities: {
          connect: [{ id: amenities[0].id }, { id: amenities[1].id }, { id: amenities[2].id }, { id: amenities[3].id }]
        }
      },
      {
        title: 'Cozy Mountain Cabin',
        description: 'Perfect getaway in the mountains with stunning alpine views. Cozy fireplace, hot tub, and hiking trails right outside your door.',
        price: 180,
        location: 'Aspen, CO',
        images: ['https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=300&fit=crop'],
        categoryId: categories[1].id,
        hostId: users[Math.floor(Math.random() * users.length)].id,
        amenities: {
          connect: [{ id: amenities[0].id }, { id: amenities[1].id }, { id: amenities[4].id }]
        }
      },
      {
        title: 'Modern City Apartment',
        description: 'Contemporary apartment in the heart of the city with floor-to-ceiling windows and modern amenities. Walking distance to restaurants and attractions.',
        price: 150,
        location: 'New York, NY',
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'],
        categoryId: categories[2].id,
        hostId: users[Math.floor(Math.random() * users.length)].id,
        amenities: {
          connect: [{ id: amenities[0].id }, { id: amenities[1].id }, { id: amenities[5].id }]
        }
      },
      {
        title: 'Luxury Downtown Loft',
        description: 'Industrial-style loft with exposed brick, high ceilings, and city skyline views.',
        price: 220,
        location: 'San Francisco, CA',
        images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop'],
        categoryId: categories[4].id,
        hostId: users[Math.floor(Math.random() * users.length)].id,
        amenities: {
          connect: [{ id: amenities[0].id }, { id: amenities[1].id }, { id: amenities[5].id }]
        }
      },
      {
        title: 'Lakefront Cottage Paradise',
        description: 'Idyllic cottage with direct lake access, fishing dock, and panoramic water views.',
        price: 175,
        location: 'Lake Tahoe, CA',
        images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop'],
        categoryId: categories[3].id,
        hostId: users[Math.floor(Math.random() * users.length)].id,
        amenities: {
          connect: [{ id: amenities[0].id }, { id: amenities[1].id }, { id: amenities[2].id }]
        }
      },
      {
        title: 'Artsy Studio in SoHo',
        description: 'Creative studio space in the heart of SoHo with exposed brick walls.',
        price: 140,
        location: 'New York, NY',
        images: ['https://images.unsplash.com/photo-1495433324511-bf8e92934d90?w=400&h=300&fit=crop'],
        categoryId: categories[4].id,
        hostId: users[Math.floor(Math.random() * users.length)].id,
        amenities: {
          connect: [{ id: amenities[0].id }, { id: amenities[1].id }]
        }
      }
    ]

    for (const property of sampleProperties) {
      await prisma.property.upsert({
        where: {
          title_location: {
            title: property.title,
            location: property.location
          }
        },
        update: {},
        create: property
      })
    }

    return NextResponse.json({
      message: 'Database seeded successfully',
      categories: categories.length,
      amenities: amenities.length,
      users: users.length,
      properties: sampleProperties.length
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

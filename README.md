# Airbnb Clone

A full-stack Airbnb clone built with Next.js, PostgreSQL, Redis, and Docker. This project replicates core Airbnb functionality including property listings, user authentication, and booking management.

## 🚀 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis
- **Authentication**: NextAuth.js with credentials provider
- **Styling**: Tailwind CSS with Lucide React icons
- **Containerization**: Docker & Docker Compose

## 📋 Features

### ✅ Implemented
- **User Authentication**: Sign up and sign in with email/password
- **Property Listings**: Browse 6 diverse properties with images, ratings, and pricing
- **Database Integration**: PostgreSQL with Prisma ORM
- **API Routes**: RESTful APIs for properties and authentication
- **Redis Caching**: Cached property listings for improved performance
- **Responsive UI**: Modern, mobile-first design with Tailwind CSS
- **Docker Setup**: Containerized PostgreSQL and Redis services
- **Rich Seed Data**: 4 test users, 5 categories, 8 amenities, and 6 detailed property listings

### 🚧 Planned Features
- Property detail pages with booking forms
- Advanced search and filtering
- User dashboards and booking management
- Image upload functionality
- Reviews and ratings system
- Payment processing with Stripe
- Host dashboard for property management
- Real-time messaging between hosts and guests

## 🛠 Setup Instructions

### Prerequisites
- Docker Desktop installed and running
- Node.js 18+ installed
- npm or yarn package manager

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/ronxldwilson/denbnb.git
cd denbnb
npm install
```

### 2. Environment Configuration

Copy the `.env` file and update the values:

```bash
cp .env.example .env
```

The `.env` file should contain:
```env
# Database
DATABASE_URL="postgresql://airbnb_user:airbnb_pass@localhost:5432/airbnb_db?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
```

### 3. Start Docker Services

```bash
docker-compose up -d
```

This will start PostgreSQL and Redis containers.

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database with sample data
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 6. Test Accounts

After seeding, you can sign in with these test accounts:
- **test@example.com** / test123
- **sarah@airbnb.com** / test123
- **mike@airbnb.com** / test123
- **emma@airbnb.com** / test123

## 📁 Project Structure

```
airbnb/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication routes
│   │   │   ├── [...nextauth]/    # NextAuth configuration
│   │   │   └── signup/           # User registration
│   │   ├── properties/           # Property CRUD operations
│   │   └── seed/                 # Database seeding
│   ├── auth/                     # Authentication pages
│   │   ├── signin/               # Sign in page
│   │   └── signup/               # Sign up page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # React components
│   ├── Header.tsx                # Navigation header
│   ├── PropertyGrid.tsx          # Property listings grid
│   └── SearchBar.tsx             # Search functionality
├── lib/                          # Utility libraries
│   ├── auth.ts                   # NextAuth configuration
│   ├── prisma.ts                 # Database client
│   ├── providers.tsx             # Session provider
│   └── redis.ts                  # Redis client
├── prisma/                       # Database schema
│   └── schema.prisma             # Prisma schema definition
├── public/                       # Static assets
├── docker-compose.yml            # Docker services
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS config
└── tsconfig.json                # TypeScript configuration
```

## 🗄️ Database Schema

### Models
- **User**: User accounts with authentication
- **Property**: Property listings with details and images
- **Booking**: Reservation records
- **Review**: User reviews and ratings
- **Category**: Property categories (Beachfront, Cabin, etc.)
- **Amenity**: Property amenities (WiFi, Pool, etc.)

### Key Relationships
- User ↔ Property (Host relationship)
- User ↔ Booking (Guest relationship)
- Property ↔ Booking
- Property ↔ Review
- Property ↔ Category
- Property ↔ Amenity (Many-to-many)

### Sample Data
The database comes pre-seeded with:
- **4 Test Users**: Various host accounts with email/password authentication
- **5 Categories**: Beachfront, Cabin, Apartment, House, Loft
- **8 Amenities**: WiFi, Kitchen, Free parking, Pool, Hot tub, Air conditioning, Washer, Dryer
- **6 Properties**: Diverse listings across different locations and price ranges ($140-$250)

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login (via NextAuth)
- `GET/POST /api/auth/[...nextauth]` - NextAuth session handling

### Properties
- `GET /api/properties` - Get all properties (with caching)
- `POST /api/properties` - Create new property (authenticated)

### Database Management
- `POST /api/seed` - Seed database with sample data

## 🔐 Authentication

Uses NextAuth.js v4 with credentials provider:
- Email/password authentication
- JWT-based sessions
- Protected API routes
- Client-side session management

## 🚀 Deployment

### Docker Production Setup

```bash
# Build for production
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Variables for Production

```env
DATABASE_URL="postgresql://user:password@prod-db:5432/airbnb_db"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="strong-production-secret"
REDIS_URL="redis://redis:6379"
```

### Vercel Deployment

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy with PostgreSQL add-on
4. Configure Redis (Upstash or similar)

## 🧪 Testing

```bash
# Run tests (if implemented)
npm test

# Check database connection
npm run db:studio

# View Redis cache
docker exec -it airbnb_redis redis-cli

# Re-seed database
npm run db:seed
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 Development Notes

- **Database Migrations**: Use `npx prisma db push` for schema changes
- **Redis Caching**: Properties are cached for 5 minutes
- **Image Optimization**: Configured for external images from Unsplash
- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Code linting with Next.js rules

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database with [Prisma](https://prisma.io/)
- Authentication with [NextAuth.js](https://next-auth.js.org/)
- Icons from [Lucide React](https://lucide.dev/)

---

**Note**: This is a demonstration project and not intended for production use without additional security measures, testing, and optimizations.

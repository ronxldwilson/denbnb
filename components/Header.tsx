'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Search, Menu, User } from 'lucide-react'

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-red-500">airbnb</div>
          </Link>

          {/* Search Bar (Mobile) */}
          <div className="md:hidden">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Stays
            </Link>
            <Link href="/experiences" className="text-gray-700 hover:text-gray-900">
              Experiences
            </Link>
            <Link href="/host" className="text-gray-700 hover:text-gray-900">
              Become a host
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="animate-pulse h-8 w-8 bg-gray-200 rounded-full"></div>
            ) : session ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">{session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => signIn()}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Sign in
                </button>
                <Link
                  href="/auth/signup"
                  className="text-sm bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800"
                >
                  Sign up
                </Link>
              </div>
            )}

            <button className="p-2 rounded-full border border-gray-300 hover:shadow-md">
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const isFavorites = location.pathname === '/favorites';
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-purple-800 px-4 py-3 shadow-lg sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Home */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 font-extrabold text-2xl text-yellow-300 drop-shadow">
            <span role="img" aria-label="books">📚</span>
            Book Explorer
          </Link>
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            className="text-yellow-300 hover:text-yellow-400 focus:outline-none"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              // Close Icon
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <SignedIn>
            <Link
              to="/favorites"
              className={`
                flex items-center gap-1 px-5 py-2 rounded-full font-bold
                transition duration-150 shadow-lg border-2
                ${isFavorites
                  ? "bg-gradient-to-r from-yellow-400 to-pink-400 text-gray-900 border-yellow-400 scale-105"
                  : "bg-gray-950/70 hover:bg-yellow-400 hover:text-black text-yellow-300 border-yellow-400"}
              `}
              style={{
                boxShadow: isFavorites
                  ? '0 2px 12px 0 rgba(252,211,77,0.25)'
                  : undefined,
                letterSpacing: '0.03em'
              }}
            >
              <span role="img" aria-label="star">⭐</span>
              Favorites
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow transition">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="px-4 py-2 rounded-md bg-gray-950 border border-yellow-400 text-yellow-300 font-semibold shadow hover:bg-yellow-400 hover:text-black transition">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox: "ring-2 ring-yellow-400",
                }
              }}
            />
          </SignedIn>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`
          md:hidden transition-all duration-200 ease-in-out
          ${menuOpen ? 'max-h-96 opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}
          overflow-hidden
        `}
      >
        <div className="pt-2 pb-4 flex flex-col gap-3 items-start">
          <SignedIn>
            <Link
              to="/favorites"
              onClick={() => setMenuOpen(false)}
              className={`
                flex items-center gap-1 px-4 py-2 rounded-full font-bold ml-2
                transition duration-150 shadow-lg border-2
                ${isFavorites
                  ? "bg-gradient-to-r from-yellow-400 to-pink-400 text-gray-900 border-yellow-400 scale-105"
                  : "bg-gray-950/70 hover:bg-yellow-400 hover:text-black text-yellow-300 border-yellow-400"}
              `}
              style={{
                boxShadow: isFavorites
                  ? '0 2px 12px 0 rgba(252,211,77,0.25)'
                  : undefined,
                letterSpacing: '0.03em'
              }}
            >
              <span role="img" aria-label="star">⭐</span>
              Favorites
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="w-full mt-1 px-4 py-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow transition">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="w-full mt-1 px-4 py-2 rounded-md bg-gray-950 border border-yellow-400 text-yellow-300 font-semibold shadow hover:bg-yellow-400 hover:text-black transition">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <div className="ml-2 mt-1">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "ring-2 ring-yellow-400",
                  }
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
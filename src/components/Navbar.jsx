import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
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
        {/* Auth/Account Buttons */}
        <div className="flex items-center gap-4">
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
    </nav>
  );
}
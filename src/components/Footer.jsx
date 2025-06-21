import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-t from-gray-950 to-gray-900 text-gray-200 py-10 border-t border-gray-800 shadow-inner w-full">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-end md:justify-between gap-8">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-yellow-400 hover:text-yellow-300 mb-1 transition">
            <span role="img" aria-label="books">📚</span>
            Book Explorer
          </Link>
          <span className="text-sm text-gray-400 max-w-xs text-center md:text-left">
            Discover, search, and explore your next great read. Powered by Open Library.
          </span>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-6 text-base font-medium justify-center">
          <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          <a href="https://openlibrary.org/developers/api" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">Open Library API</a>
          <a href="https://github.com/martian58/book-explorer" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">GitHub</a>
        </nav>

        {/* Copyright & Social */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex gap-3 mb-2">
            <a href="https://github.com/martian58" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-yellow-400 transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.85 10.89.57.11.78-.25.78-.56 0-.28-.01-1.02-.02-2-3.19.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.19-3.07-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18A11.09 11.09 0 0112 6.84c.98.01 1.97.13 2.89.37 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.12 3.06.74.8 1.19 1.82 1.19 3.07 0 4.41-2.69 5.39-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.13 0 .31.2.68.79.56C20.71 21.37 24 17.08 24 12c0-6.35-5.15-11.5-12-11.5z"/></svg>
            </a>
            <a href="https://twitter.com/openlibrary" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-yellow-400 transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.56c-.88.39-1.83.64-2.82.76a4.92 4.92 0 002.15-2.71c-.95.56-2.03.97-3.17 1.19A4.92 4.92 0 0016.62 3c-2.72 0-4.93 2.2-4.93 4.92 0 .39.04.76.12 1.12C7.69 8.86 4.06 6.94 1.64 3.95c-.43.74-.68 1.61-.68 2.56 0 1.77.9 3.33 2.28 4.24-.83-.03-1.6-.25-2.28-.63v.06c0 2.47 1.76 4.53 4.09 5-.43.12-.88.18-1.34.18-.33 0-.64-.03-.95-.09.65 2.02 2.53 3.49 4.76 3.53A9.89 9.89 0 010 21.54a13.96 13.96 0 007.56 2.21c9.05 0 14.01-7.5 14.01-14v-.64c.96-.69 1.79-1.56 2.45-2.56z"/></svg>
            </a>
          </div>
          <span className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Book Explorer. Built by <a href="https://github.com/martian58" className="underline hover:text-yellow-400">martian58</a>.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
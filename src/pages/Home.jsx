import { useState, useEffect, useRef } from 'react';
import Book from '../components/Book';
import Footer from '../components/Footer';

function Home() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    fetchBooks('bestsellers');
    // eslint-disable-next-line
  }, []);

  const fetchBooks = async (searchQuery) => {
    setLoading(true);
    setError('');
    setSearched(true);
    try {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setBooks(data.docs.slice(0, 24));
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      setBooks([]);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    fetchBooks(query);
    inputRef.current.blur();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 to-gray-900">
      {/* Main content */}
      <main className="flex-1">
        {/* Hero / Search Section */}
        <section className="text-center py-16 px-4 bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-800 shadow-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg flex items-center justify-center gap-2">
            <span role="img" aria-label="books">📚</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400">
              Find Your Next Great Read
            </span>
          </h1>
          <p className="text-gray-200 mb-10 max-w-2xl mx-auto text-lg">
            Discover books by title, author, or keyword. Powered by the Open Library API.
          </p>
          {/* Search Input */}
          <div className="flex justify-center items-center gap-2 max-w-xl mx-auto relative">
            <input
              ref={inputRef}
              type="text"
              autoFocus
              className="flex-1 px-5 py-3 rounded-lg bg-gray-100 text-gray-900 text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              placeholder="Search books, authors, or keywords..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Search books"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-300 text-black font-bold rounded-lg transition duration-150 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label="Search"
            >
              <span className="hidden sm:inline">Search</span>
              <svg className="sm:hidden w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          {error && <p className="mt-3 text-red-400">{error}</p>}
        </section>

        {/* Books Section */}
        <section className="px-4 md:px-8 py-10 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              <span role="img" aria-label="books">📖</span>
              Books
            </h2>
            {books.length > 0 && (
              <span className="text-gray-400 text-sm font-medium">
                Showing {books.length} results
              </span>
            )}
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-44">
              <div className="w-14 h-14 border-4 border-yellow-400 border-dashed rounded-full animate-spin mb-2"></div>
              <p className="mt-1 text-yellow-300 font-semibold animate-pulse">Loading books...</p>
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-12">
              {books.map((book) => (
                <Book key={book.key} book={book} />
              ))}
            </div>
          ) : (
            searched && (
              <p className="text-center text-gray-400 text-lg py-16 animate-fade-in">
                No books found. Try another search!
              </p>
            )
          )}
        </section>
      </main>
      {/* Footer always at the bottom */}
      <Footer />
    </div>
  );
}

export default Home;
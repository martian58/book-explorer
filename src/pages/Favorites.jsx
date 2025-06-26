import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import Book from "../components/Book";
import Footer from "../components/Footer";

const BASE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Favorites() {
  const { getToken, isSignedIn } = useAuth();
  const [starredIds, setStarredIds] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch starred book IDs
  useEffect(() => {
    if (!isSignedIn) {
      setStarredIds([]);
      setBooks([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    getToken().then(token => {
      fetch(`${BASE_API_URL}/api/starred`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => setStarredIds(Array.isArray(data.books) ? data.books : []))
      .catch(() => setStarredIds([]))
      .finally(() => setLoading(false));
    });
  }, [isSignedIn, getToken]);

  // 2. Fetch book data for each starred ID (after IDs loaded)
  useEffect(() => {
    if (!starredIds.length) {
      setBooks([]);
      return;
    }
    setLoading(true);
    Promise.all(
      starredIds.map(id =>
        fetch(`https://openlibrary.org/works/${id}.json`)
          .then(res => res.ok ? res.json() : null)
          .then(data => {
            if (!data) return null;
            // Add cover_i field from covers array if possible
            const cover_i = Array.isArray(data.covers) && data.covers.length > 0 ? data.covers[0] : null;
            return { ...data, cover_i, key: `/works/${id}` };
          })
      )
    ).then(arr => setBooks(arr.filter(Boolean)))
    .finally(() => setLoading(false));
  }, [starredIds]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 to-gray-900">
      <main className="flex-1">
        <section className="text-center py-16 px-4 bg-gradient-to-br from-purple-950 via-indigo-900 to-indigo-800 shadow-xl mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-yellow-300 flex items-center justify-center gap-2">
            <span role="img" aria-label="star">⭐</span>
            Your Favorites
          </h1>
          <p className="text-gray-200 mb-2 max-w-2xl mx-auto text-lg">
            All the books you've starred appear here.
          </p>
        </section>
        <section className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-32">
              <div className="w-12 h-12 border-4 border-yellow-400 border-dashed rounded-full animate-spin mb-2"></div>
              <p className="text-yellow-300 font-semibold animate-pulse">Loading your favorites...</p>
            </div>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-12">
              {books.map(book => (
                <Book
                  key={book.key}
                  book={book}
                  isStarred={true}
                  onStarChange={starred => {
                    // Optimistically remove from UI if unstarred
                    if (!starred) setBooks(bks => bks.filter(b => b.key !== book.key));
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-lg py-16 animate-fade-in">
              You have no favorite books yet.
            </p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Favorites;
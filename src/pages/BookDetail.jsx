import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch book details and then authors
  useEffect(() => {
    setLoading(true);
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        const data = await res.json();
        setBook(data);

        // Fetch author details if present
        if (data.authors && Array.isArray(data.authors)) {
          const authorPromises = data.authors
            .slice(0, 4)
            .map(async (authorObj) => {
              const key = authorObj.author && authorObj.author.key;
              if (!key) return null;
              const res = await fetch(`https://openlibrary.org${key}.json`);
              const authorData = await res.json();
              return authorData;
            });
          const authorDetails = await Promise.all(authorPromises);
          setAuthors(authorDetails.filter(Boolean));
        } else {
          setAuthors([]);
        }
      } catch (err) {
        setBook(null);
        setAuthors([]);
        // Optionally set error state here
      }
      setLoading(false);
    };
    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-lg text-gray-300">Book not found.</p>
      </div>
    );
  }

  const cover = book.covers && book.covers.length
    ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
    : 'https://ui-avatars.com/api/?name=Book&background=6c63ff&color=fff&size=300&font-size=0.55&rounded=true';

  // Convert description to string
  const description =
    typeof book.description === 'string'
      ? book.description
      : (book.description?.value || '');

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white px-4 py-10">
      <Link
        to="/"
        className="text-yellow-400 hover:underline hover:text-yellow-300 mb-8 inline-block text-base font-semibold tracking-tight"
      >
        ← Back to Home
      </Link>

      <div className="flex flex-col lg:flex-row gap-12 mx-auto max-w-5xl">
        <div className="flex-shrink-0 w-full max-w-xs mx-auto">
          <img
            src={cover}
            alt={book.title}
            className="w-full rounded-2xl shadow-2xl object-cover aspect-[3/4] bg-gray-800"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight text-gradient bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">
            {book.title}
          </h1>

          {description && (
            <p className="text-gray-200 mb-7 text-lg leading-relaxed border-l-4 border-yellow-400 pl-4">
              {description}
            </p>
          )}

          <div className="space-y-3 mt-2 text-base">
            <p>
              <span className="font-semibold text-yellow-400">First Published:</span>{' '}
              <span className="text-gray-200">
                {book.first_publish_date || book.created?.value?.slice(0, 10) || 'Unknown'}
              </span>
            </p>

            {book.subjects && (
              <p>
                <span className="font-semibold text-yellow-400">Subjects:</span>{' '}
                <span className="text-gray-300">
                  {book.subjects.slice(0, 8).join(', ')}
                </span>
              </p>
            )}

            {authors.length > 0 && (
              <p className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-yellow-400">Authors:</span>
                {authors.map((author, i) => (
                  <span
                    key={author.key || i}
                    className="bg-yellow-400/90 text-gray-900 px-3 py-0.5 rounded-full text-sm font-medium shadow"
                  >
                    {author.name}
                  </span>
                ))}
              </p>
            )}
          </div>

          {/* Extra: links */}
          {book.links && Array.isArray(book.links) && (
            <div className="mt-6">
              <span className="font-semibold text-yellow-400">Links:</span>
              <ul className="list-disc list-inside ml-3 mt-1">
                {book.links.slice(0, 3).map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:underline"
                    >
                      {link.title || link.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default BookDetail;
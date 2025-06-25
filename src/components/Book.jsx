import { useState } from 'react';
import { Link } from 'react-router-dom';

// Star icon for favorites
function StarButton({ isFavorite, onClick }) {
  return (
    <button
      type="button"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className={`absolute top-2 right-2 z-10 bg-black/50 rounded-full p-1.5 shadow transition
        ${isFavorite ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}
        focus:outline-none focus:ring-2 focus:ring-yellow-400`}
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      tabIndex={0}
    >
      <svg
        className="w-6 h-6"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          d="M12 17.77l-6.18 3.73 1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63 7.19.61-5.46 5.23 1.64 7.03z"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function Book({ book }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : 'https://ui-avatars.com/api/?name=Book&background=6c63ff&color=fff&size=320&font-size=0.50&rounded=true';

  const id = book.key.split('/').pop();

  // Demo rating algorithm - consider using real data if available
  const rating = Math.min(5, Math.max(1, (book.title.length + (book.author_name?.[0]?.length || 0)) % 6));

  const tooltipText = [
    book.title,
    `Author: ${book.author_name?.join(', ') ?? 'Unknown'}`,
    `Published: ${book.first_publish_year ?? 'N/A'}`
  ].join('\n');

  const authors = book.author_name?.slice(0, 2) || [];

  // Responsive card with favorite
  return (
    <div className="w-full max-w-xs sm:max-w-[320px] md:max-w-[360px] flex">
      <Link
        to={`/book/${id}`}
        title={tooltipText}
        tabIndex={0}
        aria-label={`View details for ${book.title}`}
        className="group bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-950 border border-gray-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform transition hover:scale-105 duration-200 w-full flex flex-col relative"
        style={{
          minHeight: 420,
          outline: 'none'
        }}
      >
        <div className="w-full aspect-[2/3] bg-black relative">
          <img
            src={cover}
            alt={book.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
          {/* Star/Favorite Button */}
          <StarButton
            isFavorite={isFavorite}
            onClick={() => setIsFavorite(fav => !fav)}
          />
        </div>
        <div className="p-4 md:p-5 flex-1 flex flex-col">
          <h2 className="text-lg md:text-xl font-bold text-white mb-1 line-clamp-2 min-h-[2.5rem] tracking-tight">
            {book.title}
          </h2>
          {authors.length > 0 ? (
            <div className="flex flex-wrap gap-1 mt-1">
              {authors.map((author, idx) => (
                <span
                  key={idx}
                  className="bg-yellow-400/90 text-gray-900 text-xs font-semibold px-2 py-0.5 rounded-full shadow"
                >
                  {author}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 mt-1">Unknown Author</p>
          )}
          <div className="mt-2 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 md:w-5 md:h-5 ${i < rating ? 'text-yellow-400 drop-shadow' : 'text-gray-700'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.163 3.573a1 1 0 00.95.69h3.755c.969 0 1.371 1.24.588 1.81l-3.037 2.204a1 1 0 00-.364 1.118l1.163 3.573c.3.921-.755 1.688-1.538 1.118l-3.037-2.204a1 1 0 00-1.175 0l-3.037 2.204c-.783.57-1.838-.197-1.538-1.118l1.163-3.573a1 1 0 00-.364-1.118L2.293 8.998c-.783-.57-.38-1.81.588-1.81h3.755a1 1 0 00.95-.69l1.163-3.573z" />
              </svg>
            ))}
          </div>
          <div className="mt-2 text-xs text-gray-400 flex-1 flex items-end">
            {book.first_publish_year && (
              <span>First published: {book.first_publish_year}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Book;
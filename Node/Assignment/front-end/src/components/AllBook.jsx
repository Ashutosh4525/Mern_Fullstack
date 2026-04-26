import { useDeferredValue, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../lib/api";

function BooksList({ searchTerm = "", authorId = "", emptyMessage = "No books found." }) {
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const deferredSearchTerm = useDeferredValue(searchTerm.trim());

  useEffect(() => {
    let ignore = false;

    const fetchBooks = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const query = new URLSearchParams();
        if (deferredSearchTerm) {
          query.set("search", deferredSearchTerm);
        }
        if (authorId) {
          query.set("authorID", authorId);
        }

        const path = query.toString() ? `/books/getbooks?${query.toString()}` : "/books/getbooks";
        const result = await apiFetch(path);

        if (!ignore) {
          setBooks(result.data || []);
        }
      } catch (error) {
        if (!ignore) {
          if (error.message === "No Book Found") {
            setBooks([]);
          } else {
            setErrorMessage(error.message || "Unable to load books.");
          }
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchBooks();

    return () => {
      ignore = true;
    };
  }, [authorId, deferredSearchTerm]);

  if (isLoading) {
    return <div className="page-message">Loading books...</div>;
  }

  if (errorMessage) {
    return <div className="alert alert-error">{errorMessage}</div>;
  }

  if (!books.length) {
    return <div className="empty-state">{emptyMessage}</div>;
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <Link key={book._id} to={`/books/${book._id}`} className="book-card">
          <div className="book-cover">
            <img src={book.coverImage?.cloudinary?.url} alt={book.title} />
          </div>
          <div className="book-card__body">
            <h3>{book.title}</h3>
            <p>{book.authorID ? `${book.authorID.firstname || ""} ${book.authorID.lastname || ""}`.trim() : "Unknown author"}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BooksList;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch, createAuthHeaders } from "../lib/api";
import { useAuth } from "../context/useAuth";

const SingleBook = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchBook = async () => {
      try {
        const result = await apiFetch(`/books/getbooks/${id}`, {
          headers: createAuthHeaders(user?.token),
        });

        if (!ignore) {
          setBook(result.data);
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(error.message || "Unable to load book.");
        }
      }
    };

    if (id && user?.token) {
      fetchBook();
    }

    return () => {
      ignore = true;
    };
  }, [id, user?.token]);

  if (errorMessage) {
    return <div className="page-shell"><div className="alert alert-error">{errorMessage}</div></div>;
  }

  if (!book) {
    return <div className="page-message">Loading book...</div>;
  }

  return (
    <main className="page-shell">
      <div className="content-panel">
        <div className="book-detail">
          <div className="book-detail__cover">
            <img src={book.coverImage?.cloudinary?.url} alt={book.title} />
          </div>
          <div className="book-detail__content">
            <h1>{book.title}</h1>
            <p className="meta-text">
              {book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : "No date"}
            </p>
            <div className="info-card">
              <h3>Author</h3>
              {book.authorID ? (
                <Link className="text-link author-link" to={`/authors/${book.authorID._id}`}>
                  {`${book.authorID.firstname || ""} ${book.authorID.lastname || ""}`.trim()}
                </Link>
              ) : (
                <p>Unknown author</p>
              )}
              {book.authorID?.bio && <p>{book.authorID.bio}</p>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleBook;

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../lib/api";

function AuthorBooks() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchAuthor = async () => {
      try {
        const result = await apiFetch(`/authors/${id}`);
        if (!ignore) {
          setAuthor(result.data.author || null);
          setBooks(result.data.books || []);
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(error.message || "Unable to load author.");
        }
      }
    };

    if (id) {
      fetchAuthor();
    }

    return () => {
      ignore = true;
    };
  }, [id]);

  if (errorMessage) {
    return <main className="page-shell"><div className="alert alert-error">{errorMessage}</div></main>;
  }

  if (!author) {
    return <div className="page-message">Loading author...</div>;
  }

  return (
    <main className="page-shell">
      <section className="content-panel">
        <div className="section-row">
          <div className="section-heading">
            <h1>{`${author.firstname} ${author.lastname}`}</h1>
            {author.bio && <p>{author.bio}</p>}
          </div>
          <button className="btn btn-secondary" type="button" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>

        {!books.length ? (
          <div className="empty-state">No books found for this author.</div>
        ) : (
          <div className="book-grid">
            {books.map((book) => (
              <Link key={book._id} to={`/books/${book._id}`} className="book-card">
                <div className="book-cover">
                  <img src={book.coverImage?.cloudinary?.url} alt={book.title} />
                </div>
                <div className="book-card__body">
                  <h3>{book.title}</h3>
                  <p>{book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : "No date"}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default AuthorBooks;

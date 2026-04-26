import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { apiFetch, createAuthHeaders } from "../lib/api";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const result = await apiFetch("/books/getbooks");
      setBooks(result.data || []);
    } catch (error) {
      setErrorMessage(error.message || "Unable to load books.");
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fetchBooks();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleDelete = async (bookId) => {
    if (!window.confirm("Delete this book?")) {
      return;
    }

    try {
      await apiFetch(`/books/softdelete/${bookId}`, {
        method: "DELETE",
        headers: createAuthHeaders(user?.token),
      });
      fetchBooks();
    } catch (error) {
      setErrorMessage(error.message || "Unable to delete book.");
    }
  };

  return (
    <main className="page-shell">
      <section className="content-panel">
        <div className="section-row">
          <div className="section-heading">
            <p className="section-kicker">Admin panel</p>
            <h2>Manage books</h2>
            <p>Review existing books, edit details, or soft delete records.</p>
          </div>
          <Link className="btn btn-secondary" to={`/dashboard/${user?._id || user?.id}`}>Back to dashboard</Link>
        </div>

        {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Cover</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>
                    <img className="table-avatar table-cover" src={book.coverImage?.cloudinary?.url} alt={book.title} />
                  </td>
                  <td>{book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : "Not set"}</td>
                  <td className="table-actions">
                    <button className="btn btn-danger" onClick={() => handleDelete(book._id)}>Delete</button>
                    <button className="btn btn-secondary" onClick={() => navigate(`/admin/edit-book/${book._id}`)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

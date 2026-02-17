import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const { user } = useAuth();

  const fetchBooks = () => {
    fetch("http://localhost:8000/api/v1/books/getbooks")
      .then(res => res.json())
      .then(result => setBooks(result.data));
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleDelete = async (bookId) => {
    if (window.confirm("Delete this book?")) {
      await fetch(`http://localhost:8000/api/v1/books/softdelete/${bookId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${user.token}` }
      });
      fetchBooks();
    }
  };

  return (
    <table>
      <thead>
        <tr><th>Title</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {books.map(book => (
          <tr key={book._id}>
            <td>{book.title}</td>
            <td>
              <button onClick={() => handleDelete(book._id)}>Delete</button>
              <button onClick={() => navigate(`/admin/edit-book/${book._id}`)}>
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
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
        <tr><th>Title</th><th>Image</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {books.map(book => (
          <tr key={book._id}>
            <td>{book.title}</td>
            <td><img style={{height:"100px"}} src={book.coverImage.cloudinary.url} alt="" /></td>
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

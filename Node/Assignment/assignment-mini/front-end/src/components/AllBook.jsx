import { useEffect, useState } from "react";

export default function BooksList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Calling your getAllBook controller
    fetch("http://localhost:8000/api/v1/books/getbooks")
      .then((res) => res.json())
      .then((result) => setBooks(result.data || []));
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
      {books.map((book) => (
        <div key={book._id} style={{ border: "1px solid #ccc", padding: "10px" }}>
          <img src={book.coverImage.cloudinary.url} alt={book.title} style={{ width: "100%", height:"400px" }} />
          <h3>{book.title}</h3>
          <p>{book.description}</p>
        </div>
      ))}
    </div>
  );
}

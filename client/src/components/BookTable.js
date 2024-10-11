import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // if using react-router for navigation

const BookTable = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Fetch books from the API
  const fetchBooks = async () => {
    try {
      const response = await axios.get('/books'); // Adjust the URL if needed
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/books/${id}`);
      fetchBooks(); // Refresh the book list after deletion
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Navigate to edit page
  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // Navigate to the edit page
  };

  // Navigate to view page
  const handleView = (id) => {
    navigate(`/book/${id}`); // Navigate to the view page
  };

  return (
    <div>
      <h1>Books</h1>
      <button onClick={() => navigate('/add')}>Create Book</button> {/* Button to create a new book */}
      {books.length===0?(<h2>No books found</h2>):(<table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button onClick={() => handleView(book._id)}>View</button>
                <button onClick={() => handleEdit(book._id)}>Edit</button>
                <button onClick={() => handleDelete(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    </div>
  );
};

export default BookTable;

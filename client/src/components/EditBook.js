// EditBook.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const navigate = useNavigate(); // For navigation
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Fetch the book details when the component mounts
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/books/${id}`);
        const book = response.data;
        setTitle(book.title);
        setAuthor(book.author);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/books/${id}`, { title, author });
      navigate('/'); // Redirect to the book list after editing
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Book</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <button type="submit">Update Book</button>
    </form>
  );
};

export default EditBook;

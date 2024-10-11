// ViewBook.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewBook = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const navigate = useNavigate(); // For navigation
  const [book, setBook] = useState(null);

  // Fetch the book details when the component mounts
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id]);

  // Handle back button click
  const handleBack = () => {
    navigate('/'); // Redirect to the book list
  };

  if (!book) return <p>Loading...</p>; // Show loading while fetching

  return (
    <div>
      <h1>{book.title}</h1>
      <h2>Author: {book.author}</h2>
      <button onClick={handleBack}>Back to Books</button>
    </div>
  );
};

export default ViewBook;

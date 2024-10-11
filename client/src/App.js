import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookTable from './components/BookTable';
import AddBook from './components/AddBook'; // Component for adding a book
import EditBook from './components/EditBook'; // Component for editing a book
import ViewBook from './components/ViewBook'; // Component for viewing a book

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<BookTable/>} />
        <Route path="/add" element={<AddBook/>} />
        <Route path="/edit/:id" element={<EditBook/>} />
        <Route path="/book/:id" element={<ViewBook/>} />
      </Routes>
    </Router>
  );
};

export default App;

const router = require("express").Router();
const Book = require("../models/Book");

router.post("/", async (req, res) => {
  try {
    const newBook = new Book(req.body);

    const book = await newBook.save();
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.put("/:id", async (req, res) => {
  try {
    // Find the book by ID and update it with the new data
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,       // The ID from the URL parameter
      req.body,            // The updated data
      { new: true }        // Return the updated document
    );

    // If the book is not found, return a 404 error
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Send the updated book as a response
    res.status(200).json(updatedBook);
  } catch (err) {
    // Handle errors and send a 500 response
    res.status(500).json({ message: "Error updating the book", error: err });
  }
});

// DELETE request to delete a book by its ID
router.delete("/:id", async (req, res) => {
  try {
    // Find the book by ID and delete it
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    // If the book is not found, return a 404 error
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Send success message with the deleted book's information
    res.status(200).json({ message: "Book deleted successfully", book: deletedBook });
  } catch (err) {
    // Handle errors and send a 500 response
    res.status(500).json({ message: "Error deleting the book", error: err });
  }
});


// GET request to fetch all books
router.get("/", async (req, res) => {
  try {
    // Find all books in the collection
    const books = await Book.find();

    // Send the list of books as the response
    res.status(200).json(books);
  } catch (err) {
    // Handle errors and send a 500 response
    res.status(500).json({ message: "Error fetching books", error: err });
  }
});


// GET request to fetch a book by its ID
router.get("/:id", async (req, res) => {
  try {
    // Find the book by ID
    const book = await Book.findById(req.params.id);

    // If the book is not found, return a 404 error
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Send the book as the response
    res.status(200).json(book);
  } catch (err) {
    // Handle errors and send a 500 response
    res.status(500).json({ message: "Error fetching the book", error: err });
  }
});

module.exports = router;

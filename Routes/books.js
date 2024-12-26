const express = require('express');
const router = express.Router();
const Book = require('../Routes/authors');
const Author = require('../Routes/borrowers');

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find().populate('author');
        res.status(200).send(books);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get a book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author');
        if (!book) {
            return res.status(404).send('Book not found');
        }
        res.status(200).send(book);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Post a new book
router.post('/', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;

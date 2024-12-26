const express = require('express');
const router = express.Router();
const Borrower = require('../Routes/borrowers');
const Book = require('../Routes/books');

// Get all borrowers
router.get('/', async (req, res) => {
    try {
        const borrowers = await Borrower.find().populate('borrowedBooks');
        res.status(200).send(borrowers);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get a borrower by ID
router.get('/:id', async (req, res) => {
    try {
        const borrower = await Borrower.findById(req.params.id).populate('borrowedBooks');
        if (!borrower) {
            return res.status(404).send('Borrower not found');
        }
        res.status(200).send(borrower);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Post a new borrower
router.post('/', async (req, res) => {
    try {
        const borrower = new Borrower(req.body);
        await borrower.save();
        res.status(201).send(borrower);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Borrow a book
router.post('/borrow/:bookId/:borrowerId', async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        const borrower = await Borrower.findById(req.params.borrowerId);

        if (!book || !borrower) {
            return res.status(404).send('Book or Borrower not found.');
        }

        if (book.borrowCount >= 10) {
            return res.status(400).send('This book cannot be borrowed more than 10 times.');
        }

        if (book.availableCopies <= 0) {
            return res.status(400).send('No available copies of this book.');
        }

        book.availableCopies -= 1;
        book.borrowCount += 1;
        borrower.borrowedBooks.push(book._id);

        await book.save();
        await borrower.save();

        res.send('Book borrowed successfully.');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;

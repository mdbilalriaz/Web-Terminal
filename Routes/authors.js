const express = require('express');
const router = express.Router();
const Author = require('../server');

// Get all authors
router.get('/', async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).send(authors);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get an author by ID
router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).send('Author not found');
        }
        res.status(200).send(author);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Post a new author
router.post('/', async (req, res) => {
    try {
        const author = new Author(req.body);
        await author.save();
        res.status(201).send(author);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;

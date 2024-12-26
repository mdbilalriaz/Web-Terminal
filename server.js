const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/LibraryManagement')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.use(express.json());
app.use(cors());

// Import route files
const booksRoutes = require('./Routes/books');
const authorsRoutes = require('./Routes/authors');
const borrowersRoutes = require('./Routes/borrowers');

// Use routes
app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);
app.use('/borrowers', borrowersRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

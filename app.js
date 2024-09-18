const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

// Initialize the app
const app = express();

// Set up MongoDB connection
mongoose.connect('mongodb://localhost/blogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// App Configuration
app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(bodyParser.urlencoded({ extended: true })); // Parse incoming requests with URL-encoded payloads
app.use(methodOverride('_method')); // Support PUT and DELETE requests via forms

// Import routes
const blogRoutes = require('./routes/blogs');
app.use('/blogs', blogRoutes); // Use blog routes for `/blogs` URL

// Redirect the root to the blogs index
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

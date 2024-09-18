const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Index Route: Display all blog posts
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.render('index', { blogs });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
});

// New Route: Show form to create a new blog post
router.get('/new', (req, res) => {
    res.render('new');
});

// Create Route: Add new blog post to the database
router.post('/', async (req, res) => {
    try {
        const newBlog = req.body.blog;
        await Blog.create(newBlog);
        res.redirect('/blogs');
    } catch (err) {
        console.log(err);
        res.render('new');
    }
});

// Show Route: Show a specific blog post by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.render('show', { blog });
    } catch (err) {
        console.log(err);
        res.redirect('/blogs');
    }
});

// Edit Route: Show form to edit a blog post
router.get('/:id/edit', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.render('edit', { blog });
    } catch (err) {
        console.log(err);
        res.redirect('/blogs');
    }
});

// Update Route: Update a specific blog post
router.put('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndUpdate(req.params.id, req.body.blog);
        res.redirect(`/blogs/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.redirect('/blogs');
    }
});

// Delete Route: Delete a specific blog post
router.delete('/:id', async (req, res) => {
    try {
        await Blog.findByIdAndRemove(req.params.id);
        res.redirect('/blogs');
    } catch (err) {
        console.log(err);
        res.redirect('/blogs');
    }
});

module.exports = router;

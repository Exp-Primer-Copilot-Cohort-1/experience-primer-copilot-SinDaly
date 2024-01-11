// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create an express app
const app = express();

// Enable cors
app.use(cors());

// Parse the json body
app.use(bodyParser.json());

// Store all comments
const commentsByPostId = {};

// Get all comments for a post
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Add a new comment to a post
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    // Get all comments for a post
    const comments = commentsByPostId[req.params.id] || [];

    // Add the new comment
    comments.push({ id: commentId, content, status: 'pending' });

    // Store all comments
    commentsByPostId[req.params.id] = comments;

    // Emit a comment created event
    res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
    console.log('Listening on 4001');
});
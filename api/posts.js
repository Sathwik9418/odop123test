// api/posts.js
const mongoose = require('mongoose');
const Post = require('../models/Post');

// MongoDB connection string
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = (req, res) => {
    if (req.method === 'GET') {
        Post.find()
            .then(posts => res.status(200).json(posts))
            .catch(error => res.status(500).json({ error }));
    } else if (req.method === 'POST') {
        const { title, content } = req.body;
        const newPost = new Post({ title, content });
        newPost.save()
            .then(post => res.status(201).json(post))
            .catch(error => res.status(400).json({ error }));
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

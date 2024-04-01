const express = require('express');
const router = express.Router();
const Movie = require('../model/movieschema'); // Assuming your Movie model is defined in a separate file

// Route to create a new comment for a post
router.post('/movie/:id/post/:postid/comment', async (req, res) => {
  const { id, postid } = req.params;
  const { content ,author} = req.body;

  try {
    // Find the movie by ID
    const movie = await Movie.findOne({ id });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Find the post within the movie's posts array by post ID
    const post = movie.posts.find((p) => p.id === postid);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Add the new comment to the post's comments array
    post.comments.push({ content ,author});

    // Save the updated movie document
    await movie.save();

    res.status(201).json({ message: 'Comment created successfully', post });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

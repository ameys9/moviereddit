const express = require('express');
const router = express.Router();
const Movie = require('../model/movieschema');

router.post('/movie/:id/post', async (req, res) => {
    const { id } = req.params;
    const { title, content , author} = req.body;
  
    try {
      // Find the movie by ID
      const movie = await Movie.findOne({ id });
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      // Create a new post object
      const newPost = {
        id: generatePostId(), // You can generate a unique post ID here
        title,
        content,
        author,
      };
  
      // Add the new post to the movie's posts array
      movie.posts.push(newPost);
  
      // Save the updated movie document
      await movie.save();
  
      res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Helper function to generate a unique post ID (you can implement your own logic here)
  function generatePostId() {
    return Math.random().toString(36).substring(7);
  }
  
  module.exports = router;
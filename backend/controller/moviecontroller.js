const express = require('express');
const router = express.Router();
const Movie = require('../model/movieschema');

router.get('/movie', async (req, res) => {
  try {
    const moviesData = await Movie.find();
    res.json(moviesData);
  } catch (err) {
    console.error('Error fetching movies:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/movie/:id', async (req, res) => {
  const { id } = req.params;
   console.log('rwer')
  try {
    const movie = await Movie.findOne({ id: id });
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (err) {
    console.error('Error fetching movie by ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/movie/:id/post/:postid', async (req, res) => {
   const { id , postid } = req.params;

  try {
    const movie = await Movie.findOne({id:id});
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    const post = movie.posts.find(postOBj => postOBj.id === postid);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching postewe:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;

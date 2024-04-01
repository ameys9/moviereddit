const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the comment schema for comments within a post
const commentSchema = new Schema({
  id: String,
  content: String,
  author : String,
  
});

// Define the post schema for posts within the movie's posts array
const postSchema = new Schema({
  id: String,
  title: String,
  content: String,
  author: String,
 
  comments: [commentSchema] // Array of comments subdocuments
});

// Define the movie schema
const movieSchema = new Schema({
  id: String,
  title: String,
  genre: String,
  cast: [String],
  director: String,
  releaseDate: Date,
  rating: Number,
  posts: [postSchema] // Array of posts subdocuments
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

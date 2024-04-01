const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection URI
    const uri = 'mongodb://localhost:27017/moviedis';

    // Connect to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

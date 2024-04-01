const express = require('express');
const connectDB = require('./config/config.js');
const movieRoutes = require('./controller/moviecontroller.js');
const userRoutes = require('./controller/usercontroller.js');
const commentRoutes = require('./controller/commentcontroller.js');
const postRoutes = require('./controller/postcontroller.js');
const cors = require('cors');
const app = express();


connectDB();
app.use(express.json()); // Parse JSON bodies
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use('/api' , movieRoutes);
app.use('/api' , userRoutes);
app.use('/api' , commentRoutes);
app.use('/api' , postRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



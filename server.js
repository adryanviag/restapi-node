const express = require('express');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./config.js');

// ! routes
const postsRoutes = require('./routes/api/posts.js');

const app = express();

// ! middleware
app.use(express.json());

// ! Connecting to DB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => console.log(err));

app.use('/api/posts', postsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

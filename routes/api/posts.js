const express = require('express');
const router = express.Router();

// ! posts models
const Posts = require('../../models/Post.js');

// ! '/api/posts' GET request (get posts)
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find();
    if (!posts) throw Error('no items.');

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// ! '/api/posts' POST request (create a post)
router.post('/', async (req, res) => {
  const newPost = new Posts(req.body);

  try {
    const post = await newPost.save();
    if (!post) throw Error('something went wrong');

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// ! '/api/posts/:id' DELETE request (delete a post)
router.delete('/:id', async (req, res) => {
  try {
    const post = await Posts.findByIdAndDelete(req.params.id);
    if (!post) throw Error('No post found.');

    res.status(200).json({ message: 'post deleted.' });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// ! '/api/posts/:id' UPDATE request (update a post)
router.patch('/:id', async (req, res) => {
  try {
    const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
    if (!post) throw Error('Something went wrong when updating');

    res.status(200).json({ message: 'post updated' });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// ! '/api/posts/:id' GET request (get a specific post)
router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) throw Error('error occured.');

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: 'error' });
  }
});

module.exports = router;

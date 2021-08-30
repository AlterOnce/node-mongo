const express = require('express');
const Post = require('../models/post');

const router = new express.Router();

router.post('/posts', async (req, res) => {
  const post = new Post(req.body);

  try {
    await post.save();
    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/posts/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const post = await Post.findById(_id);

    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (e) {
    res.status(404).send();
  }
});

router.patch('/posts/:id', async (req, res) => {
  const _id = req.params.id;
  const updates = req.body;

  try {
    const result = await Post.updateOne({ _id: _id }, { ...updates });

    res.send(result);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete('/posts/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const result = await Post.findOneAndDelete({ _id: _id });

    res.send(result);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;

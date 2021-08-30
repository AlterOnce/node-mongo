const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/users/profile', auth, async (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    user.tokens = user.tokens.concat({ token });

    await user.save();

    res.send('login succeeded');
  } catch (e) {
    res.status(400).send();
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );

    await req.user.save();

    res.status(200).send();
  } catch (e) {
    console.log('error', e);
    res.send(500);
  }
});

module.exports = router;

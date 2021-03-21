const express = require('express');
const router = express.Router();
const User = require('../models/user');

router
.route('/')
.get(async (req, res) => {
    const queryUsername = req.query.user_name;
    const queryPassword = req.query.password;
    const user = await User.findOne( {
      user_name: queryUsername,
      password: queryPassword
    }, function (err) {
      if (err) {
          res.status(400)
          return res.json({ error: 'Invalid user input'})
      }
    })

    if (user === null) {
      res.status(400)
      return res.json({ error: 'Invalid input or no such user exists' })
    }

    return res.json({ user });
})
.post(async (req, res) => {
    const queryUsername = req.query.user_name;
    const queryPassword = req.query.password;
    if (!queryUsername || !queryPassword) {
      res.status(400)
      return res.json({ error: 'Invalid input' });
    }

    let existingUser = null;
    try {
      existingUser = await User.findOne( {
          user_name: queryUsername
      });
    } catch {
      res.status(400)
      return res.json({ error: 'Promise rejected' })
    }
    if (existingUser !== null) {
      res.status(400)
      return res.json({ error: 'Username already exists' })
    }
    const user = new User({
      user_name: queryUsername,
      password: queryPassword
    })

    const newUser = await User.create(user);

    return res.json({ user: newUser });
  }

)



module.exports = router;

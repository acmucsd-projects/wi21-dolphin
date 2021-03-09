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
          res.status(400).json({ error: 'Invalid user input'})
      }
    })

    if (user === null) {
      res.status(400).json({ error: 'Invalid input or no such user exists' })
    }

    res.status(200).json({ user });
})
.post(async (req, res) => {
    const queryUsername = req.query.user_name;
    const queryPassword = req.query.password;
    if (!queryUsername || !queryPassword) {
      res.status(400).json({ error: 'Invalid input' });
    }
    const existingUser = await User.findOne( {
        user_name: queryUsername
    }, function (err) {
      if (err) {
          res.status(400).json({ error: 'Invalid user input' })
      }
    })

    if (existingUser !== null) {
      res.status(400).json({ error: 'Username already exists' })
    }
    const user = new User({
      user_name: queryUsername,
      password: queryPassword
    })

    const newUser = await User.create(user);

    res.status(200).json({ user: newUser });

})



module.exports = router;

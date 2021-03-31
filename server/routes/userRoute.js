const express = require('express');
const router = express.Router();
const User = require('../models/user');
const utils = require('../utils');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const corsOptions = {
  origin: "https://quizzical-brattain-02ca66.netlify.app"
}

router
.get('/', cors(corsOptions), async (req, res) => {
    const queryUsername = req.query.user_name;
    const user = await User.findOne( {
      user_name: queryUsername,
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
.post('/', cors(corsOptions), async (req, res) => {
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
.post('/signin', cors(corsOptions), async function(req, res) {
  const user = req.query.user;
  const pwd = req.query.pwd;
  // return 400 status if username/password is not exist
  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password is required."
    });
  }

  const userData = await User.findOne( {
    user_name: user,
    password: pwd
  }, function (err) {
    if (err) {
        res.status(400)
        return res.json({ error: 'Invalid user input'})
    }
  })

  if (user === null || userData === null || userData.user_name === null || userData.password === null) {
    res.status(400)
    return res.json({ error: 'Invalid input or no such user exists' })
  }
 
  // return 401 status if the credential is not match.
  if (user !== userData.user_name || pwd !== userData.password) {
    return res.status(401).json({
      error: true,
      message: "Username or Password is wrong."
    });
  }
 
  // generate token
  const token = utils.generateToken(userData);
  // get basic user details
  const userObj = utils.getCleanUser(userData);
  // return the token along with user details
  return res.json({ user: userObj, token });

})
.get('/verifyToken', cors(corsOptions), function(req, res) {
  const token = req.query.token;

  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }

  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, async function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });
  
    if (user === null) {
      res.status(400)
      return res.json({ error: 'Invalid input or no such user exists' })
    }

    const userData = await User.findOne( {
      user_name: user.username,
    }, function (error) {
      if (error) {
          res.status(400)
          return res.json({ error: 'Invalid user input'})
      }
    })
 
    // return 401 status if the user_name does not match.
    if (user.username !== userData.user_name) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }
    // get basic user details
    const userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });

})
.put('/editBio', cors(corsOptions), async function(req, res) {
  const username = req.query.username;
  const biography = req.query.biography;
  if (!username || !biography) {
    res.status(400)
    res.json({error: "No input given"})
  }

  const user = await User.findOne( {
    user_name: username,
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

  user.biography = biography;

  await user.save();

  return res.json({ user });
})



module.exports = router;

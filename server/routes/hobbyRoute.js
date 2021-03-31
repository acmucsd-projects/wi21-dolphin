const express = require('express');
const router = express.Router();
const cors = require('cors');
const Hobby = require('../models/hobby');

const corsOptions = {
  origin: "https://quizzical-brattain-02ca66.netlify.app"
}

router
/* GET all hobbies. */
.get('/all', cors(corsOptions), async (req, res) => {
  await Hobby.find().exec()
  .then(function(hobbies) {
    return res.json({ hobbies });
  })
  .catch(function(error) {
    console.log(error);
    res.status(400);
    return res.send("Error getting all the categories");
  })

  
})

/* GET a hobby by name. */
.get('/byName', cors(corsOptions), async (req, res) => {
  const hobby = await Hobby.findOne( {
    name: req.query.name
  })

  if (hobby === null) {
    res.status(400)
    return res.json({ error: "Invalid input" });
  } else {
    return res.json({ hobby });
  }
})

.get('/byId', cors(corsOptions), async (req, res) => {
  const hobby = await Hobby.findOne( {
    _id: req.query.id
  })

  if (hobby === null) {
    res.status(400)
    return res.json({ error: "Invalid input" });
  } else {
    return res.json({ hobby });
  }
})

  module.exports = router;
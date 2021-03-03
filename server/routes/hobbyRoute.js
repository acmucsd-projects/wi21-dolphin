const express = require('express');
const router = express.Router();
const Hobby = require('../models/hobby')



router
.route('/')

/* GET all hobbies. */
.get(async (res) => {
  const hobbies = await Hobby.find().exec()

  res.status(200).json({ hobbies })
})

/* GET a hobby. */
.get(async (req, res) => {
  const hobby = await Hobby.findOne( {
    name: req.query.name
  })

  if (hobby === null) {
    res.status(400).json({ error: "Invalid input" });
  } else {
    res.status(200).json({ hobby });
  }
})

  module.exports = router;
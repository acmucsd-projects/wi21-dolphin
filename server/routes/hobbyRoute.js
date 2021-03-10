const express = require('express');
const router = express.Router();
const Hobby = require('../models/hobby');

router
/* GET all hobbies. */
.get('/all', async (req, res) => {
  await Hobby.find().exec()
  .then(function(hobbies) {
    res.status(200).json({ hobbies });
  })
  .catch(function(error) {
    console.log(error);
    console.log("Error getting all the hobbies");
  })

  
})

/* GET a hobby. */
.get('/one', async (req, res) => {
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
const express = require('express');
const router = express.Router();
const Hobby = require('../models/hobby');

router
/* GET all hobbies. */
.get('/all', async (req, res) => {
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

/* GET a hobby. */
.get('/one', async (req, res) => {
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

  module.exports = router;
const express = require('express');
const router = express.Router();
const Hobby = require('../models/hobby')


/* GET a hobby. */
router
.route('/')
.get(async (req, res) => {
  const hobby = await Hobby.findOne( {
    name: req.query.name
  })
  res.status(200).json({ hobby });
})

  module.exports = router;
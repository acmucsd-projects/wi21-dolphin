const express = require('express');
const router = express.Router();
const Category = require('../models/category')

/* GET a category. */
router
.route('/')
.get(async (req, res) => {
    const category = await Category.findOne( {
      name: req.query.name
    })
    res.status(200).json({ category });
  })

module.exports = router;
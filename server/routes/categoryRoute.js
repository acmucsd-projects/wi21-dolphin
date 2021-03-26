const express = require('express');
const router = express.Router();
const Category = require('../models/category');


router
/* GET a category. */
.get('/', async (req, res) => {
    const category = await Category.findOne( {
      name: req.query.name
    })
    .populate({
      path: 'hobbies',
    })
    .exec((err) => {
        if (err) {
          res.status(400)
          return res.send("Something went wrong");
        }
    })
    return res.json({ category });
})
.get('/all', async (req, res) => {
  await Category.find()
  .populate({
    path: 'hobbies',
  })
  .exec()
  .then(function(categories) {
    return res.json({ categories })
  })
  .catch(function(error) {
    console.log(error);
    res.status(400);
    return res.send("Error getting all the categories");
  })
  
})

module.exports = router;
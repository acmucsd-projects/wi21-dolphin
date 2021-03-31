const express = require('express');
const router = express.Router();
const cors = require('cors');
const Category = require('../models/category');

const corsOptions = {
  origin: "https://quizzical-brattain-02ca66.netlify.app"
}

router
/* GET a category. */
.get('/', cors(corsOptions), async (req, res) => {
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
.get('/all', cors(corsOptions), async (req, res) => {
  await Category.find({})
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
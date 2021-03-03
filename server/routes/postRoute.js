const { json } = require('express');
const express = require('express');
const router = express.Router();
const Hobby = require('../models/hobby')
const Post = require ('../models/post')

router
.route('/')

.get(async (req, res) => {
    const queryHobby = req.query.hobby;
    const post_to_hobby = await Hobby.findOne( {
        name: queryHobby
    }, function (err) {
        if (err) {
            res.status(400).json({ error: 'Invalid hobby input'})
        }
    })
    if (post_to_hobby === null) {
        res.status(400).json({ error: 'Invalid hobby input'})
    }

    const posts = await Post.find({ 
        hobby: post_to_hobby
    }).exec()

    if (posts === null) {
        res.send("There are no posts for this hobby, or this hobby doesn't exist");
    } else {
        res.status(200).json({ posts });
    }

})
.post(async (req, res) => {
    const queryName = req.query.user_name;
    const queryContent = req.query.content;
    const queryHobby = req.query.hobby;

    if (!queryName || !queryContent || !queryHobby) {
        res.status(400).json({ error: 'Invalid input' });
    }

    const post_to_hobby = await Hobby.findOne( {
        name: queryHobby
    }, function (err) {
        if (err) {
            res.status(400).json({ error: 'Invalid hobby input'})
        }
    })

    if (post_to_hobby === null) {
        res.status(400).json({ error: 'Invalid hobby input'})
    }

    const post = new Post({
        user_name: queryName,
        content: queryContent,
        hobby: post_to_hobby
    })
     
    const newPost = await Post.create(post);

    res.status(200).json({ post: newPost });
})
.delete(async (req, res) => {

    const post_to_hobby = await Hobby.findOne( {
        name: req.query.hobby
    }, function (err) {
        if (err) {
            res.status(400).json({ error: 'Invalid hobby input'})
        }
    })

    if (post_to_hobby === null) {
        res.status(400).json({ error: 'Invalid hobby input'})
    }

    Post.deleteOne({
        user_name: req.query.user_name,
        content: req.query.content,
        hobby: post_to_hobby
    }, function (err) {
        if (err) {
            res.send("Invalid input");
        }
        else {
            res.send("Successful deletion of this post");
        }
    })

});

module.exports = router;
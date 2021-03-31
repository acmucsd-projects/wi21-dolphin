const { json } = require('express');
const express = require('express');
const router = express.Router();
const Hobby = require('../models/hobby');
const Post = require('../models/post');
const User = require('../models/user');


router
.get('/one', async (req, res) => {
    const queryPostedBy = req.query.posted_by;
    const queryTitle = req.query.title;
    const queryContent = req.query.content;
    const queryHobby = req.query.hobby;

    const post_to_hobby = await Hobby.findOne( {
        name: queryHobby
    }, function (err) {
        if (err) {
            res.status(400)
            return res.json({ error: 'Invalid hobby input' })
        }
    })

    if (post_to_hobby === null) {
        res.status(400)
        return res.json({ error: 'Invalid hobby input' })
    }

    const post = await Post.findOne( {
        user_name: queryPostedBy,
        title: queryTitle,
        content: queryContent,
        hobby: post_to_hobby
    }, function (err) {
        if (err) {
            res.status(400)
            return res.json({ error: 'Invalid post inputs' })
        }
    })

    if (post === null) {
        res.status(400)
        return res.json({ error: 'Invalid post inputs' })
    } else {
        return res.json({ post });
    }

})
.get('/viaHobby', async (req, res) => {
    const queryHobby = req.query.hobby;
    const post_to_hobby = await Hobby.findOne( {
        name: queryHobby
    }, function (err) {
        if (err) {
            res.status(400)
            return res.json({ error: 'Invalid hobby input' })
        }
    })
    if (post_to_hobby === null) {
        res.status(400)
        return res.json({ error: 'Invalid hobby input' })
    }

    const posts = await Post.find({ 
        hobby: post_to_hobby
    }).exec()

    if (posts === null) {
        res.status(400)
        return res.send("There are no posts for this hobby, or this hobby doesn't exist");
    } else {
        return res.json({ posts });
    }

})
.get('/viaUser', async (req, res) => {
    const queryUsername = req.query.user_name;
    const post_to_user = await User.findOne( {
        user_name: queryUsername
    }, function (err) {
        if (err) {
            res.status(400)
            return res.json({ error: 'Invalid user input' })
        }
    })
    if (post_to_user === null) {
        res.status(400)
        return res.json({ error: 'Invalid user input' })
    }

    const posts = await Post.find({ 
        user_name: post_to_user.user_name
    }).populate('hobby').exec()

    if (posts === null) {
        res.status(400)
        return res.send("There are no posts for this user, or this user doesn't exist");
    } else {
        return res.json({ posts });
    }

})
.post('/', async (req, res) => {
    const queryName = req.query.user_name;
    const queryContent = req.query.content;
    const queryHobby = req.query.hobby;
    const queryTitle = req.query.title;

    if (!queryName || !queryContent || !queryHobby || !queryTitle) {
        res.status(400)
        return res.json({ error: 'Invalid input' });
    }

    const post_to_hobby = await Hobby.findOne( {
        name: queryHobby
    }, function (err) {
        if (err) {
            res.status(400)
            return res.json({ error: 'Invalid hobby input' })
        }
    })

    if (post_to_hobby === null) {
        res.status(400)
        return res.json({ error: 'Invalid hobby input' })
    }

    const user = await User.findOne( {
        user_name: queryName
    }, function (err) {
        if (err) {
            res.status(400)
            return res.json({ error: 'Invalid hobby input' })
        }
    })

    if (user === null) {
        res.status(400)
        return res.json({ error: 'Invalid username input' })
    }

    const post = new Post({
        user_name: queryName,
        title: queryTitle,
        content: queryContent,
        hobby: post_to_hobby,
        likes: []
    })
     
    const newPost = await Post.create(post);

    return res.json({ post: newPost });
})
.put('/like', async (req, res) => {
    const queryPostedBy = req.query.posted_by;
    const queryTitle = req.query.title;
    const queryContent = req.query.content;
    const queryHobby = req.query.hobby;
    const queryLikedBy = req.query.liked_by;

    const liked = await User.findOne( {
        user_name: queryLikedBy
    }, function (err) {
        if (err) {
            res.status(400)
            return res.json({ error: 'Invalid user input' })
        }
    })
    if (liked === null) {
        res.status(400)
        return res.json({ error: 'Invalid user input' })
    }

    const post_to_hobby = await Hobby.findOne( {
        name: queryHobby
    }, function (err) {
        if (err) {
            res.status(400)
            return res.json({ error: 'Invalid hobby input' })
        }
    })

    if (post_to_hobby === null) {
        res.status(400)
        return res.json({ error: 'Invalid hobby input' })
    }

    const post = await Post.findOne( {
        user_name: queryPostedBy,
        title: queryTitle,
        content: queryContent,
        hobby: post_to_hobby
    }, function (err) {
        if (err) {
            res.status(400)
            return res.json({ error: 'Invalid post inputs' })
        }
    }).populate('likes')

    if (post === null) {
        res.status(400)
        return res.json({ error: 'Invalid post inputs' })
    }

    let added = [...new Set(post.likes)];
    added.push(liked);

    const filtered = [...new Set(added)];
    post.likes = filtered;

    await post.save();

    return res.json({ post });

})
.put('/dislike', async (req, res) => {
    const queryPostedBy = req.query.posted_by;
    const queryTitle = req.query.title;
    const queryContent = req.query.content;
    const queryHobby = req.query.hobby;
    const queryDislikedBy = req.query.disliked_by;

    const disliked = await User.findOne( {
        user_name: queryDislikedBy
    }, function (err) {
        if (err) {
            res.status(400)
            return res.json({ error: 'Invalid user input' })
        }
    })
    if (disliked === null) {
        res.status(400)
        return res.json({ error: 'Invalid user input' })
    }

    const post_to_hobby = await Hobby.findOne( {
        name: queryHobby
    }, function (err) {
        if (err) {
            res.status(400)
            return res.json({ error: 'Invalid hobby input' })
        }
    })

    if (post_to_hobby === null) {
        res.status(400)
        return res.json({ error: 'Invalid hobby input' })
    }

    const post = await Post.findOne( {
        user_name: queryPostedBy,
        title: queryTitle,
        content: queryContent,
        hobby: post_to_hobby
    })

    for (let i = 0; i < post.likes.length; i++) {
        const element = post.likes[i].toString();
        
        if (element === disliked._id.toString()) {
            post.likes.splice(i, 1);
        }
    }

    await post.save();

    return res.json({ post });

})
.delete('/', async (req, res) => {

    const post_to_hobby = await Hobby.findOne( {
        name: req.query.hobby
    }, function (err) {
        if (err) {
            res.status(400)
            return res.json({ error: 'Invalid hobby input' })
        }
    })

    if (post_to_hobby === null) {
        res.status(400)
        return res.json({ error: 'Invalid hobby input' })
    }

    Post.deleteOne({
        user_name: req.query.user_name,
        content: req.query.content,
        hobby: post_to_hobby
    }, function (err) {
        if (err) {
            res.status(400)
            return res.send("Invalid input");
        }
        else {
            return res.send("Successful deletion of this post");
        }
    })

});

module.exports = router;
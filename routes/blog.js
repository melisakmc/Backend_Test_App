const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');      //including body-parser to parse request bodies
const Post = require('../schema/post');         //including Post schema under schema folder

router.use(bodyParser.json());
router.use(bodyParser.urlencoded ({
    extended: true
}));

//Shows list of public posts
router.get('/', async (req,res) => {
    try {
        const posts = await Post.find();    //returns all posts
        res.json(posts);
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
});

//Creates a post
router.post('/', (req,res) => {
    const blog = new Post({
        title: req.body.title,
        body: req.body.body,
        listOfHashtags: req.body.listOfHashtags,
        status: req.body.status,
        authorName: req.body.authorName
    });
    try{
        const newPost = blog.save();
        res.status(201).json(newPost);
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }
})

//Publishes a post
router.patch('/:id', async (req,res) => {
    try {                                           //changing status from "draft" or "scheduled" to "published"
        const update = await Post.updateOne({_id : req.params.id}, { $set: {status: 'Published'}});
        res.json(update);
    }
    catch(err) {
        res.json({message: err.message});
    }
})

//Deletes a post
router.delete('/:id', async (req,res) => {
    try {
        const removedPost = await Post.remove({_id: req.params.id});    //removes the post whose id is specified
        res.json(removedPost);
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
})

//Filters posts
router.get('/:tag', async (req,res) => {
    try {
        var x = '#'+req.params.tag      //creating hashtag from the received keyword
        const posts = await Post.find({ listOfHashtags: x});    //finding posts whose hashtag list contains the specified keyword
        res.json(posts);
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router;
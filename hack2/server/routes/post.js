import express from 'express';
import Post from '../models/post.js';
import moment from 'moment';

const router = express.Router();

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async(_, res) => {
    try{
        const data = await Post.find({}).sort({timestamp: -1});
        res.status(200).send({
            message: "success",
            data,
        });
    }
    catch(err){
        res.status(403).send({
            message: "error",
            data: null,
        });
    }
})

// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail', async(req, res) => {
    try{
        const {pid} = req.query;
        const data = await Post.findOne({postId: pid});
        res.status(200).send({
            message: "success",
            post: data,
        });
    }
    catch(err){
        res.status(403).send({
            message: "error",
            post: null,
        });
    }
})

// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', async(req, res) => {
    try{
        const {
            postId,
            title,
            content,
            timestamp
        } = req.body;
        const newPost = new Post({
            postId,
            title,
            content,
            timestamp,
        });
        console.log(req.body);
        await newPost.save();
        res.status(200).send({
            message: "success",
        });
    }
    catch(err){
        res.status(403).send({
            message: "error",
            post: null,
        });
    }
})

// TODO 5-(1): create the 4th API (/api/post)
router.delete('/post', async(req, res) => {
    try{
        const {pid} = req.query;
        await Post.deleteOne({postId: pid});
        res.status(200).send({
            message: "success",
        });
    }
    catch(err){
        res.status(403).send({
            message: "error",
            post: null,
        });
    }
})

export default router
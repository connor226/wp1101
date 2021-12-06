import express from 'express';
import post from './model.js';

const api = express.Router()

api.get('/', async(_, res) => {
    const {num} = await post.findOne({});
    res.status(200).send({num})
})

api.get('/add', async(req, res) => {
    const {num} = await post.findOne({});
    const update = num + Number(req.query.val);
    await post.updateOne({}, {num : update});
    res.status(200).send({num: update});
})

export default api;
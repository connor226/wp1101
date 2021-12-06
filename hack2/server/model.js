import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    num: {
        type: Number,
        required: [true, 'number is required'],
    }
}, { collection: 'post' });

const post = mongoose.model('post', postSchema);
export default post;
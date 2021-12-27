import mongoose from 'mongoose'
import dotenv from 'dotenv-defaults'
import Chatbox from './models/chatbox'
import Message from './models/message'
import User from './models/user'

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.once("open", () => {
    console.log("Mongo database connected!");
})

export default {Chatbox, Message, User};
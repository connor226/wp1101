import express from 'express';
import cors from 'cors'
import apiRoute from './route.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoute);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(() => {
    console.log('MongoDB connected');
})

app.listen(process.env.PORT || 4000, () => {
    console.log('Server is up!')
})
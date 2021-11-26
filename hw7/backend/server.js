import express from 'express';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
import cors from 'cors';
import apiRouter from './api.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then((res) => console.log('Mongodb connected'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
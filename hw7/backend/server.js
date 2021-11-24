import express from 'express';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
dotenv.config();
console.log(process.env.PORT);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then((res) => console.log('Mongodb connected'));
const app = express();
const port = process.env.PORT || 4000;
app.get('/', (req, res) => {
    res.send('Hello, World!');
});/*
app.post('/create-card', (req, res) => {

})
app.get('/query-cards', (req, res) => {

})*/
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
import express from 'express'
import postRoute from './routes/post.js'
import mongoose from 'mongoose'
import { dataInit } from './upload.js'
import dotenv from 'dotenv'
// require('dotenv').config()
dotenv.config();
const app = express()

app.use(express.json())

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

const port = process.env.PORT || 4000
const dboptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// TODO 1: connect to your mongodb here
mongoose.connect(process.env.MONGO_URL, dboptions)
.then(() => {
  console.log('MongoDB connected!');
  if (process.env.MODE === 'EXAM')
    dataInit()
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', postRoute)

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})

const express = require('express');
const cors = require('cors');
const apiRouter = require('./api');

const app = express();
app.use(cors());

app.use('/api', apiRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})
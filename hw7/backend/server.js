const express = require('express');
const app = express();
const post = process.env.PORT || 4000;
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const postRouter = require('./routes/postRoute');
const commentRouter = require('./routes/commentRoute')
const port = 3000;

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/post', postRouter);
// app.use('/post/:postId/comment', commentRouter);
app.use('/post', commentRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
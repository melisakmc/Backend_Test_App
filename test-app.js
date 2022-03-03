const express = require('express');     //including Expressjs module
const app = express();
const mongoose = require('mongoose');   //including Mongoose module to work with MongoDB
require('dotenv/config');               //using dotenv to hide database user information

mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('Connected to DB')                      //connecting to database
});

const blogRouter = require('./routes/blog');
app.use('/blog',blogRouter);                            //importing and calling router(blog.js under routes folder)

app.listen(3000, () => console.log('Server started'));      //listening the port 3000

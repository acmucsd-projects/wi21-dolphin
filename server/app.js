const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const usersRouter = require('./routes/users');
const categoryRouter = require('./routes/categoryRoute')
const hobbyRouter = require('./routes/hobbyRoute')

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/test', (req, res) => {
  const test = { test: "test" }
  res.status(200).json( { test } )
})

app.use('/users', usersRouter);
app.use('/categories', categoryRouter);
app.use('/hobbies', hobbyRouter);

dotenv.config();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB database');
});

module.exports = app;

const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const usersRouter = require('./routes/userRoute');
const categoryRouter = require('./routes/categoryRoute');
const hobbyRouter = require('./routes/hobbyRoute');
const postRouter = require('./routes/postRoute');
const app = express();
const cors = require('cors');

app.use(cors({origin: "https://quizzical-brattain-02ca66.netlify.app"}));

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://quizzical-brattain-02ca66.netlify.app');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => { 
  console.log(JSON.stringify(req.headers));
  next();
});


app.get('/', (req, res) => {
  res.status(200).json({ success: "success?" })
})

app.get('/test', (req, res) => {
  const test = { test: "test" }
  res.status(200).json( { test } )
})

app.use('/users', usersRouter);
app.use('/categories', categoryRouter);
app.use('/hobbies', hobbyRouter);
app.use('/posts', postRouter);

dotenv.config();

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB database');
});

module.exports = app;

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

// .env
require('dotenv').config();

const middlewares = require('./middlewares');

const app = express();

// Avoid connection to the database if we just want to test
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
}

const db = mongoose.connection;
// Any error passed on connection is logged
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Users Mongo DB collection
const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

// Menu Mongo DB collection
const menuRouter = require('./routes/menu');

app.use('/menu', menuRouter);

// Twilio phone number sms verifiication
const twilioRouter = require('./routes/twilio-sms');

app.use('/twilio-sms', twilioRouter);

// ROUTES
app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.get('/posts', (req, res) => {
  res.send('Posti');
});

// MIDDLEWARES
// app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
// app.use(middlewares)

module.exports = app;

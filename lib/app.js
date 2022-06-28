const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/members', require('./controllers/members'));
app.use('/foods', require('./controllers/foods'));
app.use('/drinks', require('./controllers/drinks'));
app.use('/games', require('./controllers/games'));
app.use('/fruits', require('./controllers/fruits.js'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

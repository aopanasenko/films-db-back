const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { filmsRouter } = require('./controllers/films');
const { actorsRouter } = require('./controllers/actors');

const app = express();

mongoose.connect('mongodb://localhost:27017/imdb', {useNewUrlParser: true}, (err) => {
    if (err) throw err;
    console.log('Successfully connect');
});

app.use(function (request, result, next) {
    request.hello = 'Hello world from middleware';
    next();
});

app.use(bodyParser.json());

// GET /
app.get('/', function (request, result) {
    result.send(request.hello);
});

app.use('/films', filmsRouter);
app.use('/actors', actorsRouter);

app.listen(3000, function () {
    console.log('Listening at http://0.0.0.0:3000')
});

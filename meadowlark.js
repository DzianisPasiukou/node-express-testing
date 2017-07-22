var express = require('express');
var fortune = require('./src');

// var exphbs = require('express-handlebars');

// var app = express();

// app.engine('.hbs', exphbs({
//     extname: '.hbs',
//     defaultLayout: 'main'
// }));
// app.set('view engine', '.hbs');

var app = express();
// Установка механизма представления handlebars
var handlebars = require('express-handlebars')
    .create({
        defaultLayout: 'main'
    });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about', {
        fortune: fortune.getRandomFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', function (req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function (req, res) {
    res.render('tours/request-group-rate');
});

// Обобщенный обработчик 404 (промежуточное ПО)
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});
// Обработчик ошибки 500 (промежуточное ПО)
app.use(function (err, req, res) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express is running on http://localhost:' +
        app.get('port') + '; press Ctrl+C for closing.');
});

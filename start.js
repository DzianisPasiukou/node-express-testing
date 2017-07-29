var express = require('express');
var resources = require('./src');
var config = require('./project.config.json');

var app = express();

// installation of mechanism of handlebars' view
var handlebars = require('express-handlebars')
    .create({
        defaultLayout: config.defaultLayout
    });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || config.port);

app.use(express.static(__dirname + '/public'));

// i can turn off x-powered-by header
if (config.mode === config.debug) {
    app.disable('x-powered-by');
}

app.use(function (req, res, next) {
    // Bug: set node_env is wrong and this part of code has unknown behavior
    // res.locals.showTests = app.get('env') !== 'production' &&
    //     req.query.test === '1';
    res.locals.showTests = config.mode !== config.release &&
        req.query.test === '1';
    next();
});

app.get('/', function (req, res) {
    res.render('home');
});

if (config.mode === config.debug) {
    app.get('/headers', function (req, res) {
        res.set('Content-Type', 'text/plain');
        var s = '';
        for (var name in req.headers) {
            if (req.headers.hasOwnProperty(name)) {
                s += name + ': ' + req.headers[name] + '\n';
            }
        }

        res.send(s);
    });
}

app.get('/about', function (req, res) {
    res.render('about', {
        fortune: resources.getRandomFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/tours/hood-river', function (req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function (req, res) {
    res.render('tours/request-group-rate');
});

// API
app.get('/api/tours', function (req, res) {
    var toursXml = '<?xml version="1.0"?><tours>' +
        resources.tours.map(function (p) {
            return '<tour price="' + p.price +
                '" id="' + p.id + '">' + p.name + '</tour>';
        }).join('') + '</tours>';
    var toursText = resources.tours.map(function (p) {
        return p.id + ': ' + p.name + ' (' + p.price + ')';
    }).join('\n');
    res.format({
        'application/json': function () {
            res.json(resources.tours);
        },
        'application/xml': function () {
            res.type('application/xml');
            res.send(toursXml);
        },
        'text/xml': function () {
            res.type('text/xml');
            res.send(toursXml);
        },
        'text/plain': function () {
            res.type('text/plain');
            res.send(toursXml);
        }
    });
});

app.put('/api/tour/:id', function (req, res) {
    var p = resources.tours.filter(function (p) { return p.id === req.params.id; })[0];
    if (p) {
        if (req.query.name) {
            p.name = req.query.name;
        }
        if (req.query.price) {
            p.price = req.query.price;
        }
        res.json({ success: true });
    } else {
        res.json({ error: 'Tour is not existed.' });
    }
});

app.delete('/api/tour/:id', function (req, res) {
    var i;
    for (i = resources.tours.length - 1; i >= 0; i--) {
        if (resources.tours[i].id === req.params.id) {
            break;
        }
    }
    if (i >= 0) {
        resources.tours.splice(i, 1);
        res.json({ success: true });
    } else {
        res.json({ error: 'Tour is not existed.' });
    }
});

// common handling of 404 request
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

// 500 error handling
app.use(function (err, req, res) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express is running on http://localhost:' +
        app.get('port') + '; press Ctrl+C for closing.');
});

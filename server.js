var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = mongoose.connect('mongodb://Alien:SafePass7@ds141320.mlab.com:41320/rapidcrocs');

var Product = require('./models/productModel');
var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

productRouter = require('./Routes/productRoutes')(Product);

app.use('/api', productRouter);

app.get('/', function (req, res) {
    res.send('Welcome to my API! MAGIC HAPPENS HERE!!');
});

app.listen(port, function () {
    console.log('Gulp is running on PORT:' + port);
});
// index.js

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

// DB Setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;

// DB Connect Message
db.once('open', function() {
    console.log('DB connected');
});

// DB Error Message
db.on('error', function(err) {
    console.err('DB ERROR : ', err);
});

// Other Settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//Routes
app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contacts'));

// Port Setting
var port = 3000;
app.listen(port, function() {
    console.log('server on! http://localhost:' + port);
});
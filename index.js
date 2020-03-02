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

// DB Schema Setting
var contactSchema = mongoose.Schema({
    name:{type:String, required:true, unique:true},
    email:{type:String},
    phone:{type:String}
});

// DB Model Setting
var Contact = mongoose.model('contact', contactSchema);

//Routes
// Home
app.get('/', function(req, res) {
    res.redirect('/contacts');
});

// Contact - Index
app.get('/contacts', function(req, res) {
    Contact.find({}, function(err, contacts) {
        if(err) return res.json(err);
        res.render('contacts/index', {contacts:contacts});
    });
});

// Contacts - New
app.get('/contacts/new', function(req, res) {
    res.render('contacts/new');
});

// Contacts - Create
app.post('/contacts', function(req, res) {
    Contact.create(req.body, function(err, contact) {
        if(err) return res.json(err);
        res.redirect('/contacts');
    });
});

// Contacts - Show
app.get('/contacts/:id', function(req, res) {
    Contact.findOne({_id:req.params.id}, function(err, contact) {
        if(err) return res.json(err);
        res.render('contacts/show', {contact:contact});
    });
});

// Contacts - Edit
app.get('/contacts/:id/edit', function(req, res) {
    Contact.findOne({_id:req.params.id}, function(err, contact) {
        if(err) return res.json(err);
        res.render('contacts/edit', {contact:contact});
    });
})

// Contacts - Update
app.put('/contacts/:id', function(req, res) {
    Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact) {
        if(err) return res.json(err);
        res.redirect('/contacts/' + req.params.id);
    });
});

// Contacts - Destroy
app.delete('/contacts/:id', function(req, res) {
    Contact.deleteOne({_id:req.params.id}, function(err) {
        if(err) return res.json(err)
        res.redirect('/contacts');
    });
});

// Port Setting
var port = 3000;
app.listen(port, function() {
    console.log('server on! http://localhost:' + port);
});
// models/Contact.js

var mongoose = require('mongoose');

// DB Schema Setting
var contactSchema = mongoose.Schema({
    name:{type:String, required:true, unique:true},
    email:{type:String},
    phone:{type:String}
});

// DB Model Setting
var Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;

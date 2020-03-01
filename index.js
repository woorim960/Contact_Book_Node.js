var express = require('express')
var mongoose = require('mongoose')
var app = express()

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(process.env.MONGO_DB)
var db = mongoose.connection

db.once('open', function() {
    console.log('DB connected')
})

db.on('error', function(err) {
    console.err('DB ERROR : ', err)
})

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

var port = 3000
app.listen(port, function() {
    console.log('server on! http://localhost/' + port)
})
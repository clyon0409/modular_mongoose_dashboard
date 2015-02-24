var path = require('path');
//Load the express module
var express = require('express');
//require mongoose and create the mongoose variable
var mongoose = require('mongoose');
//invoke var express and store the resulting application in var application
var app = express();
//body-parser need to handle post data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,"./static")));
//set the location where express will look for the ejs views
app.set('views', path.join(__dirname,'./views'));
//set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

//This is how we connect to the mogodb database using mongoose -- 'basic_mongoose' is the name of our db in mongodb -- this should match the name of the db yu are going to use for your project
mongoose.connect('mongodb://localhost/quotes');

var QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String,
    date: {type: Date, default: Date.now}
});

var Quote=mongoose.model('Quote',QuoteSchema);


app.get('/', function (req,res){
    User.find({},function(err, data){
        //if there is an error console.log that something went wrong!
        if (err){
            console.log('something went wrong');
        }else{
            console.log('successfully retrieved all data!', data);
            res.render('index', {users: data});
        }
     })
});

app.get('/users/:id', function (req,res){
    console.log('find: ', req.params.id);
    User.findOne({_id: req.params.id.trim()},function(err, data){
        //if there is an error console.log that something went wrong!
        if (err){
            console.log('something went wrong');
        }else{
            console.log('successfully retrieved data!', data);
            res.render('index', {users: data});
        }
     })
});
app.post('/user', function(req, res) {
     console.log("POST DATA", req.body);

     // create a new User with the name and age corresponding to those req.body
     var user = new User({name: req.body.name, age: req.body.age});

     //try to save the new user to the database and run a callback function with an error (if any) from the operation.
     user.save(function(err){
        //if there is an error console.log that something went wrong!
        if (err){
            console.log('something went wrong');
        }else{
            console.log('successfully added a user!');
            res.redirect('/')
        }
     })
})

app.listen(8000, function(){
	console.log('listen on port 8000');
})

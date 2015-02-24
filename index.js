var path = require('path');
//Load the express module
var express = require('express');

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

//require mongoose and create the mongoose variable
var mongoose = require('mongoose');
//This is how we connect to the mogodb database using mongoose -- 'basic_mongoose' is the name of our db in mongodb -- this should match the name of the db yu are going to use for your project
mongoose.connect('mongodb://localhost/mongooses');

var FlockSchema = new mongoose.Schema({
    name: String,
    color: String,
    weight: Number
});

var Mongoose=mongoose.model('Mongoose',FlockSchema);

app.get('/', function (req,res){
    Mongoose.find({}, function(err, data)
    {
        if (err){
            console.log('could not get data');
            return 0;
        }else
           res.render('index', {animals:data});
    });
    
});

app.get('/mongooses/:id', function (req,res){
    console.log('got into display');
    //render the edit page
    res.render('new');
});

app.get('/mongooses/new', function(req,res){
    console.log('got into new route')
    //render the new page
})

app.get('/mongooses/:id/edit', function(req,res){
    console.log('got into edit method')
    //render the new edit page
     Mongoose.findOne({_id: req.params.id}, function (err, data){

            if(err)
                console.log('Could not find the document')
            else
                res.render('edit', {animal:data});
        
      });
})

app.post('/mongooses', function(req, res) {
    console.log("post new mongoose data", req.body);
    var entry = new Mongoose({name: req.body.name, color:req.body.color, weight: req.body.weight });

    //try to save the new entry to the database and run a callback function with an error (if any) from the operation.
    var result = entry.save(function(err){
    //if there is an error console.log that something went wrong!
        if (err){
            console.log('something went wrong');
        }else{
            console.log('successfully added a mongoose!');
            res.redirect('/');
        }
    });
    
})

app.post('/mongooses/:id', function(req, res) {
     console.log("post: edit info for a specific mongoose", req.body);
     if (req.body.name !== ''){
        Mongoose.update({_id:req.params.id},{name: req.body.name}, function(err,data){;
        if (err)
            console.log('could not update the name');
        else
            console.log('update :' + req.params.id + " name with " + req.body.name);
        });
    }
    if (req.body.color !== ''){
        Mongoose.update({_id:req.params.id},{color: req.body.color}, function(err,data){;
        if (err)
            console.log('could not update the color');
        else
            console.log('update :' + req.params.id + " color with " + req.body.color);
        });
    }
    if (req.body.weight !== ''){
        Mongoose.update({_id:req.params.id},{weight: req.body.weight}, function(err,data){;
        if (err)
            console.log('could not update the weight');
        else
            console.log('update :' + req.params.id + " weight with " + req.body.weight);
        });
    }
     res.redirect('/');
    
    
})
app.get('/mongooses/:id/destroy', function(req, res) {
     console.log("post: delete info for a specific mongoose");
     Mongoose.remove({_id: req.params.id}, function (err, data)
     {
        if (err)
            console.log('could not remove ' + req.params.id);
        else
            console.log('deleted ' + req.params.id);
            res.redirect('/');
     })
    
})

app.listen(8000, function(){
	console.log('listen on port 8000');
})

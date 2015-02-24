//require mongoose and create the mongoose variable
var mongoose = require('mongoose');



//This is how we connect to the mogodb database using mongoose -- 'basic_mongoose' is the name of our db in mongodb -- this should match the name of the db yu are going to use for your project
mongoose.connect('mongodb://localhost/quotes');

var QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String,
    date: {type: Date, default: Date.now}
});

var Quote=mongoose.model('Quote',QuoteSchema);

module.exports = (function(){
	return{

		add_quote:function(data){
			console.log(data);

			// create a new Quote with the name and age corresponding to those passed from data
     		var entry = new Quote({name: data.name, quote: data.quote});

     		//try to save the new entry to the database and run a callback function with an error (if any) from the operation.
     		var res = entry.save(function(err){
        	//if there is an error console.log that something went wrong!
	        	if (err){
	           	 	console.log('something went wrong');
	           	 	return false;
	       	 	}else{
	            	console.log('successfully added a quote!');
	            	return true;
	        	}
     		});
     		console.log('result of add_quote ' + res);
			return res;
		},

		get_all_quotes: function(callback){
			Quote.find({}, function(err, data)
			{
				if (err){
					console.log('could not get data');
					return 0;
				}else
					callback(err, data);
			});
		}	

	// 	get_all_quotes:function(function()
	// 		{Quote.find({}, function(err, data)
	// 			{
	// 				if (err){
	// 					console.log('could not get data');
	// 					return 0;
	// 				}else{
	// 					ret_data = data;
	// 					console.log('got the data: ', ret_data );
	// 					return data;
	// 				}
	// 			});
	// 		// console.log('get_all_quotes returning ' + ret_data);
	// 		// console.log("\n\n\nitem:");
	// 		// console.log(ret_data._function._collection);
	// 		// // for (item in ret_data) {
 //   // //      		console.log("\n\n\nitem:");
 //   // //      		console.log(item);
 //   // //  		}
	// 		 return ret_data;
	// 		})
	}
})();

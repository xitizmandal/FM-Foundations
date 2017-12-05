var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var data = require('./data');
var fs = require('fs');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
	res.send("hello");
});

app.get('/users', function (req, res, next){
	res.json({
		users: data.users
	});
});

app.get('/users/:id', function(req, res, next) {
	try {
		var id = parseInt(req.params.id);
		if (isNaN(id)){
			next("Id must be a number");
		}
		next();
	} catch (e){
		next("Id must be a number");
	}

}, function (req, res, next) {
	res.json({
		users: data.users[req.params.id -1]
	});

}, function (error, req, res, next) {
	res.status(400).json({
		errors: error
	});
});

// Add user
app.post('/users', function (req, res, next) {
		if (typeof(req.body.name) === 'undefined'){
			next('Name is not provided');
		} else {
			next();
		}
	}, function(req, res, next){
		var newUser = {};
		var newId = data.users[data.users.length - 1].id + 1;
		Object.assign(newUser, {
			id: newId
		});
		newUser.name = req.body.name;
		data.users.push(newUser);
		fs.writeFile('data.json', JSON.stringify(data), 'utf-8', function () {
			res.json({
				msg: 'User added successfully',
				user: newUser
			});
		});
	}, function(error, req, res, next){
		res.json({
			error:error
		});
	});

// Update User
app.put('/users/:id', function(req, res, next){
	try{
		var id = req.params.id;
		if (isNaN(id)) {
			next("Invalid Id");
		}
		next();
	} catch (e)  {
		next("Invalid Id")
	}
}, function (req, res, next) {
	if (typeof(req.body.name) === 'undefined'){
		next('Name is not provided');
	} else {
	console.log("Numbers: "+ data.users.length);
		next();
	}

}, function(req, res, next){
		console.log(req.params.id)
	for (var i = data.users.length - 1; i >= 0; i--){
		console.log(data.users[i].id + " : "+data.users[i].name)
		// console.log(data.users[i].id == req.params.id)
		if (data.users[i].id == req.params.id){
			data.users[i].name = req.body.name;
			req.updateUser = data.users[i];
		}
	}
		fs.writeFile('data.json', JSON.stringify(data), 'utf-8', function () {
			res.json({
				msg: 'User Modified successfully',
				user: req.updateUser
			});
		});

	// for (var user in data.users){
	// 	if( user.id === req.params.id){
	// 		user.name = req.body.name;
	// 		req.updateUser = 
	// 	}

	// }
}, function (error, req, res, next) {
	res.json({
		error: error
	});

});


/*app.get('/', function (req, res, next) {
	console.log('here');
	res.json({
		msg: 'success'
	});
	next('Some error');
	// next();
}, function(req, res, next){
	// res.send('<h1>Hello World</h1>');
	console.log('first');
	next();

},function(req, res, next){
	console.log('second');
	next('Some error');

}, function(error, req, res, next){
	console.log('Error: ' + error);
	res.send(error);
});*/

// app.listen(8080);
var server = http.createServer(app);
server.listen(8080);

server.on('listening', function() {
	console.log('Listening on port 8080');
});

server.on('error', function() {
	console.log('Port 8080: already used');
	process.exit();
});
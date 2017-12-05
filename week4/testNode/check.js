var http = require('http');
var dt = require('./myfirstmodule');

http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type' : 'text/html'});
	response.write("The date and time currently: " + dt.myDateTime());
	response.write(request.url);
	response.end('Hello World!');
}).listen(8080);
// HTTP Portion
var http = require('http'); //require a node module
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	console.log("The Request is: " + parsedUrl.pathname);
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		// Callback function for reading
		function (err, data) {
			// if there is an error
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			// Otherwise, send the data, the contents of the file
			res.writeHead(200);
			res.end(data);
  		}
  	);
  	
  	/*
  	res.writeHead(200);
  	res.end("Life is wonderful");
  	*/
}


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io').listen(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', 
	// We are given a websocket object in our function
	function (socket) {
	
		console.log("We have a new client: " + socket.id);

		/*
		// When this user emits, client side: socket.emit('otherevent',some data);
		socket.on('chatmessage', function(data,message,id,userName,count) {
			// Data comes in as whatever was sent, including objects
			console.log("Received: 'chatmessage' " + data);
	
	
			
			// Send it to all of the clients except of your own
			// socket.broadcast.emit('chatmessage', data);
			// io.sockets.emit('chatmessage',data,id); // this one is for everyone 
			io.sockets.emit('chatmessage',data,message,id,userName,count);
		});
 		*/

		socket.on('chatmessage', function(data, message, userName, id, count) {

         
            // Data comes in as whatever was sent, including objects
			console.log("Received: 'chatmessage' " + data + " from " + id + " using username: " + userName);
			var name = userName;
			var userNum = count;
			// Send it to all of the clients
            //socket.broadcast.emit('chatmessage', data);
			io.sockets.emit('chatmessage', data, message, name, id, userNum);
        
		});    
		
		
		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);
const express = require('express');
const http = require('http');
const socketIO = require('socket.io')


var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.use(express.static(__dirname));
app.use((req, res) => res.sendFile(`${__dirname}/index.html`));

io.on('connect', (socket)=> {
	console.log('user has connected');
	socket.on('join', (params, callback) => {
		console.log(params);
		if(params.id === undefined) {
			return callback('User must me logged in');
		}
		socket.join(params.id)
		socket.emit('newMessage', `Welcome ${params.name}`);
		socket.on('createMessage', (msg)=> {
			console.log(msg);
			io.to(params.id).emit('newMessage', msg);
		});
		socket.broadcast.to(params.id).emit(`params.name has joined`);
	});
	

	
	

});
server.listen(3000, ()=> {
	console.log('server is up');
});







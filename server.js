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
		if(params.user.id === undefined) {
			return callback('User must me logged in');
		}
		socket.join(params.room)
		socket.emit('newMessage', `Welcome ${params.user.name}`);
		socket.on('createMessage', (msg)=> {
			console.log(msg);
			io.to(params.room).emit('newMessage', msg);
		});
		socket.on('play', (vidid) => {
			// console.log(vidid);
			socket.broadcast.to(params.room).emit('playVideo', vidid);
		});
		socket.on('pause', (msg)=> {
			console.log(msg);
			socket.broadcast.to(params.room).emit('pauseVideo', 'pause');
		});
		socket.broadcast.to(params.room).emit('newMessage',`${params.user.name} has joined`);
	});
	

	
	

});
server.listen(3000, ()=> {
	console.log('server is up');
});







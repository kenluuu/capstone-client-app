const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {Users} = require('./utils/users');

var app = express();
var server = http.Server(app);
var io = socketIO(server);
var users = new Users();



app.use(express.static(__dirname));
app.use((req, res) => res.sendFile(`${__dirname}/index.html`));

io.on('connect', (socket)=> {
	console.log('user has connected');
	socket.on('join', (params, callback) => {
		console.log(params);
		if(params.user.id === undefined) {
			return callback('User must me logged in');
		}
		socket.join(params.room);
		

		//removes user that is in another room
		users.removeUser(socket.id);
		
		//adds user in the users array
		users.addUser(socket.id, params.user.name, params.room);
		io.to(params.room).emit('updateUsersArray', users.getUserList(params.room));
		
		//greets user 
		socket.emit('newMessage', `Welcome ${params.user.name}`);

		//tells users in the room a new user connected
		socket.broadcast.to(params.room).emit('newMessage',`${params.user.name} has joined`);

		//creates and sends new messages
		socket.on('createMessage', (msg)=> {
			console.log(msg);
			io.to(params.room).emit('newMessage', msg);
		});

		socket.on('disconnect', ()=> {
			var user = users.removeUser(socket.id);
			if (user){
				io.to(params.room).emit('updateUsersArray', users.getUserList(params.room));
				io.to(params.room).emit('newMessage', `${user.name} has left`);
			}
		});
		
		//plays videos
		socket.on('play', (vidid) => {
			// console.log(vidid);
			socket.broadcast.to(params.room).emit('playVideo', vidid);
		});
		
		//pauses video
		socket.on('pause', (msg)=> {
			console.log(msg);
			socket.broadcast.to(params.room).emit('pauseVideo', 'pause');
		});
		
	});
	

	
	

});
server.listen(3000, ()=> {
	console.log('server is up');
});







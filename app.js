/*
// Express demo from https://www.npmjs.com/package/express
var express = require('express')
var app = express()
app.get('/', function (req, res){
	res.send('Hello world')
})
app.listen(3000)
*/

// From: http://socket.io/get-started/chat/
var express  = require('express')
var app  = express()
var http = require('http').Server(app)
// rutas
app.use (express.static(__dirname + '/public'))
//socket.io
var io = require('socket.io')(http)
// usuario de chat
var chatusers= Array()

app.get('/', function(req,res){
	//res.send('<h1>Hello world</h1>')
	//res.sendFile(__dirname + '/index.html')
	//rutas
	res.sendFile('index.html')
	//console.log(req.path)
})
app.get('/chat', function(req,res){
	res.sendFile(__dirname + '/public/chat.html')
	//console.log(req.path)
})

io.on('connection', function(socket){
	socket.on('nick', function(data, callback){
		if(chatusers.indexOf(data)==-1){
			chatusers.push(data)
			socket.nick = data
			console.log('Users:' + chatusers)
			callback(true)
			// difundimos los usuarios conectados
			io.sockets.emit('users', chatusers)
		}else{
			callback(false)
		}
	})
	socket.on('mensaje chat',function(msg){
		// Emitimos el mensaje recibido a todos los clientes, inclusie a que lo emitio
		//io.emit('mensaje chat', msg)
		// broadcast
		io.sockets.emit('mensaje chat',{
			nick: socket.nick,
			mensaje: msg
		})
		console.log({nick:socket.nick, mensaje:socket.msg})
	})
	socket.on('disconnect',function(){
		if(!socket.nick) return
		if(chatusers.indexOf(socket.nick)>-1)
			chatusers.splice(chatusers.indexOf(socket.nick),1)
		console.log('Users:'+chatusers)
	})
})

http.listen(3000, function(){
	//console.log(__dirname)
	console.log(new Date().toISOString().substring(0, 19)+':escuchando en el puerto *:3000')
})

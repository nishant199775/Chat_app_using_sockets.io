const http=require('http')
const express=require('express')
const app=express()
const server=http.createServer(app)
const socket=require("socket.io")
const { isNull } = require('util')
const io=socket(server)
const port=process.env.PORT||3344
let users={
  nishant:1234
}
let socketmap={}
io.on("connection",function(socket){
  console.log("connected with id="+socket.id)
  socket.on('login',function(data){
    if(users[data.unm])
    {
      if(data.pwd==users[data.unm])
      {
        socket.join(data.unm)
        socket.emit('logged_in')
        socketmap[socket.id]=data.unm
      }
      
      else{
        socket.emit('login_failed')
      
      }
    }
    else{
      // 
      socket.emit('signup')
      
      // socket.join(data.unm)
      // users[data.unm]=data.pwd
      // socket.emit('logged_in')
      // socketmap[socket.id]=data.unm
      
    }
    
  })
  socket.on('signedup',(data)=>
  {
    if(users[data.unm])
    {
      socket.emit('signup_failed')
    }
    else{
      socket.join(data.unm)
      users[data.unm]=data.pwd
      socket.emit('logged_in')
      socketmap[socket.id]=data.unm
    }
  })
  socket.on('msg_send',function(data){
    if(users[data.to]){

      io.to(data.to).emit('msg_received', {msg:data.msg,from:socketmap[socket.id]})
    }
    else{
      socket.broadcast.emit('msg_received', {msg:data.msg,from:socketmap[socket.id]})
    }
    
    
  })
})

app.use('/', express.static(__dirname + '/public'))

server.listen(port, function() {
  console.log('Started on http://localhost:3344')
})
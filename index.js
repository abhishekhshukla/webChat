const express=require('express')
const app= express()

const http=require('http')
const socketio=require('socket.io')

const server=http.createServer(app)
const io=socketio(server)

const PORT=process.env.PORT || 4444

app.use('/',express.static(__dirname+'/public'))
const user={};

io.on('connection',(socket)=>{
    socket.on("new-user",(name)=>{
     //   console.log(name)
        user[socket.id]=name;
        socket.broadcast.emit('new-user',name)
    })

    socket.on('send',(message)=>{
       
    //    console.log(message)
        socket.broadcast.emit('receive',{'message':message,name:user[socket.id]})
    })
   
    socket.on('disconnect',(message)=>{
        socket.broadcast.emit('left',user[socket.id])
        delete user[socket.id];
    })

})

server.listen(PORT,()=>{
    console.log(`server started on http://localhost:${PORT}`)
})
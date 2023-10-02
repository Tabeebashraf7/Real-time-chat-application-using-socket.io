//node server which will handle socket io connection

const io = require("socket.io")({
    cors: {
        origin: "*",
      }
});
const users = {};

 io.on('connection', socket=>{
     socket.on('new-user-joined', name=>{
         console.log("New user", name);
         users[socket.id] = name;
         socket.broadcast.emit('user-joined', name);
     });

     socket.on('send', message=>{
         socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
     });

     socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
 })
 io.listen(8000);




































/*const io = require('socket.io')({                //requireing socket package and the port is 8000
    cors: {
      origin: "*",
    }


});    
 



const users = {};
console.log(50);
io.on('connection',socket=>{                       // at the line io is initialised if the connection made if will show connection (io.on is a socket.io instance it will listen to various instances for example it will listen to multiple user joining)
    socket.on('new-user-joined', name =>{              // within this we are running socket.io server which is an instance of http this will listen the upcomming events basically it deals with a particular connection
        console.log("new user",name);
        users[socket.id] = name;                    //here whenever user will join they will get a name
        socket.broadcast.emit('user-joined', name);        //if a new user joins everyone will get a message that a new user has joined and it will send the users name
    });
    //console.log("jjjj");
    socket.on('send', message =>{                           //so here basically we are sealing with a event in which user is sending a message (note the name send can be anything defining that event)
        socket.broadcast.emit('received', {message: message, name: users[socket.id]}); //here er will share the meaasge with everyone what the user has send
        console.log({message: message});
    });

    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})

io.listen(8000);*/

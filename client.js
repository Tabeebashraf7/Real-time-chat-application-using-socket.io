const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container')

var audio = new Audio('ping.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if(position == 'left'){
        console.log('sound is playing');
        audio.play();
    }
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const name = prompt("Enter your name to join LetsChat")
socket.emit('new-user-joined', name)

socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'right');
})

socket.on('receive', data=>{
    append(`${data.name }: ${data.message}`, 'left')
    console.log(data.name,data.message);
})

socket.on('left', name=>{
    append(`${name } left the chat`, 'left');
})
























/*const socket = io('http://localhost:800');

const form = document.getElementById('send-container')                      //taking data from html form
const messageinput = document.getElementById('messageimp')
const messagecontainer = document.querySelector(".container")         //whenever u r getting any new messages out into the container


const append = (message, position)=>{                                //this functiom is used for formetting the message
    const messagelement = document.createElement('div');
    messagelement.innerText = message;
    messagelement.classList.add('message');
    messagelement.classList.add(position);
    messagecontainer.append(messagelement);
    socket.emit('send', message);   
    messageinput.value = ' ';
}

form.addEventListener('submit', (e)=>{     //this will help us to send our messages
    e.preventDefault();
    const meaasge = messageinput.value;
    append(`You: ${meaasge}`, 'right');
})
const namee = prompt("enter your name to join")
socket.emit('new-user-joined', namee)                                //here person enter the name the name goes to socket.io event

socket.on('user-joined', name =>{                                // this will help us to display any new user has joined
    append(`${name} joined the chat`, 'right')                   //_ has joined the chat will pe appended in right
})

socket.on('received', data =>{                                // this will help us to recive the btrodcasted message at left
    append(`${data.name}: ${data.message}`, 'left')                  
})*/
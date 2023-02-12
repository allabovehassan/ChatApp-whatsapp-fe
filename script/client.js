const socket = io("https://whatsapp-clone-be-yuq4.onrender.com", {
  transports: ["websocket"],
});

const form = document.getElementById('send-form');

const messageInput = document.getElementById('input_msg')
const messageContainer = document.querySelector("#container")

let audio = new Audio('ting.mp3');
audio.autoplay = "true";

let date = new Date();
var y = date.getFullYear();
var m = date.getMonth() + 1;
var d = date.getDate();
if (m < 10) m = "0" + m;
if (d < 10) d = "0" + d;
var today = d + "/" + m + "/" + y;

messageContainer.innerHTML += `

<div class = "message center">${today}</div>

`

const append = (message, position) => {
    const messageelem = document.createElement('div');
    messageelem.innerText = message;
    messageelem.classList.add('message');
    messageelem.classList.add(position);
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
    messageContainer.append(messageelem);
    if (position === 'left') {
        
        
              audio.play()
            
        
        
    }
        
}


form.addEventListener("submit",(e) => {
    e.preventDefault()
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value=''
})


const name = prompt("Enter Your name to join the chat");

socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} join the chat`,'left')
})


socket.on('recieve', data => {
    append(`${data.name}: ${data.message}`,'left')
})


socket.on('left', name => {
    append(`${name}: left the chat`,'left')
})


let socket=io();

let form=document.getElementById('data')
let input=document.getElementById('input')
let messageWindow=document.querySelector(".container")
let audio=new Audio('sound.mp3')

function newMessage(msg,pos)
  {   
      let msgElemet=document.createElement('div')
      console.log(msg.length)
      msgElemet.innerText=msg;
      msgElemet.classList.add('message')
      msgElemet.classList.add(pos)
      messageWindow.append(msgElemet)
      if(pos=='recived') audio.play();
  }

const newName=prompt("Enter Name");
socket.emit('new-user',newName);

socket.on('new-user',(name)=>{
              newMessage(`${name} joined chat`,'recived')
})


 form.addEventListener('submit',(e)=> {
         e.preventDefault()
           newMessage(`You: ${input.value}`,'send')
        //  console.log(`new message ${input.value}`)
          socket.emit('send',input.value);
          input.value=""
        
    })


    socket.on('receive',(data)=>{
        newMessage(`${data.name}: ${data.message}`,'recived')})

  socket.on('left',(user)=>{
      newMessage(`${user} left chat`,'recived')
  })
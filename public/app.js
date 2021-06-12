
const socket=io();
const username=document.querySelector(".setusername");
const roomselect=document.getElementById("roomselect");
const msform=document.querySelector(".sendmessage");
const totalchat=document.querySelector(".totalchat");
const btmdiv=totalchat.querySelector(".btmdiv");


socket.on("connect",()=>{      
    console.log("connected")
})

const joinrooms=()=>{
    socket.emit("joinroom",{room:roomselect.value},(res)=>{  //join a room
if(res.status=="ok"){
    totalchat.innerHTML=` <div class="chatbox chatbox3">
        <p class="chat" >${res.message} </p>
    </div>`;
    totalchat.lastChild.scrollIntoView();
}else{
    window.alert(res.message)
}
});

}

socket.on("broadchats",(res)=>{  //recieve chats from current room
    console.log(res)
    totalchat.innerHTML=totalchat.innerHTML+` <div class="chatbox">
    <p class="username2">${res.username}</p>
        <p class="chat" >${res.ms} </p>
    <p class="time">${res.time}</p>
    </div>`;
    totalchat.lastChild.scrollIntoView();
})



function msend(e){   
    e.preventDefault();
    var v=this.querySelector(`[name=typechat]`).value;
    if(v.trim().length!=0){
    this.reset();
    var js={
        username:username.value,
        room:roomselect.value,
        ms:v
    }
    socket.emit("sendchat",js,(res)=>{  //send chat to current room
        if(res.status=="ok"){
            
            totalchat.innerHTML=totalchat.innerHTML+` <div class="chatbox chatbox2">
<p class="username2">${js.username}</p>
    <p class="chat" >${js.ms} </p>
<p class="time">${res.time}</p>
</div>`;
totalchat.lastChild.scrollIntoView();
        }else{
            window.alert(res.status)
        }
    })
    }
}


window.addEventListener("load",(e)=>{
username.value="user"+Math.floor(Math.random()*100+1);  //set default username
joinrooms();   
}) 

roomselect.addEventListener("change",()=>{
    joinrooms();
})

console.log(msform)
msform.addEventListener("submit",msend);



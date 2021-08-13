
const socket=io();
const username=document.querySelector(".setusername");
const roomselect=document.getElementById("roomselect");
const msform=document.querySelector(".sendmessage");
const totalchat=document.querySelector(".totalchat");


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

function localtime(utctime){ //convert UTC time to local time
    return  date.format(new Date(utctime),"h:mm A");
}

socket.on("broadchats",(res)=>{  //recieve chats from current room

    totalchat.innerHTML=totalchat.innerHTML+` <div class="chatbox">
    <p class="username2">${res.username}</p>
        <p class="chat" >${res.ms} </p>
    <p class="time">${localtime(res.time)}</p>
    </div>`;
    totalchat.lastChild.scrollIntoView();
})



function msend(e){   
    e.preventDefault();
    var v=this.querySelector(`[name=typechat]`).value;
    var regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
    if(v.trim().length!=0){
     
            // console.log(regex.test(username.value))
            if(regex.test(username.value)){
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
<p class="time">${localtime(res.time)}</p>
</div>`;
totalchat.lastChild.scrollIntoView();
        }else{
            window.alert(res.status)
        }
    })
    }else{
        window.alert("username should not contain special characters")
    }
}
}


window.addEventListener("load",(e)=>{
username.value="user"+Math.floor(Math.random()*100+1); //set default username
joinrooms();
}) 

roomselect.addEventListener("change",()=>{
    joinrooms();
})


msform.addEventListener("submit",msend);



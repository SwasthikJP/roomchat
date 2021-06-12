
const express=require("express");
const app=express();
const httpServer=require("http").createServer(app);
const date=require("date-and-time");
const io=require("socket.io")(httpServer);

const PORT=process.env.PORT || 8080;

app.use(express.static("public"));

io.on("connection",(socket)=>{

  socket.on("sendchat",async(arg,calback)=>{
console.log(arg)
try{
  var t=date.format(new Date(),'h:mm A');
socket.to(arg.room).emit("broadchats",{...arg,time:t})  //send chats to a room

calback({status:"ok",time:t})
  }

catch(er){
  calback({status:"error occured"})
}
  }
  );

socket.on("joinroom",async(arg,calback)=>{    //join a room
  try{
  socket.join(arg.room);
  calback({message:`Welcome to ${arg.room} room`,status:"ok"});
  }catch(e){
    calback({message:`${e} occured`,status:"error occured"});
  }
})

});





httpServer.listen(PORT,()=>{
    console.log("listening");
})

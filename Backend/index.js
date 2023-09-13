const express = require("express");
const app = express()
const fs = require('fs');
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { on } = require("events");
const server = http.createServer(app);
const net = require('node:net');

let devs = [["NJa-CCast","NDa-CASR","NTu-R2948"],  ///0:nombre clave dispositivos
            [5000,5001,5002],                     ///1:puerto asociado a los dispositvos
            [false,false,false],                 ///2:estado: en uso?
            [0,0,0],                            ///3:server tcp: utilizado por la libreria net
            [0,0,0],                           ///4:socket tcp
            [0,0,0],                          ///5:socket http
            ["","",""],                       ///6:buffer
            [0,0,0]];                       ///7:Timeouts
let usuarios = ["jgiraldog","practicante.ir","noc2.gestion","tester.ir"]
let password = ["Ufinet2022","Uf1n3t2216","Noc.raise","admin@ufin"]

const io = new Server(server, {
    cors:{
        origin:"*",
        methods: ["GET","POST"],      
    },
});

const create_ser = (port) => {
  const servertc =net.createServer(function (socket) {
    console.log(`${socket.localPort} connected`);
    devs[4][devs[1].indexOf(port)]=socket;
    let socketh=devs[5][devs[1].indexOf(port)]
    socketh.emit("status_soc","conectado")
    socket.setEncoding('utf-8');

    socket.on('data', function(data) {
      console.log(devs[6])
      send_Response(data,socket)
    });
    socket.on('end', function() {
      console.log('end');
    });
    socket.on('close', function(inactive) {
      console.log('close');
      if(!inactive)socketh.emit("status_soc","conectando")
      devs[4][devs[1].indexOf(port)]=0;
    });
    socket.on('error', function(e) {
      console.log('error ', e);
      socketh.emit("status_soc","desconectado")
    });
  });
  servertc.listen(port, function() {
    console.log(`TCP Server is listening on port ${port}`);
  });
  devs[3][devs[1].indexOf(port)]=servertc
  devs[2][devs[1].indexOf(port)]=true
  socketht=devs[5][devs[1].indexOf(port)]
  devs[7][devs[1].indexOf(port)]=setTimeout(close_Server,600000,devs[5][devs[1].indexOf(port)])

}

const validate_cred = (cr) => {
  console.log(`user: ${cr.user}, password: ${cr.password}`)
  if(usuarios.indexOf(cr.user) !== -1 ){  // Se identifica si el usuario es existente
    console.log("Usuario existente")
    let index = usuarios.indexOf(cr.user)
    if(password[index] === cr.password) return true
    else return false
  }else return false
}

const send_Response = (data,socket) => {
  devs[6][devs[1].indexOf(socket.localPort)] += data;
  buffer = devs[6][devs[1].indexOf(socket.localPort)]
  socket_user=devs[5][devs[1].indexOf(socket.localPort)]
  if(buffer[buffer.length-1]==="\n"||buffer[buffer.length-1]==="#" ||buffer[buffer.length-1]===">" || buffer[buffer.length-2]===":" || buffer[buffer.length-2]==="-") {
    buffer=buffer.split("\n");
    console.log(buffer)
    for(let i=0;i <buffer.length;i++){
      let response=buffer[i]
      if (response[response.length-2]==="-") console.log("more")
      if(i>0) socket_user.emit("receive_res",buffer[i])}
    devs[6][devs[1].indexOf(socket.localPort)]=""; 
  }
}

const send_Command = (command,socket) => {
    socket_dev=devs[4][devs[5].indexOf(socket)]
    socket_dev.write(command);
    clearTimeout(devs[7][devs[5].indexOf(socket)])
    devs[7][devs[5].indexOf(socket)]=setTimeout(close_Server,600000,socket)

}

const close_Server = (socket) =>{
  let servert=devs[3][devs[5].indexOf(socket)]
  let socket_dev = devs[4][devs[5].indexOf(socket)]
  if (socket_dev !== 0) socket_dev.destroy(true)
  servert.close()
  devs[2][devs[5].indexOf(socket)]=false
}

io.on("connection", (socket) => {
    console.log(`User Connected ${socket.id}`);


    socket.on("send_command",(data) => {
        console.log(`Se envio: ${data.message}`);
        send_Command(data.message,socket);
    });

    socket.on("send_credential",(cred) => {
        let login = validate_cred(cred);
        console.log(login)
        socket.emit("rec_credential",login)
      });
    
    socket.on("send_dev",(disp) => {
      //console.log(devs[5])
      if(devs[2][devs[0].indexOf(disp)] === false) {
        devs[5][devs[0].indexOf(disp)]=socket
        create_ser(devs[1][devs[0].indexOf(disp)])
        socket.emit("status_soc","conectando")}
      else socket.emit("status_soc","ocupado")
    });

    socket.on("end_conection",() => {
      console.log("desconectar")
      close_Server(socket)
    })

    socket.on("disconnect", () => {
        console.log(`User Disconnected ${socket.id}`);
    });
});

server.listen(5002, () => {
    console.log(`Server running on port 5002`);
});



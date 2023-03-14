const WebSocketServer = require('ws').Server;
const WebSocket = require('ws')
const MediaStream = require('ms')
// Create server
// const m = new WebSocket()
// const MediaStream = require('MediaStream')
const wss = new WebSocketServer({ port: 8080 });
// Listen for connections
wss.on('connection', (socket) => {
  // Handle incoming messages
  socket.onmessage = (msg) => {
    let track = msg.data;
    

    let stream = new MediaStream(track);
    console.log(`Received data from ${stream.id}: `+ typeof(stream));  
     // Send to other connected sockets
     if (stream == null) console.log(123); 
     wss.clients.forEach(function each(client){
       if (client !== socket && client.readyState === WebSocket.OPEN) {
         client.send(JSON.stringify(stream)
            );
       }
     });
  }
});


// const external_socket = new WebSocket('ws://receiving_frontend_url');
// external_socket.onopen = () => {
//   external_socket.onmessage = (msg) => {
//     let stream = msg.data;
//     let video = document.querySelector('video'); 
//     video.srcObject = stream; 
//     video.onloadedmetadata = function(e) { 
//       video.play(); 
//     };
//   }
// };
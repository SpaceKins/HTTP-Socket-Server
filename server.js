var net=require('net');
var serverConfig={'port':6969};

var server=net.createServer(function(socket){
  console.log("Server Created on Port " + socket.port);
});



server.on('connection',function(socket){
  socket.setEncoding('utf-8');
  console.log('Connected to socket ' + socket.remotePort);
});

server.listen(serverConfig.port,function(){
  console.log('listening on port ' + serverConfig.port);
})

server.on('error',function(err){
  console.log(err);
  
  this.listen(serverConfig.port + 1, function(){
    console.log('Listening on port',server.address().port);
  })

});
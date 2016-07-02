var net=require('net');

var server=net.Server;

server.on('connection',function(){
  console.log('test');
})
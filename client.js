/**
 * 
    Create a client to establish TCP socket connections to HTTP servers
    The node command requires a single argument, the host and uri to request a resource from
        example: www.devleague.com/apply
    Transmit 'standard' HTTP Headers to the server
    Wait for a response from the server
    When the server responds, display the response message body to the terminal
    If the node client is run with no arguments, display a "help/usage" message that 
      explains how to use your client, including all available options

 */
var STANDARD=require('./standard');
var help="help/usage";
help+="\n command requires a single argument(host/uri)";
help+="\n example www.devleague.com/apply";

var RequestData=require('./RequestData');
var requestData= new RequestData();

var net=require('net');
//var standard=require('standard');

var host;
var uri;

var args=process.argv;
//console.log(args);

var thisPort=80;
var thisHost="www.google.com";
var requestHeader=requestData.RequestGetHeader(thisHost,"HEAD");
console.log(requestHeader);

//thisHost="www.devleague.com";

var client=net.createConnection({port:thisPort,host:thisHost},function(responseData){
  console.log('Connected');
})

client.write(requestHeader,function(){
  console.log('wrote');
})

/*
client.on('connect',function(data){
  console.log('in Connect' + data);
})
*/

client.on('data',function(responseData){
  console.log('****** Data ******** \n\n' +responseData.toString());
});

client.on('error',function(err){
  console.log(err);
});



/**
 * Process Arguments
 * if no arguments display
 */
verifySetArguments();

function verifySetArguments(){
  if(args.length!=3){
    console.log(help);
  }
  else
  {
    return setArguments(args)
  }

  return false;
}

function setArguments(argsToSet){
  var argValues=argsToSet[2].split('/');

  if(argValues.length==2){
    host=argValues[0];
    uri=argValues[1];
    console.log('host:' + host + ' uri:'+ uri);
    return true;
  }
  else
  {
    console.log(help);
    return false;
  }
}
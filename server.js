;
var fs = require('fs');
var net = require('net');
var serverConfig = {
    'port': 6969
};


var ResponseData = require('./ResponseData');
var responseData = new ResponseData();


var server = net.createServer(function() {
    console.log("Server Created");
});



server.on('connection', function(socket) {
    socket.setEncoding('utf-8');
    console.log('Connected to socket ' + socket.remotePort);


    console.log("SOCKET -> " + socket);

    // socket.write(fileData);

    /*
    
        socket.write(responseData.ResponseGetHeader());
    streamBackFile('', socket);

        socket.write('Got your Reqeust');
    socket.on('data', function(socket) {
        console.log('Server Received Data');
        console.log(socket);
        getResource(socket);

    })
    */
});

server.listen(serverConfig.port, function() {
    console.log('listening on port ' + serverConfig.port);
})

server.on('error', function(err) {
    console.log(err);

    this.listen(serverConfig.port + 1, function() {
        console.log('Listening on port', server.address().port);
    })
})

function getResource(thisSockeData) {
    var thisSocketDataArray = thisSockeData.split('\n');

    for (var i = 0; i < thisSocketDataArray.length; i++) {
        console.log('v*** ' + thisSocketDataArray[i]);
        if (thisSocketDataArray[i].indexOf('GET') > -1) {
            var methodLineArray = thisSocketDataArray[i].split(' ');
            console.log('method =' + methodLineArray[1]);
            return methodLineArray[1];
        }
    }
}

function streamBackFile(fileName, toSocket) {
    console.log("SOCKET -> " + toSocket);
    var rr = fs.createReadStream('hydrogen.html', {
        "encoding": "utf-8"
    });
    rr.on('readable', function() {
        var thisRead = rr.read();
        if (typeof thisRead !== 'object') {
            toSocket.write(thisRead);
        }
        console.log('readable:', thisRead);
    });
    rr.on('end', function() {
        console.log('end');
    });
}
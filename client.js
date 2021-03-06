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
var STANDARD = require('./standard');
var help = "help/usage";
help += "\n command requires a single argument(host/uri)";
help += "\n example www.devleague.com/apply";

var RequestData = require('./RequestData');
var requestData = new RequestData();

var net = require('net');
//var standard=require('standard');

var host;
var uri;
var port = 80;

var responseHeaders;
var statusLine;

var moreQuestions = true;

var args = process.argv;

var stdInProcess = process.stdin;
stdInProcess.setEncoding('utf-8');

var stdOutProcess = process.stdout;
stdOutProcess.setEncoding('utf-8');

var client;


/**
 * Process Arguments
 * if no arguments display
 */
if (verifySetArguments()) {
    if (host == 'localhost') {
        port = 6969;
    }

    setConnection(port, host);

}





stdInProcess.on('data', function(dataIn) {
    console.log(dataIn);
    //        console.log('wrote to server');
    //     });

});



function setConnection(thisPort, thisHost) {
    client = net.createConnection({
        port: thisPort,
        host: thisHost
    }, function(responseData) {
        console.log('connetect');
    })


    console.log('set Client');

    client.on('data', function(responseData) {
        console.log('****** Data ******** \n\n' + responseData.toString());

        responseHash = setResponseHash(responseData.toString());


    });

    client.on('error', function(err) {
        console.log(err);
    });
}


function sendRequest(requestDataToSend) {
    client.write(requestDataToSend, function() {
        console.log('\n sent Request');
    })
}



function verifySetArguments() {
    if (args.length != 3) {
        console.log(help);
    } else {
        return setArguments(args)
    }

    return false;
}

function setArguments(argsToSet) {
    var argValues = argsToSet[2].split('/');

    if (argValues.length == 2) {
        host = argValues[0];
        uri = argValues[1];
        console.log('host:' + host + ' uri:' + uri);
        return true;
    } else {
        console.log(help);
        return false;
    }
}

function setResponseHash(hashThis) {
    var lines = hashThis.split('\n');
    var returnHash = {};

    lines.forEach(function(line, index) {
        if (index == 0) {
            statusLine = line;
        } else {


            var lineArray = line.split(':');

            if (lineArray.length == 2) {
                // console.log('******* Array **********');
                //  console.log(lineArray);
                returnHash[lineArray[0].trim()] = lineArray[1].trim();
            }
        }
    });


    return returnHash;
};
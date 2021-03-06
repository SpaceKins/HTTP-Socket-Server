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

var responseHeaders;
var statusLine;

var moreQuestions = true;

var args = process.argv;
//console.log(args);

//var thisPort = 6969; //80
//var thisHost = "localhost"; //"localhost"; //"www.google.com";

/*
var requestHeader = requestData.RequestGetHeader(thisHost, "HEAD");
console.log(requestHeader);
*/

var initialQuestions = {
    "Which source do you want": "",
    "Method Type": ""
    //   ,"Display Headers?(y/n)": ""
    //   ,"Which Port To use?": ""
};
var lastQuestionKey = "";
//thisHost="www.devleague.com";


var stdInProcess = process.stdin;
stdInProcess.setEncoding('utf-8');

var stdOutProcess = process.stdout;
stdOutProcess.setEncoding('utf-8');

var client;






stdInProcess.on('data', function(dataIn) {
    initialQuestions[lastQuestionKey] = dataIn.substring(0, dataIn.length - 1);
    console.log(dataIn);
    console.log('More Questio =' + moreQuestions);
    if (moreQuestions) {
        goThroughQuestions();
    }
    else
    {
      client.write('test',function(){
        console.log('wrote to server');
      });
    }
});

//goThroughQuestions();



/* = net.createConnection({
    port: thisPort,
    host: thisHost
}, function(responseData) {
    // startSession();
    // 
    // 

})
*/

function setConnection(thisPort, thisHost) {
    client = net.createConnection({
        port: thisPort,
        host: thisHost
    }, function(responseData) {
        // startSession();
        // 
        // 

    })


    console.log('set Client');

    client.on('data', function(responseData) {
        console.log('****** Data ******** \n\n' + responseData.toString());


        responseHash = setResponseHash(responseData.toString());

        //console.log(responseHash);
        //

        client.on('error', function(err) {
            console.log(err);
        });

    });


}


function sendRequest(requestDataToSend) {
    client.write(requestDataToSend, function() {
        console.log('\n sent Request');
    })
}

/*
client.write(requestHeader, function() {
    console.log('wrote');
})
*/
/*
client.on('connect',function(data){
  console.log('in Connect' + data);
})
*/






/**
 * Process Arguments
 * if no arguments display
 */
verifySetArguments();



function startSession() {
    console.log('Connected');

    //  goThroughQuestions();
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



function goThroughQuestions() {
    if (moreQuestions) {
      //  console.log(initialQuestions);
        var thesekeys = Object.keys(initialQuestions);

        console.log(thesekeys);

        for (var i = 0; i < thesekeys.length; i++) {
            if (initialQuestions[thesekeys[i]] == "") {

                lastQuestionKey = thesekeys[i];
              //  console.log('last key =' + lastQuestionKey);

                stdOutProcess.write(thesekeys[i] + "?\n");
                // moreQuestions=true;
                return false;
            }
        }

        console.log('No more initial Questions');
        var testRequestHeader = requestData.RequestGetHeader(initialQuestions['Which source do you want'], initialQuestions['Method Type']);
        console.log(testRequestHeader);

        //setConnection(80, 'google.com');
        setConnection(6969, 'localhost');
        sendRequest(testRequestHeader);

        moreQuestions = false;
    }
    moreQuestions = false;
    return true;
}
module.exports = RequestData;

function RequestData() {
    var _this = this;

    _this.RequestGetHeader = function(thisHost, method) {
        var currentDate = new Date();
        var newDate = currentDate.getTime() + (10 * 3600000);
        var thisMethod = (method == "" ? "GET" : method);

        var gmtDate = new Date(newDate);
        var gmtDateString = gmtDate.toString().replace(/-1000 \(HST\)$/, "");
        console.log(gmtDateString);
        var resource=" / ";
        var host;
        var hostArray=thisHost.split("/");

        host=hostArray[0];
        if(hostArray.length>1){
          
          resource=" /" +hostArray[1];
        }

        var returnHeader = thisMethod + resource + " HTTP/1.1"; //"GET / HTTP/1.1";
        returnHeader += "\nHost: " + host;
        returnHeader += "\nUser-Agent: curl/7.47.0";
        returnHeader += "\nAccept: */*";
        returnHeader += "\nDate:" + gmtDateString;
        returnHeader += "\n\n";

        return returnHeader;
    }


}
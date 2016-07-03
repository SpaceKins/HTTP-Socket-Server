module.exports = ResponseData;

function ResponseData() {
    var _this = this;

    _this.ResponseGetHeader = function() {
        var currentDate = new Date();
        var newDate = currentDate.getTime() + (10 * 3600000);

        var gmtDate = new Date(newDate);
        var gmtDateString = gmtDate.toString().replace(/-1000 \(HST\)$/, "");
        console.log(gmtDateString);

        var returnHeader = "HTTP/1.1 200 OK"; //"GET / HTTP/1.1";
        returnHeader += "\nConnetion: keep-alive";
        returnHeader += "\nContent-Type: text/html; charset=utf-8";
        returnHeader += "\nDate:" + gmtDateString;
        returnHeader += "\n\n";

        return returnHeader;
    }


}
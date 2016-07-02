module.exports = RequestData;

function RequestData(){
 var _this=this;

  _this.RequestGetHeader=function (host,method){
   var currentDate=new Date();
   var newDate=currentDate.getTime() + (10*3600000);
   var thisMethod=(method==""?"GET":method);

var gmtDate= new Date(newDate);
var gmtDateString=gmtDate.toString().replace( /-1000 \(HST\)$/, "" );
console.log(gmtDateString);


   var returnHeader=thisMethod +" / HTTP/1.1"; //"GET / HTTP/1.1";
   returnHeader += "\nHost: " + host;
   returnHeader += "\nUser-Agent: curl/7.47.0";
   returnHeader += "\nAccept: */*";
   returnHeader += "\nDate:" + gmtDateString;
   returnHeader +="\n\n";

   return returnHeader;
  }
}
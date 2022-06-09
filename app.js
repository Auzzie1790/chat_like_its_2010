// include dependencies:
var websocket = require("websocket").server;
var http = require("http");
var path = require("path")
var fs = require("fs");
// local variables:
var express=require("express");
var username = "You";
const port = process.env.PORT || 3001;

const app = express();
// create server, and have listen on port 3001:
var server = http.createServer( app

);
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(express.static('public'))
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'public/index.html'))
})
server.listen(port, function() {
    console.log("Server listening on port " + port);
});

var ws_server = new websocket({
    httpServer: server
});


// on server request, send message:
ws_server.on("request", function(req) {
    var connection = req.accept(null, req.origin);

    connection.on("message", function(message) {
        connection.send(message.utf8Data);
    });
});
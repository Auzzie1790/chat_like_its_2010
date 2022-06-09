// include dependencies:
var websocket = require("websocket").server;
var http = require("http");
var path = require("path")
var fs = require("fs");
// local variables:
var username = "You";
const port = process.env.PORT || 3001;


// create server, and have listen on port 3001:
var server = http.createServer(
    function(req, res) {
       console.log(req.url)
    if(req.url==="/") {
      //  res.sendFile(path.join(__dirname,'index.html'))
      fs.readFile(path.join(__dirname,'index.html'),function(err, data) {
        res.writeHead(200, {
            'Content-Type':'text/html'
        })
        res.write(data)
        res.end()
      })
    }
    else {
      console.log('req.url wrong')
      res.end()
}}
);

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
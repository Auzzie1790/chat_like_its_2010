// include dependencies:

var websocket = require("websocket").server;
var http = require("http");
var path = require("path")
//server
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection.js');

const app = express();
const PORT = process.env.PORT || 3001;

// create server, and have listen on port 3001:
var server = http.createServer( app

);
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(express.static('public'));
// turn on routes
app.use(routes);
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'public/index.html'))
});

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on port ' + PORT));
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
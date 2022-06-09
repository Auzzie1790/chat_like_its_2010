// include dependencies:
var websocket = require("websocket").server;
var http = require("http");
var path = require("path")
var fs = require("fs");
const db = require("./config/connection.js");
//server
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// create connection to our database, pass in your MySQL information for username and password
const sequelize = new Sequelize('chat_like_its_2010', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
  
  module.exports = sequelize;

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
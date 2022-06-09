// include dependencies:
var websocket = require("websocket").server;
var http = require("http");
var path = require("path")
var fs = require("fs");
var express = require("express");
const session = require("express-session");
// TO-DO: UNCOMMENT THE FOLLOWING LINE ONCE THIS BRANCH AND THE SQL BRANCH GET MERGED
//const SequelizeStore = require("connect-session-sequelize")(session.Store);

// local variables:
const app = express();
var username = "You";
const port = process.env.PORT || 3001;

// create server, and have listen on the appropriate port:
var server = http.createServer(app);

const sess = {
    secret: "Super secret secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
// TO-DO: UNCOMMENT THE FOLLOWING THREE LINES ONCE THIS BRANCH AND THE SQL BRANCH GET MERGED
    //store: new SequelizeStore({
    //    db: sequelize
    //})
};

app.use(session(sess));

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
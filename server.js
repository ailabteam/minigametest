var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("View engine", "ejs");
app.set("views", "./views");
app.use("/scripts", express.static(__dirname + "/node_modules/web3.js-browser/build/"));


var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

//app.use(express.json());


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://minigame:xbQEpfNW4JwZk7M3@cluster0.peinj.mongodb.net/Minigame?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err) {
        console.log("Mongo connected error! " + err);
    }
    else {
        console.log("Mongo connected successfully!");
    }
});

require("./controllers/game")(app);



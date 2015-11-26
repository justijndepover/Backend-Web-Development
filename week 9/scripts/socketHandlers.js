/*
 * sockets met server dependancy 
 *      1. meerdere socket types( events)
 *      2. server emit "login" om login procedure te starten
 *      3. socket array om meerdere sockets bij te houden 
 *      4. socket communicatie in JSON.stringify(obj)
 * 
 */
var socketHandlers = function (httpServer) {
    var io = require("socket.io").listen(httpServer);
    console.log("listening on", httpServer.address());
    
    io.sockets.on('connection', function (socket) {
        console.log("sockets connected on", httpServer.address());
        socket.color = "#" + (Math.round(Math.random() * 0XFFFFFF)).toString(16);
        
        //server login event triggert de gebruiker éénmalig om in te loggen 
        socket.emit('login');
        
        //---
        socket.on('login', function (username) {
            socket.username = username;
            socket.emit("serverMessage", JSON.stringify({ color: socket.color , id : socket.id , content: "Je bent ingelogd als " + username }));
            socket.broadcast.emit("serverMessage", username + " is ingelogd");
        });
        
        socket.on('message', function (content) {
            //emit laat toe een json object te sturen
            var obj = { color: socket.color , id : socket.id , content: content };
            
            socket.emit('serverMessage', JSON.stringify(obj)); //naar zichzelf
            socket.broadcast.emit('serverMessage', JSON.stringify(obj)); // naar andere clients only
        });
     
    });
};
module.exports.getHandlers = socketHandlers;
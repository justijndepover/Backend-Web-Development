/*
 * 
 * chat.js met text input 
 * 
 * 
 * 
 */
console.log("chat.js loaded");

var client = {};
client.chat = (function (txtInput, txtMessages) {
    var connection = window.location.origin, //kan 1337 zijn  bij debuggen
        socket = io.connect(connection);
    
    ////var socket = io.connect("http://localhost:4000");
    ////var socket = io.connect("http://localhost:4000/myNameSpace");
           
      var  lastMsg; //div element met client message 

    socket.on('login', function () {
        var username = prompt('Kies een gebruikersnaam');
        socket.emit("login", username);
    })
    
    socket.on("serverMessage", function (json) {
        showMessage(JSON.parse(json));
    })
    
    var lastMsg; //bijhouden laatste message div voor insertBefore 
    function showMessage(obj) {
        var messages = document.getElementById(txtMessages),      
            newMsg = document.createElement("div");

        newMsg.appendChild(document.createTextNode(obj.id + " said: " + obj.content));
        newMsg.style.color = obj.color;
        
        messages.insertBefore(newMsg, lastMsg)
        lastMsg = newMsg;
    }
    
    var onkeydown = function (keyboardEvent) {
        var inpClient = document.getElementById(txtInput);     
        if (keyboardEvent.keyCode === 13) {
            socket.emit('message', inpClient.value);
            inpClient.value = '';
            return false;
        } else {
            return true;
        }
    };
    
    var addHandlers = function () { 
        inpClient.addEventListener("keydown", onkeydown);
    }
    
    var start = function () {
        document.addEventListener("DOMContentLoaded", function (event) {
            console.log("DOMContentLoaded and parsed");
            addHandlers();
        });     
    }
    
    return {
        start: start(),
        addHandlers: addHandlers //unobtrusive handlers toevoegen 
    }

})('inpClient', 'messages');

client.chat.start;
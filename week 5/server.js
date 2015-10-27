var net = require('net');
//1. aanmaken van de TCP server

var socket = [];

var server = net.createServer(
    //3. Connection listener
    function (socket) {
        //elke binnenkomende connectie verwerken
        console.log("server heeft nieuwe connectie");
        socket.setEncoding('utf8');
        socket.write("Dit is een customised boodschap voor de client.")
        socket.on("data", function (data) {
            //ontvangst van browser headers of van cliënt data.
            if (data) {
                console.log("ontvangen data: " + data )
            }
            return socket.end();//beëindigt wel de socket
        });
        socket.on("end", function (data) {
            console.log("Goodbye. Client connectie is beëindigd.");
        });

    })


//2. TCP server luistert naar poort 1337 (listening listener)
server.listen(1337, function () {
    console.log("luisteren naar poort" + server.address().port);
});


//4. error handling
server.on("error", function (error) {
    if (error.code === "EADDRINUSE") {
        console.log("Deze poort is reeds in gebruik");
    } else {
        console.log("Fout"+ error.message);
        // server.close();
    }
});
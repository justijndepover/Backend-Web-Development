/*
 * Oefening 12a : TCP client voor chatter
 * Server connectie blijft open tot de cliënt met 3*quit afsluit.
 *
 * */

var net = require("net");
var client;

var port = 1337;

var retryTimeout = 2000;
var nmbrRetries = 0;
var maxNmbrRetries = 3;

process.stdin.on("data", function (data) {
    //verbreek client connectie bij keyboard input "quit"
    //toString en trim is een  must (eventueel toLowerCase()).
    if (data.toString().toLowerCase().trim() === "quit") {
        client.end();
    } else {
        //process.stdin.pipe(client);
        client.write(data);
    }
});


//self executing
(function connect() {
    client = net.connect(port, "localhost", function () {
        console.log("client maakt verbinding");
        client.write("hier een boodschap van de TCP client");
    });

    client.on("error", function (error) {
        console.log("Error bij de client connectie", error);
    });

//indien connectie afgesloten door de server met bvbv. socket.end()
    client.on("close", function () {
    console.log(" client connectie afgesloten. Er gebeurt een reconnect poging");
    reconnect();
});

function reconnect() {
    if (nmbrRetries === maxNmbrRetries) {
            console.log("Maximum aantal retries is bereikt.");
        //throw new Error("Maximum aantal retries is bereikt.")
    } else {
        nmbrRetries += 1;
        setTimeout(connect, retryTimeout);
    }
}

//uitschrijven van ontvangen serversockets op de client
client.pipe(process.stdout, { end: false });
})();

//geen timeout gebruiken: sluit connectie af => ECONNRESET error. 

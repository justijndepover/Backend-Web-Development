var net = require("net");
var client = net.connect(1337, "localhost", function () {
    console.log("client maakt verbinding");
    //3. client (connectie) is een stream en kan dus read/write methodes uitvoeren
    client.write("hier een boodschap van de TCP client");
});
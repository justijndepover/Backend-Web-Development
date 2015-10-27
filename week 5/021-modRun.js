/*
 * Oproepen en runnen  van module Loader.js
 * 
 * 
 */ 

//vergeet het puntje NIET bij relatieve adressering!!!
var Loader = require("./021-modLoader.js");
require("./023-extension.js");

var users = [];
var usersIds = ["P1".encrypt(), "P2".encrypt(), "P3".encrypt(), "P4".encrypt(), "ERROR", "P6".encrypt(), "P7".encrypt(), "P8".encrypt(), "P9"];

Loader.loadArrayAsync(users, usersIds, function (err, arr, duration) {
    if (err) {
        console.log(err);
    } else {
        console.log("Doorlooptijd van de Loader module:" , duration);
    }   
});


setTimeout(function () { process.exit(); } , 15000);
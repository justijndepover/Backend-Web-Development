var Loader = require('./022-ctorLoader.js');
var StringExtensions = require("./023-extension.js");


var users = [];
var usersIds = ["P1", "P2", "P3", "P4", "ERROR", "P6", "P7", "P8", "P9"];

var loader = new Loader();

loader.loadArrayAsync(users, usersIds, function (err, arr, duration) {
    if (err) {
        console.log(err);
    } else { 
        console.log("ctor doorlooptijd bedraagt :", duration);   
    }
})

setTimeout(function () { process.exit() }, 15000 );
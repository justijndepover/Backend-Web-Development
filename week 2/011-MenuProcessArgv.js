/*
 * 
 * Basic REPL menu en process argv toepassing
 * 
 */


"use strict";
//process.argv.forEach(el, function () { })


function showHelp() {
    var menu =" ";
    menu += "\nMijn installatie menu:";
    menu += "\n";
    menu += "\n--help \t \t show help";
    menu += "\n--name {NAME} \t Welkom {NAME} ";
    console.log(menu);
}

if (process.argv[2] === "--help" || !process.argv[2]) {
    showHelp();
}

if (process.argv[2] === "--name") {
    console.log("Welkom", process.argv[3]?process.argv[3]:"" );
}

setTimeout(function () { process.exit(); }, 15000);
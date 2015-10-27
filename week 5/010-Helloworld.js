/*
 * 010. First basic steps in Node with Hello world 
 * 
 * 
 */
/*jshint strict:false */
"use strict";

//1) Main process in node is "process"
process.stdout.write("Hello World met process.stdout.");
console.log("Hello World met console.log"); //wrapper rond process.stdout

//2) Hello world met een synchrone Hello en een async World. 
setTimeout(function () {
    var naam = process.argv[2]? "- Welcome" + process.argv[2] : " - Welcome to node.";
    console.log(" from the ASYNC WORLD" , naam);
}, 10);

console.log("Sync: Hello");

//3) for lus is synchroon , forEach is trager in uitvoering maar wel asynchroon

//3.1-snelle for lus
console.log("\n");
for (var i = process.argv.reverse().length - 1; i >= 0 ; i--) {
    console.log("fast for: ", process.argv[i].toString());
}

//3.2-trage for lus = for( var i in process.argv.length)
console.log("\n");
for (var i in process.argv.reverse()) {
    if (process.argv.reverse().hasOwnProperty(i))
        console.log("slow" , process.argv[i].toString());
}

//3.3-beste for lus indien asynchroon nodig is ( bvb. veel I/O)
console.log("\n");
process.argv.reverse().forEach(function (x) {
    console.log("async", x.toString());
});



setTimeout(function () { process.exit(); }, 25000);
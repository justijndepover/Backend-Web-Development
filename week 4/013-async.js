/*
 * Synchroon werken  = blokkerend bij I/O. 
 * Asynchroon werken = event loop onderhoudt queue van events 
 * 
 * @version v1.0.0
 * @author me 
 * 
 */
"use strict";

//SYNCHRONUOUS LOADING ---------------------------

var users = [];
var usersIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var delay = 1000;

function loadSync(element) {
    sleep(delay);
    return "element " + element + " loaded";
}

//monitoren van synchrone doorlooptijd
function loadArraySynchroon(array, elements) {
   start = new Date().getTime();
    for (var element in elements) {
        array[element] = loadSync(element);
        console.log(array[element]);  // informatie wanneer ingeladen 
    }
    return (new Date().getTime() - start) + "\n";
}
console.log("synchronous load time ", loadArraySynchroon(users , usersIds));

// ASYNCHRONUOUS loading --------------------------------
var users = [];//reïnitialize
var start;  //reïnitialize

var loadAsync = function (element , cb) {
    setTimeout(function () { cb(element + " is loaded"); }, 1000);
};

var loadArrayAsync = function (arrayA , elements, cb) {
    start = new Date().getTime(); //reïnitialize 
    var counter = 0;
    
    for (var element in elements) {
        loadAsync(element, function (element) {
            arrayA[counter] = element; //undefined
            console.log(arrayA[counter]);
            if (++counter === usersIds.length) {
                cb(arrayA);
            }
        });
    }
    
    //forEach is slower?  
};

////Niet hier cb oproepen (= start direct synchroon)  -> >>nesten van callbacks
//if (++counter === elements.length) {
//    console.log(new Date().getTime() - starta) //0
//    cb(arrayA);
//}

loadArrayAsync(users, usersIds, function () {
    console.log(" tijd bedraagt:" , new Date().getTime() - start);
});

//HELPERS---------------------------- 
function sleep(time) {
    var start = new Date().getTime();
    while (new Date().getTime() - start < time) { 
    //just wait
    }
}


setTimeout(function () { process.exit(); }, 25000);
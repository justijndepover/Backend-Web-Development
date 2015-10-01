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
var usersIds = ["P1", "P2", "P3", "P4", "ERROR", "P6", "P7", "P8", "P9", ];
var delay = 1000;

function loadSync(element) {
    sleep(delay);
    return "element " + element + " loaded";
}

//monitoren van synchrone doorlooptijd
function loadArraySynchroon(array, elements) {
   start = new Date().getTime();
    for (var element in elements) {
        array[element] = loadSync(elements[element]);
        console.log(array[element]);  // informatie wanneer ingeladen
    }
    return (new Date().getTime() - start) + "\n";
}
console.log("synchronous load time ", loadArraySynchroon(users , usersIds));

// ASYNCHRONUOUS loading --------------------------------
var users = [];//reïnitialize
var start;  //reïnitialize

var loadAsync = function (element , cb) {
    if (element == "ERROR") {
        cb("ERROR", null);
    }else{

    }
    setTimeout(function () { cb(element + " is loaded"); }, 1000);
};

var loadArrayAsync = function (arrayA , elements, cb) {
    start = new Date().getTime(); //reïnitialize
    var counter = 0;

    for (var element in elements) {
        var sElement = elements[element];
        loadAsync(sElement, function (err, element) {
            if (err) {
                arrayA[counter] = element;
                cb(err, null);
            }else{
                arrayA[counter] = element; //undefined
                console.log(arrayA[counter]);
                if (++counter === usersIds.length) {
                    cb(arrayA);
                }
            }
        });
    }

    //forEach is slower?
    //forEach return niet index maar wel element!
    elements.forEach(function(element, index){
        loadAsync(element, function (err, element) {
            if (err) {
                arrayA[index] = element;
                cb(err, null);
            }else{
                arrayA[index] = element; //undefined
                console.log(arrayA[index]);
                if (++index === usersIds.length) {
                    cb(arrayA);
                }
            }
        });
    });
};

////Niet hier cb oproepen (= start direct synchroon)  -> >>nesten van callbacks
//if (++counter === elements.length) {
//    console.log(new Date().getTime() - starta) //0
//    cb(arrayA);
//}

loadArrayAsync(users, usersIds, function (err, arr) {
    arr = "";
    if(err){
        console.log(err);
    }
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

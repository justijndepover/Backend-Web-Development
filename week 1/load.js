//Synchroon
var users = []
var userIds = [1,2,3,4,5,6,7,8,9]
var delay = 1000

function loadSync(element){
    sleep(delay);
    return "element " + element + " loaded";
}

function loadArraySynchroon(array, elements){
    var start = new Date().getTime();
    for(element in elements){
        array[element] = loadSync(element);
        console.log(array[element]);
    }
    return (new Date().getTime() - start) + "\n";
}

function sleep(time){
    var start = new Date().getTime();
    while(new Date().getTime() - start < delay){
        //sleep
    }
}

console.log("synchronous load time", loadArraySynchroon(users, userIds));


//Asynchroon
var start = new Date().getTime();
function loadAsync(element, cb){
    setTimeout(function(){
        cb("element " + element + " loaded async");
    }, delay)
}

function loadArrayAsync(arrayA, elements, cb){
    var counter = 0;
    for(var element in elements){
        loadAsync(element, function(element){
            arrayA[element] = element;
            console.log(arrayA[element])

            if (++counter === elements.length) {
                cb(arrayA)
            };
        });
    }
    //Niet hier -> callback nog lopende
    //  console.log(new Date().getTime() - starta) //0
    //cb(arrayA)
}

loadArrayAsync(users, userIds, function(users){
    console.log("async loadtime :", (new Date().getTime() - start))
})

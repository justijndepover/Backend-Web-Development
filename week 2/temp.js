for (var i = 0; i < 10; i++) {
    setTimeout(function(){
        console.log(i);
    }, 0)
}


var checkMyScope = function(a, b){
    var counter, init;

    counter = 0;
    console.log("counter terurnt hier ", ++counter);

    console.log("en hier is de waarde van init: ", init);
    init = 10;
    if (true) {
        var message = "iets";
    }

    console.log(message);
}

checkMyScope();

var processData = function(x){
    var init = 2, key = 10;
    //closure
    function secretCalc(y){
        console.log(x + 2 * y + (++init));
    }
    secretCalc(key);
}

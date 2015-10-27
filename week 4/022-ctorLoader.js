/*
 * constructor pattern voor Loader
 * 
 */

var Loader, module; 

Loader = function (array, elements) {
    //private variabelen
    var author = "Johan";
    var self = this;
    
    //publieke eigenschappen voor initialisatie
    this.array = array;
    this.elements = elements;
    
    //pseudo-classe ( variabele zonder instantie/prototype)
    Loader.subject = "Gebruik van het constructor pattern";
};

Loader.prototype = {
    //instance properties 
     //startTime: this.startTime? this.startTime: new Date().getTime(),
    self: this,
    
    _startTime: "",
    get startTime() { return _startTime ? _startTime:new Date().getTime(); },
    set startTime(value) { _startTime = value; },
    
    //instance methods 
    duration: function () { return (new Date().getTime() - this.startTime); } ,   
    loadAsync: function (element , cb) {
        if (element === "ERROR") {
            cb("ERROR" , null);
        } else {
            setTimeout(function () { cb(null, element + " is loaded"); }, Math.floor(Math.random()*1000));
        }
    },
    
    loadArrayAsync: function (arrayA , elements, cb) {
        this.startTime = new Date().getTime(); //reïnitialize 
        var counter = 0;
        
        for (var element in elements) {
            if (element) {
                var sElement = elements[element];
                //this = prototype
                this.loadAsync(sElement, function (err, element) {                   
                    counter++;
                    if (err) {
                        arrayA[counter] = err;
                        cb(err, null);
                    } else {
                        arrayA[counter] = element; //undefined  
                        console.log(element);                                                            
                    }                    
                    if (counter === elements.length) {
                        cb(null, arrayA , Loader.prototype.duration());
                    }
                });
            }
        }     
    },
    loadSeries : function(output, input, cb){
        var series = function(element){
            if(element){
                this.loadAsync(element, function(err, result){
                    if(err){
                        emitter.emit("error", element);
                    }else{
                        output.push(result);
                    }
                    series(input.shift());
                })
            }else{
                cb(null, output, loader.prototype.duration());
            }
        };
        series = (input.shift());
    }
};


module.exports = Loader;  // het constructor object exporteren 
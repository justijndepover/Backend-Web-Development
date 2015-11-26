/**
 * getAPIData.js
 * 
 * Haalt data op als node cliënt van een 
 * configureerbare API
 */

var getAPIData = (function () {
    var http = require("http");
    var EventEmitter = require('events').EventEmitter;    
    var emitter = new EventEmitter();
    
    var options = {
        method: 'GET',
        host: 'api.flickr.com',
        path: '/services/feeds/photos_public.gne?format=json&tags=NMCT&jsoncallback=?' + (new Date()).getTime() //gn caching
    }

    var clean = function(json){
        json = json.substring(1, json.length -1);
        json = json.replace(/\\\'/g, '');
        return json;
    }

    var on = function(evt, cb){
        emitter.on(evt, cb);
    }
    
    var callAPI = function (search, apiOptions, req, res) {
        // getAPIData = new EventEmitter();
        options = apiOptions? apiOptions: options;

        http.request(options, function (response) {            
            var json = "";
            
            response.on("data", function (chunck) {
                json += chunck;
            })
            
            response.on("end", function () {
                res.statusCode = 200;
                res.write(JSON.stringify(clean(json)));
                res.end();

                emitter.emit("apiData", clean(json));
            })
        
        }).end();  //end niet vergeten!
    }
    
    return {
        on: on,
        callAPI : callAPI ,
        options : options // wordt zo configureerbaar
    };
    
})();

module.exports = getAPIData;
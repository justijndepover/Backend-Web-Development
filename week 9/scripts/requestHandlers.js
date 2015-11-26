/*
 * LABO: requestHandlers.js 
 * 
 * middleware 
 * Zorgt voor lezen van html, lezen van API, ophalen images..
 * 
 */

var path = require("path"),
    fs = require("fs"), 
    url = require('url'),
    querystring = require('querystring'),
    multiparty = require('multiparty'); //multipart form data

//private :
var extensions = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".mp4": "video/mp4",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".ico": "image/x-icon"
};

//1. requesthandlers ----------------------------------
var getFile = function (filename, req, res, callback) {
    //veronderstel dat juiste map opgevraagd is in filename (= gn http eigenschap)
    var ext = path.extname(filename),
        localPath = path.resolve(process.cwd() + filename); //gn localMaps path.normalize
    
    fs.stat(localPath, function (error, stats) {
        if (stats && stats.isFile) {
            fs.readFile(localPath, function (err, contents) {
                if (err) {
                    callback("lees fout", null);
                } else {
                    if (callback && typeof (callback) === "function") {
                        callback(null, contents, extensions[ext]);
                    }
                }
            });
        } else {
            callback("file niet gevonden", null , extensions[".html"]);
                
        }
    });
};
var apiData = function (req, res) {
    var getAPIData = require("./getAPIData.js"),
        qryParts = url.parse(req.url).query.split("="); //array  
    
    var apiOptions = {
        method: "GET",           
        port: 80,
        host: 'api.flickr.com' ,
        path: '/services/feeds/photos_public.gne?format=json&tags=' + qryParts[1] + '&jsoncallback=?'
    };
    //API oproepen                    
    getAPIData.callAPI(qryParts[1], apiOptions, req, res); //options toevoegen
    
    //ofwel een cb , ofwel een emitter.
    getAPIData.on('apiData', function (jsonItems) {
        // not a function (emitter) yet 
        console.log("emitted " , jsonItems.length , " items.");
    });
};

//2. exporteren van de middleware (functies)
exports.getFile = getFile;
exports.apiData = apiData;
exports.root = root;

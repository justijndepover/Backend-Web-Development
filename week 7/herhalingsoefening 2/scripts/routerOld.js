/*
 * router.js
 * 
 * 
 */

var router = function () {
    "use strict";
    var fs = require("fs"),
        path = require("path"),
        url = require("url"),
        extensions = {
            ".html": "text/html",
            ".css": "text/css",
            ".js": "application/javascript",
            ".mp4": "video/mp4",
            ".png": "image/png",
            ".jpg": "image/jpeg",
            ".ico": "image/x-icon"
        },
        localMaps = {
            ".html": "/public/",
            ".css": "/public/css/",
            ".js": "/public/javascript/",
            ".mp4": "/public/video/mp4/",
            ".png": "/public/images/",
            ".jpg": "/public/images/",
            ".gif": "/public/images/",  
            ".ico": "/public/images/"
        };
         
    var routeURL = function (fullUrl, callback) {
      
        console.log("uri: " , fullUrl.pathname);
        
        switch (fullUrl.pathname) {
            case "/apiData":
                var getAPIData = require("./getAPIData.js"),
                    qryParts =fullUrl.query.split("="); //array  
                
                //API oproepen                    
                //1. ofwel met cb
                //getAPIData.callAPI(qryParts[1], apiOptions, function (err, data) {
                //    if (err) { callback(err, null); } else {
                //          if (callback && typeof (callback) === "function") {
                //              callback(null, data);
                //          }                    
                //    }                                 
                //});
                
                //2. ofwel met emitter
                getAPIData.callAPI(qryParts[1]);               
                break;
            default:
                var filename = path.basename(fullUrl.pathname) || "index.html",
                    ext = path.extname(filename),
                    localPath = process.cwd() + localMaps[ext] + filename;               
                getFile(filename, function (err, data) {                 
                    if (err) { callback(err, null) } else { 
                        callback(null, data , extensions[ext]);                    
                    };

                });
        }
    },      
        getFile = function (filename, callback) {            
            var ext = path.extname(filename),
                localPath = path.resolve(process.cwd() + localMaps[ext] + filename);
            
            fs.stat(localPath, function (error, stats) {
                if (stats && stats.isFile) {
                    
                    fs.readFile(localPath, function (err, contents) {
    
                        if (err) {
                            callback("lees fout", null)
                        } else {
                            if (callback && typeof (callback) === "function") {
                                callback(null, contents, extensions[ext]);
                            }
                        }
                    });
                } else { 
                    callback("file niet gevonden", null);
                
                }
            });
        },
        init = function (filename, callback) {
            routeURL(filename, callback);
        };
    return {
        init: init
    };
}();

module.exports = router;
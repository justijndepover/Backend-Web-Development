/***
 * router.js 
 * 
 * maakt gebruik van de handlers, aangebracht via dependancy
 */

var path = require('path');

var localMaps = {
    ".html": "/public/",
    ".css": "/public/css/",
    ".js": "/public/javascripts/",
    ".png": "/public/images/",
    ".gif": "/public/images/",
    ".jpg": "/public/images/",
    ".ico": "/public/images/"
};

var getRoute = function (handlers, request , response, callback) {
    var fullURL, basename , ext , pathname;
   
    fullURL = "/public/" + (path.basename(request.url)!== ""? request.url : "index.html");
    basename = path.basename(request.url) || "index.html";//inclusief querystring , zonder local map     
    pathname = "/" + basename.split("?")[0];
    ext = path.extname(basename);
    
    if ((typeof localMaps[ext] !== 'undefined' && !basename.split("?")[1])) {
        console.log("file loading " + fullURL);
        handlers['/getFile'](fullURL , request, response , function (err, data , mimeType) {
            if (err) {
                callback(err, null , mimeType);
            } else {
                callback(null, data, mimeType);
            }
            
        });
    } else if (typeof (handlers[pathname]) === "function") {
        //indien een middleware functie bestaat
        handlers[pathname](request, response);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, { "Content-Type": "text/html" });
        response.write("404 Not found");
        response.end();
    }
};
//}
module.exports.getRoute = getRoute;
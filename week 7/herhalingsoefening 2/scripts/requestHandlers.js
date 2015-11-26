/**
 * Created by justijndepover on 12/11/15.
 */


var path = require('path'),
    fs = require('fs'),
    url = require('url'),
    querystring = require('querystring');


var extensions = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".mp4": "video/mp4",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".ico": "image/x-icon"
}

var apiData = function(req, res){};

var getFile = function(uri, req, res, callback){
    //haal extensies op
    var filename = path.basename(uri.pathname) || "index.html",
        ext = path.extname(filename),
        //localPath = process.cwd() + localMaps[ext] + filename;
        localPath = path.resolve(process.cwd() + filename);


    //lees de file
    getFile(filename, function(err, data){
        fs.stat(localPath, function(err, stats){
            if(stats && stats.isFile){
                fs.readFile(localPath, function(err, contents){
                    if(err){
                        callback(err, null);
                    }else{
                        if(callback && typeof(callback)==="function"){
                            callback(null, data, extensions[ext])
                        }
                    }
                })
            }
        })

        if(err){
            callback(err, null)
        }else{
            callback(null, data, extensions[ext]);
        }
    });

}
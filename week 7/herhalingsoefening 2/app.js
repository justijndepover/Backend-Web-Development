/*
 * start file van de applicatie
 * node als api cliënt gebruiken
 */

"use strict";
//1. applicatie webserver opstarten, nodige packages ophalen

var requestHandlers = require('./scripts/requestHandlers.js'),
    router = require('./scripts/routerOld.js'),
    staticServer = require('./scripts/StaticServer.js');




//2. Middleware

var handlers = {};
//handlers["/"] = requestHandlers.root;
handlers["/getFile"] = requestHandlers.getFile;
handlers["/apiData"] = requestHandlers.apiData;
handlers["/upload"] = requestHandlers.upload;




//3. Initialiseren inclusief middleware as dependancy

staticServer.init(router, handlers, 8080);
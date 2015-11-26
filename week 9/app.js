/*
 * start file van de applicatie
 * 
 *   1. sockets handlers toevoegen (file)
 *   2. sockets handlers initialiseren als middleware
 *   3. socket server werkt via staticServer dependancy   
 */

"use strict";

//////1. applicatie webserver opstarten
////var staticServer = require("./scripts/StaticServer.js");
////staticServer.init(8080);

//1. Nodige middleware en scripts in app.js.
var requestHandlers = require("./scripts/requestHandlers.js"),
    socketHandlers = require("./scripts/socketHandlers.js"),
    router = require("./scripts/router.js"),
    staticServer = require("./scripts/staticServer.js"),
    httpPort = 4000;

//2. Alle handlers definiëren (leesbaar) in een literal object
//de handler zelf kan opgehaald via path.basename
var handlers = {};
handlers["/"] = requestHandlers.root;
handlers["/apiData"] = requestHandlers.apiData;
handlers["/getFile"] = requestHandlers.getFile;

//3. Initialisering van static server + TOEVOEGEN VAN SOCKETHANDLERS
staticServer.init(router , handlers , httpPort , socketHandlers);

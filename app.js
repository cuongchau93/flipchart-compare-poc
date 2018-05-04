"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const services = require('./services');
const serviceConfig = require('./config');
const routing = serviceConfig.routing;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Origin, X-Requested-With, Content-Type, Accept, userName, profileId, Content-Location, Location');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, userName, profileId, Content-Location, Location');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
    res.setHeader('Pragma', 'no-cache'); // HTTP 1.0.
    res.setHeader('Expires', 0); // Proxies.
    next();
});

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies
app.use(function(req, res, next) {
    if(['POST','PATCH'].includes(req.method)){
        let contentType = req.headers['content-type'];
        if (!contentType || contentType.indexOf('application/json') !== 0){
            return res.json({outcome: 'content_type_error',messages: ['Content type must be application/json']});
        }
    }
    next();
});

/********** routing **************/
// router.route(routing.compare)
//     .options(services.prepareToServe)
//     .get(services.prepareToServe)
//     .post(services.compare);
app.get(serviceConfig.prefix + routing.compare,services.prepareToServe);
app.post(serviceConfig.prefix + routing.compare,services.compare);
app.options(serviceConfig.prefix + routing.compare,services.prepareToServe);


// app.enable('strict routing');       // "compare" is different from "compare/"
// app.use(serviceConfig.prefix, router);

app.use(function (err, req, res, next) {
    let today = new Date().toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'});
    console.error('%s: [ERROR] Request URL: %s\nError Stack: %s', today , req.path, err.stack);
    res.status(400).send('No Response From Server. Error have been logged. Please double check!');
});

exports.app = app;
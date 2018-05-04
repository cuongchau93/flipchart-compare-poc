"use strict";

const app = require('./app').app;
const serviceConfig = require('./config');
const http = require('http');

let httpServer = http.createServer(app);
module.exports = httpServer.listen(serviceConfig.httpPort, function () {
    console.log('Compare Service is listening HTTP on port ' + serviceConfig.httpPort);
    require('./SupportedRoutesFinder')('', app._router.stack);
});

// add these lines for debugging only
// process.on('uncaughtException', function (err) {
//     console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
//     console.error(err.stack);
//     process.exit(1)
// });
//
// process.on('disconnect', function() {
//     console.error('parent exited. Disconnected');
//     process.exit();
// });
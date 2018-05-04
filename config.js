"use strict";

let config = require(process.env.QSN_CONFIG_LOCATION || "./configDev/config");

exports.prefix = config.prefix;
exports.httpPort = config.httpPort;
exports.routing = config.routing;


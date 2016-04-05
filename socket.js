module.exports = function (httpServer) {
    "use strict";
    var debug = require('debug')('ss-thermisto:server');
    var io = require('socket.io')(httpServer);

    debug ('Socket created');

    io.on('connection', function () {
        debug('A user connected');
    });

    return io;
};
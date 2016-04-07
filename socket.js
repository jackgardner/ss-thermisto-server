// const config = require ('./config');
const enums = require ('./lib/enums');

const gameState = {
    state: enums.GAME_STATE.LOBBY,
    players: []
};




// TODO Setup game on first join

module.exports = function (httpServer) {
    "use strict";
    var debug = require('debug')('ss-thermisto:server');
    var io = require('socket.io')(httpServer);
    var game = require('./lib/game')(io);
    return io;
};
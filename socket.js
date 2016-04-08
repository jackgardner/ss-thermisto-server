// const config = require ('./config');
const enums = require ('./lib/enums');
const socketioJwt = require('socketio-jwt');
const server_params = require('./config/server.json');

const gameState = {
    state: enums.GAME_STATE.LOBBY,
    players: []
};




// TODO Setup game on first join

module.exports = function (httpServer) {
    "use strict";
    var debug = require('debug')('ss-thermisto:server');
    var io = require('socket.io')(httpServer);
    /*io.set('authorization', socketioJwt.authorize({
      secret: server_params.token_secret,
      handshake: true
    }));*/
    var game = require('./lib/game')(io);
    return io;
};

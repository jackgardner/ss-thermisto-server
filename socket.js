// const config = require ('./config');
const enums = require ('./lib/enums');
const gameStore = require('./lib/gameStore');

const gameState = {
    state: enums.GAME_STATE.LOBBY,
    players: []
};
// TODO Setup game on first join

module.exports = function (httpServer) {
    "use strict";
    var debug = require('debug')('ss-thermisto:server');
    var io = require('socket.io')(httpServer);
    gameStore.forEach( function (item) {
      var nsp = io.of(`/${item._id}`);
      var game = require('./lib/game')(nsp);
    });
};

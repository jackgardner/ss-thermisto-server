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
    
  
    // io.on('connection', function (socket) {
    //
    //     socket.emit (enums.PACKET_TYPES.GAME_INFO, game);
    //
    //     // User has connected, so we need to send them initial game state
    //     // Create a character for this user
    //     const usersPlayer = {};
    //     usersPlayer._id = gameState.players.length + 1;
    //     usersPlayer.name = `An anonymous fool #${usersPlayer._id}`;
    //     usersPlayer.skills = enums.CHARACTER_SKILLS.map((skill) => { return { _id: skill._id, name: skill.label, currentValue: 0 } });
    //
    //     socket.emit(enums.PACKET_TYPES.YOUR_DETAILS, usersPlayer);
    //     gameState.players.push(usersPlayer);
    //
    //     io.emit(enums.PACKET_TYPES.STATE_CHANGE, gameState);
    //
    //
    //     socket.on(enums.PACKET_TYPES.LOBBY_STAT_ALTER, function (packet) {
    //         if(gameState.state !== enums.GAME_STATE.LOBBY) return;
    //
    //         const packetSkill = packet.skill;
    //         const skillFromConfig = enums.CHARACTER_SKILLS.find((characterSkill) => characterSkill._id === packetSkill);
    //
    //         if (!skillFromConfig) return;
    //         var usersSkill = usersPlayer.skills.find((skill) => skill._id === skillFromConfig._id);
    //
    //         switch (packet.direction) {
    //             case 'INC':
    //                     if (usersSkill.currentValue < 10) {
    //                         usersSkill.currentValue++;
    //                     }
    //                 break;
    //             case 'DEC':
    //                 if ((usersSkill.currentValue === 0 && !skillFromConfig.allowNegative)) {
    //                     return;
    //                 }
    //
    //                 if (skillFromConfig.currentValue > -4) {
    //                     usersSkill.currentValue--;
    //                 }
    //
    //                 break;
    //         }
    //
    //         io.emit(enums.PACKET_TYPES.STATE_CHANGE, gameState);
    //     });
    //
    //     socket.on('disconnect', function () {
    //         debug(`Player ${usersPlayer._id} disconnected`);
    //
    //         gameState.players = gameState.players.filter((player) => player._id !== usersPlayer._id);
    //
    //         io.emit(enums.PACKET_TYPES.PLAYER_DISCONNECT, usersPlayer._id);
    //         io.emit(enums.PACKET_TYPES.STATE_CHANGE, gameState);
    //     });
    // });



    return io;
};
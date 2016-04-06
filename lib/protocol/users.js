const enums = require ('../enums');
const Protocol = require('./index');

Protocol.attachCommand('users', 'yourDetails', function (player) {
  this.socket.emit(enums.PACKET_TYPES.YOUR_DETAILS, player);
});

Protocol.attachCommand('users', 'disconnect', function (player) {
  this.io.emit(enums.PACKET_TYPES.PLAYER_DISCONNECT, player._id);
  this.commands.game.stateChange(this.game.info);
});
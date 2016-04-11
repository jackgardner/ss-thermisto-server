const enums = require ('../enums');
const Protocol = require('./index');

Protocol.attachCommand('game', 'info', function () {
  this.socket.emit (enums.PACKET_TYPES.GAME_INFO, this.game.info);
});

Protocol.attachCommand('game', 'stateChange', function () {
  this.io.emit (enums.PACKET_TYPES.STATE_CHANGE, this.game.state);
});

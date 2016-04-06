const debug = require('debug')('ss-thermisto:error');
module.exports = {
  handleError: function (req, err) {
    req.connection.emit('ERROR', err);
    debug(`Player ${req.player._id}: ${err}`);
  },
  messages: {
    'GAME_NOT_IN_LOBBY': 'Game is not currently in Lobby',
    'INVALID_SKILL': 'Invalid skill name'
  }
};
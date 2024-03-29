module.exports = {
  handleError: function (req, err) {
    req.connection.emit('ERROR', err);
    req.connection.logger.error(`Player ${req.player._id}: ${err}`);
  },
  messages: {
    'INVALID_GAME_MODE': 'Invalid Game Mode',
    'GAME_NOT_IN_LOBBY': 'Game is not currently in Lobby',
    'INVALID_SKILL': 'Invalid skill name',
    'NO_SKILL_POINTS_AVAILABLE': 'No skill points left to allocate',
  }
};

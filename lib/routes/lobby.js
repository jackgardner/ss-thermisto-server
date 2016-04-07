const error = require('./error');
const enums = require('../enums');

const handleError = error.handleError;

module.exports = function (req) {
  req.connection.on(enums.PACKET_TYPES.LOBBY_STAT_ALTER, (packet, next) => {
    if (req.game.state.state !== enums.GAME_STATE.LOBBY) return handleError(req, error.messages.GAME_NOT_IN_LOBBY);
    if (!req.game.player.getPlayerSkill(packet.skill)) return handleError(req, error.messages.INVALID_SKILL);
    
    if (!req.game.player.hasAvailableSkillPoints()) return handleError(req, error.messages.NO_SKILL_POINTS_AVAILABLE);

    // Get a reference to the player

    switch (packet.direction) {
      case 'INC':
        req.player.incrementSkill(packet.skill);
        break;
      case 'DEC':
        req.player.decrementSkill(packet.skill);
        break;
    }

    req.protocol.commands.game.stateChange();
    next(true);
  });
};

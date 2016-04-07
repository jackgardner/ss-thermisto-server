const error = require('./error');
const enums = require('../enums');

const handleError = error.handleError;

module.exports = function (req) {

  // We've got a packet from the client requesting to change the game parameters for the game
  req.connection.on(enums.PACKET_TYPES.CREATION_PARAMS_ALTER, (packet, next) => {
     if (req.game.state.state !== enums.GAME_STATE.CREATION) return handleError(req, error.messages.GAME_NOT_IN_LOBBY);
     // Check we're the host before doing anything
     if (req.game.state.hostplayer !== req.player._id)

     // We'll just set out gameinfo to exactly what we're been given here.
     req.game.info.maxPlayers = packet.maxPlayers;

     // Should probably check this aganist the enum?
     if (enums.GAME_MODES.hasOwnProperty(packet.gameMode)) return handleError(req, error.messages.INVALID_GAME_MODE);
     req.game.info.gameMode   = packet.gameMode;

     req.protocol.commands.game.info();
  });

  // We've got a packet from the client requesting to change their stats.
  req.connection.on(enums.PACKET_TYPES.LOBBY_STAT_ALTER, (packet, next) => {
    if (req.game.state.state !== enums.GAME_STATE.LOBBY) return handleError(req, error.messages.GAME_NOT_IN_LOBBY);
    if (!req.game.player.getPlayerSkill(packet.skill)) return handleError(req, error.messages.INVALID_SKILL);

    if (!req.game.player.hasAvailableSkillPoints()) return handleError(req, error.messages.NO_SKILL_POINTS_AVAILABLE);

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

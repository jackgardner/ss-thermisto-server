const error = require('./error');
const enums = require('../enums');

const handleError = error.handleError;

module.exports = function (req) {
  req.connection.on(enums.PACKET_TYPES.LOBBY_STAT_ALTER, (packet, next) => {
    if (req.game.state.state !== enums.GAME_STATE.LOBBY) return handleError(req, error.messages.GAME_NOT_IN_LOBBY);

    //const packetSkill = packet.skill;
    //const skillFromConfig = enums.CHARACTER_SKILLS.find((characterSkill) => characterSkill._id === packetSkill);

    //if (!skillFromConfig) return handleError(req, error.messages.INVALID_SKILL);

    // var usersSkill = req.player.skills.find((skill) => skill._id === skillFromConfig._id);
    // Get a reference to the player
    req.player
    switch (packet.direction) {
      case 'INC':
        console.log('Incrementing Skills');
        req.player.incrementSkill(packet.skill);
        break;
      case 'DEC':
        console.log('Decrementing Skills');
        req.player.decrementSkill(packet.skill);
        break;
    }

    req.protocol.commands.game.stateChange();
    next(true);
  });
};

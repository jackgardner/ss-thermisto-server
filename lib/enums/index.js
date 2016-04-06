const process = require('process');
const enums = {
  PACKET_TYPES: {
    STATE_CHANGE: 'STATE_CHANGE',
    YOUR_DETAILS: 'YOUR_DETAILS',
    PLAYER_DISCONNECT: 'PLAYER_DISCONNECT',
    LOBBY_STAT_ALTER: 'LOBBY_STAT_ALTER',
    ERROR: 'ERROR',
    GAME_INFO: 'GAME_INFO'
  },
  GAME_STATE: {
    CREATING: 0,
    LOBBY: 1,
    IN_PROGRESS: 2,
    ENDING: 4
  },

  CHARACTER_SKILLS: require(process.cwd() + '/config/skills.json')
};


module.exports = enums;
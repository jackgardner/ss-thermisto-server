const process = require('process');
const enums = {
  PACKET_TYPES: {
    STATE_CHANGE: 'STATE_CHANGE',
    YOUR_DETAILS: 'YOUR_DETAILS',
    PLAYER_DISCONNECT: 'PLAYER_DISCONNECT',
    // Lobby Specific
    LOBBY_STAT_ALTER: 'LOBBY_STAT_ALTER',

    // Creation Screen Specific
    CREATION_PARAMS_ALTER: 'CREATION_PARAMS_ALTER',
    ERROR: 'ERROR',
    GAME_INFO: 'GAME_INFO'
  },
  GAME_MODES: {
    DEFAULT: 'DEFAULT'
  },
  GAME_STATE: {
    CREATING: 'CREATING',
    LOBBY: 'LOBBY',
    IN_PROGRESS: 'IN_PROGRESS',
    ENDING: 'ENDING'
  },

  CHARACTER_SKILLS: require(process.cwd() + '/config/skills.json')
};


module.exports = enums;

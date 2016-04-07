'use strict';

const enums = require('./enums');
const Protocol = require('./protocol');
const Player = require('./entities/player');
const debug = require('debug')('ss-thermisto:game');
const wildcardMiddleware = require ('socketio-wildcard')();
const bunyan = require('bunyan');
const PrettyStream = require ('bunyan-prettystream');

var prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

class Connection {
  constructor(game, _connection) {
    this.game = game;
    this.connection = _connection;
    this.protocol = Protocol.init(game, _connection);
    this.startConnection();
  }

  onDisconnect (player) {
    this.connection.logger.info(`Player ${player._id} disconnected`);

    this.game.state.players = this.game.state.players.filter((_gamePlayer) => _gamePlayer._id !== player._id);
    this.protocol.commands.users.disconnect(player);
  };

  startConnection() {
    this.player = new Player(this.game.state.players.length + 1);

    this.protocol.commands.users.yourDetails(this.player);

    // Lets check if this is the first player
    if (this.game.state.players.length == 0) {
      // it's the first player
      // Lets set them to be the host of the game for now.
      this.game.state.hostplayer = this.player._id;
    }

    this.game.state.players.push(this.player);
    this.connection.logger.info(`Player ${this.player._id} connected`);

    this.protocol.commands.game.info();
    this.protocol.commands.game.stateChange();
    this.connection.on('*', (packet) => {
      this.connection.logger.debug({ player: this.player._id, data: packet.data });
    });
    this.connection.on('disconnect', this.onDisconnect.bind(this, this.player));
    require('./routes/creation')(this);
    require('./routes/lobby')(this);
  }
};

function Game(io) {
  this.logger = bunyan.createLogger({
    name: 'thermisto',
    streams: [{
      type: 'raw',
      stream: prettyStdOut
    }]
  });
  this.io = io;
  this.io.use(wildcardMiddleware);
  this.io.use((socket, next) => {
    socket.logger = this.logger;
    next();
  });


  // Default state is in the game creation phase.
  this.state = {
    state: enums.GAME_STATE.CREATING,
    players: []
  };

  this.info = {
    availableSkills: enums.CHARACTER_SKILLS,
    maxPlayers: 4,
    gameMode: enums.GAME_MODES.DEFAULT
  };

  this.attachEvents();
};

Game.prototype.attachEvents = function () {
  this.logger.info('Game created', this.state);
  this.io.on('connection', this.onConnection.bind(this));
};

Game.prototype.onConnection = function (socket) {

  new Connection(this, socket);
};

module.exports = function (io) {
  return new Game(io);
};

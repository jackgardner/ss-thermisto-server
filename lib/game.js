'use strict';

const enums = require('./enums');
const Protocol = require('./protocol');
const Player = require('./entities/player');
const debug = require('debug')('ss-thermisto:game');

class Connection {
  constructor(game, _connection) {
    this.game = game;
    this.connection = _connection;
    this.protocol = Protocol.init(game, _connection);
    this.startConnection();
  }

  onDisconnect (player) {
    debug(`Player ${player._id} disconnected`);

    this.game.state.players = this.game.state.players.filter((_gamePlayer) => _gamePlayer._id !== player._id);
    this.protocol.commands.users.disconnect(player);
  };

  startConnection() {
    this.player = new Player(this.game.state.players.length + 1);

    this.protocol.commands.users.yourDetails(this.player);
    this.game.state.players.push(this.player);

    debug(`Player ${this.player._id} connected`);

    this.protocol.commands.game.info();
    this.protocol.commands.game.stateChange();

    this.connection.on('disconnect', this.onDisconnect.bind(this, this.player));
    require('./routes/lobby')(this)
  }
};

function Game(io) {
  this.io = io;

  this.state = {
    state: enums.GAME_STATE.CREATING,
    players: []
  };

  this.info = {
    availableSkills: enums.CHARACTER_SKILLS
  };

  this.attachEvents();
};

Game.prototype.attachEvents = function () {
  this.io.on('connection', this.onConnection.bind(this));
};

Game.prototype.onConnection = function (socket) {
  new Connection(this, socket);
};

module.exports = function (io) {
  return new Game(io);
};
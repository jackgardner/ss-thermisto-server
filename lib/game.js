'use strict';

const enums              = require('./enums');
const Protocol           = require('./protocol');
const Player             = require('./entities/player');
const debug              = require('debug')('ss-thermisto:game');
const wildcardMiddleware = require ('socketio-wildcard')();
const bunyan             = require('bunyan');
const PrettyStream       = require ('bunyan-prettystream');
const _                  = require('lodash');
const randomId           = require('random-id');
const server_params      = require('../config/server.json');
const socketioJwt        = require('socketio-jwt');
var prettyStdOut         = new PrettyStream();
var accounts   = require('./accountsStore');

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
    const wasHost = player._id === this.game.state.hostplayer;
    this.game.state.players = this.game.state.players.filter((_gamePlayer) => _gamePlayer._id !== player._id);

    // Lets check if this player was the host:
    if (wasHost && this.game.state.players.length)
    {
      // Oh dear, our host has disconnected, lets assign a new random one.
      this.game.state.hostplayer = _.sample(this.game.state.players)._id;
      this.protocol.commands.users.hostChanged(this.game.state.hostplayer);
    }

    this.protocol.commands.users.disconnect(player);
  };

  startConnection() {
    // I.e we're a returning player.
    this.player = this.game.state.players.find(player => player.account_id === this.connection.account._id);

    if (!this.player){
      // If we're not a returning player, then lets make a new player.
      this.player = new Player(randomId(12), this.connection.account._id);
      this.protocol.commands.users.yourDetails(this.player);

      // Lets check if this is the first player
      if (this.game.state.players.length == 0) {
        // it's the first player
        // Lets set them to be the host of the game for now.
        this.game.state.hostplayer = this.player._id;
      }

      // Here we'll only store the public version of the player, as the client doesnt need to know about the accountID
      this.game.state.players.push(this.player.getPublic());
    }

    // Continue with normal initialization
    this.connection.logger.info(`Player ${this.player._id} connected`);
    this.protocol.commands.game.info();
    this.protocol.commands.game.stateChange();
    this.connection.on('*', (packet) => {
      this.connection.logger.debug({ player: this.player._id, data: packet.data });
    });
    this.connection.on('disconnect', this.onDisconnect.bind(this, this.player));
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
    state: enums.GAME_STATE.LOBBY,
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
  //this.io.on('connection', this.onConnection.bind(this));
  this.io.on('connection', socketioJwt.authorize({
    secret: server_params.token_secret,
    timeout: 15000 // 15 seconds to send the authentication message
  })).on('authenticated', (socket) => {
    var account = accounts.find(acc => acc._id === socket.decoded_token._id);
    if (!account) {
      return socket.logger.error('Invalid player in token!');
    }

    socket.logger.info(`Account ID ${account._id} accepted`);
    socket.account = account;
    new Connection(this, socket);
  });
};

module.exports = function (io) {
  return new Game(io);
};

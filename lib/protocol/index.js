function Protocol () {
  this.commands = {};
}

Protocol.prototype.init = function (game, connection) {
  this.game = game;
  this.io = game.io;
  this.socket = connection;
  return this;
};

Protocol.prototype.attachCommand = function (namespace, commandName, fn) {
  if (typeof fn !== 'function') return;
  if (!this.commands.hasOwnProperty(namespace)) this.commands[namespace] = {};

  this.commands[namespace][commandName] = fn.bind(this);
};


module.exports = new Protocol;

require('./core');
require('./game');
require('./users');

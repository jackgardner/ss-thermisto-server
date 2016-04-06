const enums = require ('../enums');
const Protocol = require('./index');

Protocol.attachCommand('core', 'error', function (err) {
  console.error(err);
  this.socket.emit (enums.PACKET_TYPES.ERROR, { hello: 'test'});
});

var io = require('socket.io')()
var ios = require('socket.io-express-session');
io.use(ios(require('./session')));

module.exports = io

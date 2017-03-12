var express = require('express');
var router = express.Router();
var io = require('../io');

io.on('connection', function(socket){
  console.log('user connected');
  io.emit('user connected', "User Connected");

  socket.on('chat message', function(msg){
    console.log('chat message ' + msg);
    io.emit('chat message', msg);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Vault Chat' });
});

module.exports = router;

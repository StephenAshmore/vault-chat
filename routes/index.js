var express = require('express');
var router = express.Router();
var io = require('../io');

io.on('connection', function(socket){
  console.log('user connected');
  io.emit('user connected', "A User Connected");

  socket.on('chat message', function(msg){
    console.log('chat message ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('user disconnected', "A User Disconnected");
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Vault Chat' });
});

module.exports = router;

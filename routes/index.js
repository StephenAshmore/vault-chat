var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var io = require('../io');
// var cookieParser = require('cookie-parser');
// var parse_cookie = cookieParser();

var people = {};
var name_map = {};

io.on('connection', function(socket){
  console.log('user connected: ' + socket.handshake.session.id + ' ' + socket.id + ' ');
  // people[socket.id] = socket.handshake.session.user.id;
  io.emit('user connected', socket.id + " has connected.");

  socket.on('chat message', function(msg){
    console.log('chat message ' + msg);
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    io.emit('user disconnected', "A User Disconnected");
  });
});

router.get('/', function (req, res) {
  if (typeof req !== 'undefined' && req ) {
    if ( typeof req.user !== 'undefined' && req.user ) {
      name_map[req.user.id] = req.user.username;

      console.log("A user with a name is here: " + name_map[req.user.id] + " with id: " + req.user.id);
    }
  }
  res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res, next) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', { error : err.message });
    }

    passport.authenticate('local')(req, res, function () {
      req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
      });
    });
  });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;

var Session = require('express-session');
var SessionStore = require('session-file-store')(Session);
var session = Session({store: new SessionStore({path: __dirname+'/tmp/sessions'}), secret: 'keyboard cat', resave: true, saveUninitialized: true});

module.exports = session

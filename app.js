var express         = require('express');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var jwt             = require('jsonwebtoken');
var cors            = require('cors');
var app             = express();
const server_params = require('./config/server.json');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// Temporary stuff

var accounts = [
  {
    _id:   1234,
    email: "account1@accounts.com",
    password: "pass1"
  },
  {
    _id:   1235,
    email: "account2@accounts.com",
    password: "pass2"
  }
]
var jwtSecret = "ApplesAndOranges";

app.post('/login', function(req, res){

  /*
  req.body = {
    email: my@me.com,
    password: Something
  }
  */


  if (!req.body.email || !req.body.password) return res.json({ type: 'AUTH_ERROR', error: 'Invalid credentials'});

  var account = accounts.find(acc => acc.email === req.body.email && acc.password === req.body.password);
  if (account){
    // Issue a token here.
    var token = jwt.sign(account, server_params.token_secret, { expiresInMinutes: 60*5 });
    res.json({
      type: 'USER_LOGIN',
      token: token,
      email: account.email
    });
  } else {
    res.json({ type: 'AUTH_ERROR', error: "Invalid Credentials!"});
  }
})

module.exports = app;

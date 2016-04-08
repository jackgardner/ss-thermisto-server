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

  if (!req.body.email || !req.body.password) return;

  var sent_token = false;
  // Gotta be a better to do this
  for (i = 0; i < accounts.length; i++) {
    if (accounts[i].email    === req.body.email &&
        accounts[i].password === req.body.password){

          // Issue a token here.
          var token = jwt.sign(accounts[i], server_params.token_secret, { expiresInMinutes: 60*5 });
          res.json({token: token});
          sent_token = true;
        }
  }
  if (!sent_token) {
    res.json({message: "Invalid Credentials!"});
  }
})

module.exports = app;

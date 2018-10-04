const  express = require('express');
const  bodyParser = require('body-parser');
const  cors = require('cors');
const  router = require('./exproutes/router');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);
var port = process.env.PORT || 4000;

var connection = mysql.createConnection({
  host     : 'steeck.c9mlkeoxgavg.ap-northeast-2.rds.amazonaws.com',
  user     : 'steeck',
  password : 'steeck2018!',
  database : 'steeck'
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})

connection.query("SELECT * FROM posts ", function(err, rows, fields) {
  if (!err) console.log("hi", rows);
  else console.log("err", err);
})

connection.end();

app.listen(port, function(){
  console.log('Running', port);
});

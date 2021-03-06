const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const fetcher = require('express-param');
const cors = require('cors');
const models = require('./models')
const app = express();
const uniqid = require('uniqid')
require('dotenv').config()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

function configApp() {
  // console.log('process', process.env.DB_USERNAME);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cors());
  // app.use(fetcher());
  // app.use(cookieParser());
  require('./routes').routes(app);
  app.use(express.static(path.join(__dirname, '/../public')));
  // app.use(require('./error').handler);
}

configApp();

app.listen(process.env.PORT, function() {
  console.log('Server is listening on port ' + process.env.PORT);
});

module.exports = app;

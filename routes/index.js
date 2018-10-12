const delegations = require('./delegations');
const posts = require('./posts');
const test = require('./test');
const fileupload = require('./fileupload');

module.exports.routes = function(app) {
  app.use('/delegations', delegations);
  app.use('/posts', posts);
  app.use('/test', test);
  app.use('/create', fileupload);

  app.get('/', function(req, res) {
    res.render('index.html');
  });
};

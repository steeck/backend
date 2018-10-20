const delegations = require('./delegationRouter');
const lease = require('./leaseRouter');
const votingRequestsRouter = require('./votingRequestsRouter');
const posts = require('./postRouter');
const test = require('./test');
const fileupload = require('./fileupload');
const deletePost = require('./deletepost');

module.exports.routes = function(app) {
  app.use('/delegations', delegations);
  app.use('/lease', lease);
  app.use('/voting_requests', votingRequestsRouter);
  app.use('/posts', posts);
  app.use('/test', test);
  app.use('/create', fileupload);
  app.use('/delete', deletePost);

  app.get('/', function(req, res) {
    res.render('index.html');
  });
};

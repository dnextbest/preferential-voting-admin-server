var SessionHandler = require('./session'),
  ContentHandler = require('./content'),
  ErrorHandler = require('./error').errorHandler,
  CORSHandler = require('./cors').corsHandler,
  HttpLogger = require('./httpLogger').httpLogger;

module.exports = exports = function(app) {

  //var sessionHandler = new SessionHandler(db);
  var contentHandler = new ContentHandler();

  // Middleware to see if a user is logged in
  // app.use(sessionHandler.isLoggedInMiddleware);

  app.use(ErrorHandler);
  app.use(CORSHandler);
  app.use(HttpLogger);

  app.get('/', contentHandler.showMainPage);
  app.get('/api/voteDefs', contentHandler.getVoteDefs);
  app.post('/api/voteDefs', contentHandler.insertVoteDef);
  app.put('/api/voteDefs', contentHandler.updateVoteDef);
  app.get('/api/voteDefs/:id', contentHandler.getVoteDef);

}

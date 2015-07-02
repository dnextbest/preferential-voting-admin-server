var SessionHandler = require('./session'),
  ContentHandler = require('./content'),
  ErrorHandler = require('./error').errorHandler,
  CORSHandler = require('./cors').corsHandler,
  log4js = require('log4js'),
  HttpLogger = require('./httpLogger').httpLogger;

  //config
  log4js.configure({
  	appenders: [
  		{ type: 'console' },
  		{ type: 'file', filename: 'logs/log4jsconnect.log', category: 'log4jslog' }
  	]
  });

  //define logger
  var logger = log4js.getLogger('log4jslog');

module.exports = exports = function(app) {

  //var sessionHandler = new SessionHandler(db);
  var contentHandler = new ContentHandler();

  // Middleware to see if a user is logged in
  // app.use(sessionHandler.isLoggedInMiddleware);

  app.use(ErrorHandler);
  app.use(CORSHandler);
  app.use(HttpLogger);
  //app.use(log4js.connectLogger(logger, { level: 'auto' }));

  app.get('/', contentHandler.showMainPage);
  app.get('/api/voteDefs', contentHandler.getVoteDefs);
  app.post('/api/voteDefs', contentHandler.insertVoteDef);
  app.put('/api/voteDefs', contentHandler.updateVoteDef);
  app.get('/api/voteDefs/:id', contentHandler.getVoteDef);

}

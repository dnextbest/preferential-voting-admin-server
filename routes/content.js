var StatsDAO = require('../stats').StatsDAO;

/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db) {
	"use strict";

	var stats = new StatsDAO(db);

	this.showMainPage = function(req,res,next){
		res.type('application/json');
		console.log("params:" + JSON.stringify(req.params));
		console.log("headers:" + JSON.stringify(req.headers));
		console.log("body:" + JSON.stringify(req.body));
		console.log("route:"+ JSON.stringify(req.route));
		console.log("IP:" + req.ip);
		console.log("path:" + req.path);
		console.log("");

		return res.send({msg: "Hello in da app!"});
	}

	this.insertEntry = function(req, res, next) {
		"use strict";
		log(req,res);
		res.type('application/json'); 

      //var entry = {x: req.x, y: req.y};
      // var entry = {x: "test"+Date.now()};
      stats.insertEntry(req.body, function(err, permalink) {
      	"use strict";

      	if (err) return next(err);

      	return res.send({msg: "OK"});
      });
      
  }
   function log(req,res){
        console.log("POST:");
        console.log("headers:\t" + JSON.stringify(req.headers)); 
        console.log("params:\t\t" + JSON.stringify(req.params));
        console.log("body:\t\t" + JSON.stringify(req.body));
        console.log("route:\t\t"+ JSON.stringify(req.route));
        console.log("IP:\t\t" + JSON.stringify(req.ip));
        console.log("path:\t\t" + req.path);
        console.log("");
    }
}
module.exports = ContentHandler;

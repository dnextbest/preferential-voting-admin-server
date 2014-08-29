var VoteDefDAO = require('../voteDef').VoteDefDAO;
/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db) {
	"use strict";

	var voteDefs = new VoteDefDAO(db);

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
this.insertVoteDef = function(req, res, next) {
    "use strict";
    log(req,res);
    res.type('application/json'); 

    var voteDef = req.body
    voteDef.dateCreated = Date.now();

    voteDefs.insertVoteDef(req.body, function(err, permalink) {
        "use strict";

        if (err) return next(err);

        return res.send({msg: "OK"});
    });
      
    }
	this.insertVoteDef = function(req, res, next) {
		"use strict";
		log(req,res);
		res.type('application/json'); 

    var voteDef = req.body
    voteDef.dateCreated = Date.now();

    voteDefs.insertVoteDef(req.body, function(err, permalink) {
      	"use strict";

      	if (err) return next(err);

      	return res.send({msg: "OK"});
    });
      
    }
  this.getVoteDef = function(req, res, next) {
    "use strict";
    log(req,res);
    res.type('application/json'); 
    var id = req.params.id
    console.log("ID : " + id);
    voteDefs.getVoteDef(id, function(err, doc) {
        "use strict";

        if (err) return next(err);
        console.log(JSON.stringify(doc));
        if(doc){
          return res.send(doc);
        }else {
          return res.send({})
        }
        
    });
      
  }
  this.getVoteDefs = function(req, res, next) {
    "use strict";
    log(req,res);
    res.type('application/json'); 
    var pageSize;
    if(req.query.pageSize){
      pageSize = req.query.pageSize;
    } else{
      pageSize = 10;
    }
    var page;
    if(req.query.page){
      page = req.query.page - 1;
    } else{
      page = 0;
    }

    var skip = pageSize * page;
    console.log(pageSize);

    voteDefs.getVoteDefs(skip, pageSize, function(err, docs) {
        "use strict";

        if (err) return next(err);

        return res.send(docs);
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

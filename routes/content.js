var VoteDefDAO = require('../voteDef').VoteDefDAO;
/* The ContentHandler must be constructed with a connected db */
function ContentHandler (db) {
	"use strict";

	var voteDefs = new VoteDefDAO(db);

	this.showMainPage = function(req,res,next){
		res.type('application/json');
		return res.send({msg: "Hello in da app!"});
	}
this.insertVoteDef = function(req, res, next) {
    "use strict";
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
		res.type('application/json'); 

    var voteDef = req.body
    voteDef.dateCreated = Date.now();

    voteDefs.insertVoteDef(req.body, function(err, doc) {
      	"use strict";

      	if (err) return next(err);
console.log(JSON.stringify(doc));
      	return res.send(doc);
    });
      
    }

  this.updateVoteDef = function(req, res, next) {
    "use strict";
    res.type('application/json'); 

    var voteDef = req.body
    voteDef.lastUpdated = Date.now();

    voteDefs.updateVoteDef(req.body, function(err, doc) {
        "use strict";

        if (err) return next(err);
        
        console.log(JSON.stringify(doc));
        return res.send(doc);
    });
      
  }

  this.getVoteDef = function(req, res, next) {
    "use strict";
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
}
module.exports = ContentHandler;

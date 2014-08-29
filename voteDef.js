/* The StatsDAO must be constructed with a connected database object */
var ObjectID = require('mongodb').BSONPure.ObjectID;

function VoteDefDAO(db) {
	"use strict";

    /* If this constructor is called without the "new" operator, "this" points
    * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof VoteDefDAO)) {
    	console.log('Warning: VoteDefDAO constructor called without "new" operator');
    	return new VoteDefDAO(db);
    }

    var voteDef = db.collection("voteDef");

    this.insertVoteDef = function (entry, callback) {
    	"use strict";
    	console.log("inserting VoteDef entry" + JSON.stringify(entry));

    	voteDef.insert(entry,function(err,inserted){
    		"use strict";
    		console.log('inserted.. ' + JSON.stringify(inserted));
    		if(err)return callback(err,null);
    		callback(err, inserted._id);
    	});
    }

    this.getVoteDefs = function (skip, limit, callback) {
    	"use strict";

    	voteDef.find(null, null, { sort:{dateCreated:1}, skip: skip, limit: limit }).toArray(function(err, items) {
    		"use strict";

    		if (err) return callback(err, null);

    		console.log("Found " + items.length + " items");

    		callback(err, items);
    	});
    };

    this.getVoteDef = function(id, callback) {
    	"use strict";
    	var obj_id = ObjectID.createFromHexString(id);
    	voteDef.findOne({_id: obj_id},function(err, item) {
    		"use strict";

    		if (err) return callback(err, null);

    		console.log("Found: " + JSON.stringify(item));

    		callback(err, item);
    	});
    };

    this.getVoteDefsByX = function(X, num, callback) {
    	"use strict";

    	voteDef.find({ x : X }).sort('dateCreated', -1).limit(num).toArray(function(err, items) {
    		"use strict";

    		if (err) return callback(err, null);

    		console.log("Found " + items.length + " items");

    		callback(err, items);
    	});
    };

}

module.exports.VoteDefDAO = VoteDefDAO;
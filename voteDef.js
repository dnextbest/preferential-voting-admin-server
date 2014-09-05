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

    this.validate = function(voteDef){
        console.log('validate : ' , voteDef);
        if(!voteDef.description || !voteDef.email || !voteDef.fields){
            return false;
        }
        return true;
    }

    this.insertVoteDef = function (entry, callback) {
    	"use strict";
    	console.log("inserting VoteDef entry" + JSON.stringify(entry));

       if(this.validate(entry)){

        	voteDef.insert(entry,function(err,inserted){
        		"use strict";
        		console.log('inserted.. ' + JSON.stringify(inserted));
        		if(err)return callback(err,null);

        		callback(err, inserted[0]);
        	});
        }else{
            var error = new Error('Bad request'); 
            error.code = '400';
            throw error;
        }
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

    this.updateVoteDef = function (entry, callback) {
        "use strict";
        console.log("updating VoteDef entry" + JSON.stringify(entry));

       if(entry._id && this.validate(entry)){
            var toUpdate = JSON.parse(JSON.stringify(entry));;
            var obj_id = ObjectID.createFromHexString(entry._id);
            delete entry._id; // remove _id from the object to make save work (_id is readonly)
            voteDef.update(
                {_id: obj_id},
                entry,
                function(err, cnt, status){
                    "use strict";
                    console.log('updated.. ' + JSON.stringify(toUpdate));
                    if(err)return callback(err,null);
                    if(cnt=0) throw new Error("Could not update object");

                    callback(err, toUpdate);
                }
            );
        }else{
            var error = new Error('Bad request'); 
            error.code = '400';
            throw error;
        }
    }




}

module.exports.VoteDefDAO = VoteDefDAO;
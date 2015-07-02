var mongoose = require('mongoose');

var voteDefinitionsSchema = mongoose.Schema({
  "description": String,
  "emails": [String],
  "fields": [{
    "id": Number,
    "value": String
  }],
  "dateCreated": Date,
  "lastUpdated": Date
});

module.exports = mongoose.model("voteDefinition", voteDefinitionsSchema);

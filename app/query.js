var configDB = require('../config/database');

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

var count = -1;

function findChallenge(req, res){
    // var id = req.params.id;
    // count++;
    MongoClient.connect(configDB.url, function(err, db) {
        assert.equal(null, err);
        var coll = db.collection('challenges');
        coll.find({}).toArray(function(err, data){
            if(err){
                console.error(err);
            }else if (data.length){
                // displayChallenge(data, res);
                res.send(data);
            }else {
                console.log('nothing found');
            }
            //db.close();
        });
    });
}

//noinspection JSAnnotator
module.exports = {
    findChallenge
};

// function displayChallenge(data, res) {
//     if(count < data.length){
//         res.send(data[count]);
//     }else{
//         console.log('Finished');
//     }
// }



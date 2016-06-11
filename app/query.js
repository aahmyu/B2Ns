var configDB = require('../config/database');
var User = require('../app/models/user');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');


function findChallenge(res){
    // var id = req.params.id;
    MongoClient.connect(configDB.url, function(err, db) {
        assert.equal(null, err);
        var coll = db.collection('challenges');
        coll.find({}).sort({ level: 1, num: 1 }).toArray(function(err, data){
            if(err){
                console.error(err);
            }else if (data.length){
                res.send(data);
            }else {
                console.log('nothing found');
            }
            //db.close();
        });
    });
}

function subAnswer(req, res){
    User.findOne({ 'facebook.email' : req.user.facebook.email }, function(error, user){
        if(error){
            res.json(error);
        }
        else if(user == null){
            // res.json('no such user!');
            console.log('nothing');
        }
        else{
            user.inputs.push({ question: req.body.question, answer: req.body.answer, id: req.body.id });
            user.save( function(error, data){
                if(error){
                    res.json(error);
                }
                else{
                    res.json(data.inputs);
                    // console.log(data.inputs);
                }
            });
        }
    });
}

function editAnswer(req, res) {
    User.findOne({ 'facebook.email' : req.user.facebook.email }, function(error, user){
        if(error){
            res.json(error);
        }
        else if(user == null){
            console.log('no such user!');
        }
        else{
            user.inputs[req.body.id].answer = req.body.answer;
            user.save(function(error, data){
                if(error){
                    res.json(error);
                }
                else{
                    console.log('Answer edited');
                }
            });
        }
    });
}

function deleteAnswer(req, res) {
    User.findOne({ 'facebook.email' : req.user.facebook.email }, function(error, user){
        if(error){
            res.json(error);
        }
        else if(user == null){
            console.log('no such user!');
        }
        else{
            user.inputs.splice(req.body.id, 1);
            user.save(function(error, data){
                if(error){
                    res.json(error);
                }
                else{
                    console.log("Answer Deleted");
                }
            });
        }
    });
}

function deleteHistory(req, res) {
    User.findOne({ 'facebook.email' : req.user.facebook.email }, function(error, user){
        if(error){
            res.json(error);
        }
        else if(user == null){
            console.log('no such user!');
        }
        else{
            user.inputs = [];
            user.save(function(error, data){
                if(error){
                    res.json(error);
                }
                else{
                    console.log('History Cleared');
                }
            });
        }
    });
}

//noinspection JSAnnotator
module.exports = {
    findChallenge,
    subAnswer,
    editAnswer,
    deleteAnswer,
    deleteHistory
};




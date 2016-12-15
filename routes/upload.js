var multer = require('multer');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var qs = require('querystring');

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var URL = "mongodb://localhost:27017/imageStore";
router.post('/',upload.array('pics'),function(req, res, next){



    var data = {
        ipstr:"something",
        file: req.files
    };
    console.log(req.files);


    mongo.connect(URL,function(err,db){
        assert.equal(err,null);
        db.collection('file_data').insertOne(data,function(err,result){
            assert.equal(err,null);
            console.log('Data inserted');
            res.send('Data inserted');
            db.close();
        });
    });

});



router.get('/',function(req,res,next){
    var resultArray = [];

    mongo.connect(URL,function(err,db){
        assert.equal(err,null);
        var cursor = db.collection('file_data').find();
        cursor.forEach(function(document,err){
            assert.equal(err,null);
            resultArray.push(document);
        },function(){
            db.close();
            res.render('upload',{items: resultArray});
        });
    });
});

module.exports = router;

var multer = require('multer');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mongo = require('mongodb').MongoClient;

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
    mongo.connect(URL,function(err,db){
        if(err)
        {
            res.json("Error",err);
        }else{
            db.collection('file_data').insertOne(data,function(err,result){
                if(err)
                {
                    res.json("Error",err);
                }else {
                    res.json(data);
                    db.close();
                }
            });
        }

    });

});

router.get('/',function(req,res,next){
    var resultArray = [];
    mongo.connect(URL,function(err,db){
        if(err)
        {
            res.json("Error",err);
        }else {
            var cursor = db.collection('file_data').find();
            cursor.forEach(function (document, err) {
                if(err)
                {
                    res.json("Error",err);
                }else {
                    resultArray.push(document);
                }
            }, function () {
                db.close();
                res.json(resultArray);
            });
        }
    });
});

module.exports = router;

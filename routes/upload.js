var multer = require('multer');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var Data = require('../models/Data');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var URL = "mongodb://localhost:27017/imageStore";
mongoose.connect(URL);

/*
 * Sending POST data
 */
router.post('/',upload.single('pics'),function(req, res, next){

    var data = new Data();
    data.ipstr = "nanika";
    data.file.data = req.file;
    data.file.contentType = req.file.mimetype;

    if(data.file.contentType.toString().includes("gif"))
    {
        data.save(function(err){
            if(err)
            {
                throw err;
            }
            res.json(data);
        });
    }
    else
    {
        res.json({"Error" :{"Message":"Please send only gif files"}});
    }


    /*mongo.connect(URL,function(err,db){
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

    });*/

});

/*
 * Retrieving GET data
 */
router.get('/',function(req,res,next){

    Data.find(function(err,data){
        if(err)
        {
            throw err;
        }
        res.json(data);
    });



    /*
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
    });*/
});

module.exports = router;

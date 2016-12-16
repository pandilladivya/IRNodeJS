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
    } else {
        res.json({"Error" :{"Message":"Please send only gif files"}});
    }
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
});

module.exports = router;

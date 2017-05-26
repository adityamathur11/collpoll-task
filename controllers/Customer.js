/**
 * Created by Aditya on 26-May-17.
 */

var express = require('express')
    ,fs = require('fs'),
    JSONStream = require('JSONStream')
    ,router = express()
    ,config = require('config')
    ,shortId = require('shortid')
    ,random_name = require('node-random-name')
    ,helper = require('../helpers/Helpers');

router.get('/nearByUsers' , function (req , res) {
    stream = fs.createReadStream("public/Customer.json", {encoding: 'utf8'}).pipe(JSONStream.parse(['customers',true ]))
        .on('data', function(data) {
            res.status(200).json({error : "Internal server error"});
        })
        .on('error' , function () {
            res.status(500).json({error : "Internal server error"});
        });

});

router.post('/createDataFile', function(req, res) {
    var upperLimit = req.body.limit || 100;
    var obj;
    var customerList = [];
    var tempCoordinate = helper.getRandomInRadiusPoint();
    var inRadiusLimit = req.body.inRadiusLimit || Math.floor(Math.random() * upperLimit/(Math.ceil(Math.random()*10)));
    for(var i = 0 ; i < inRadiusLimit ; i++){
        obj = {};
        obj.name = random_name();
        obj.id = shortId.generate();
        obj.latitude = tempCoordinate.latitude;
        obj.longitude = tempCoordinate.longitude;
        customerList.push(obj);
    }

    for(i = 0 ; i < upperLimit-inRadiusLimit ; i++){
        obj = {};
        obj.name = random_name();
        obj.id = shortId.generate();
        obj.latitude = helper.getRandomCoordinate();
        obj.longitude = helper.getRandomCoordinate();
        customerList.push(obj);
    }
    var json = JSON.stringify({"customers" : customerList});
    fs.writeFile('public/'+config.DataFile , json, 'utf8', function () {
        res.status(200).json(customerList);
    });
});

module.exports = router;
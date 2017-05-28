/**
 * Created by Aditya on 26-May-17.
 */

var express = require('express')
    ,fs = require('fs'),
    JSONStream = require('JSONStream')
    ,router = express()
    ,config = require('config')
    ,shortId = require('shortid')
    ,helper = require('../helpers/Helpers');
var faker = require('faker');

router.get('/nearByUsers' , function (req , res) {
    var result = [];
    var stream = fs.createReadStream("public/" + config.DataFile, {encoding: 'utf8'}).on('error' , function (err) {
        res.status(500).json({error : "Internal server error"});
    });
    stream.pipe(JSONStream.parse(['customers',true ]))
        .on('data', function(data) {
            helper.getDistance(parseFloat(data.latitude) , parseFloat(data.longitude) , function (err , distance) {
                if(err) res.status(500).json({error : "Internal server error"});
                if(distance< (config.radius *1000)){
                    data.distance =distance.toFixed(2);
                    delete data.latitude;
                    delete data.longitude;
                    result.push(data);
                }
            });
        })
        .on('end' , function () {
            result.sort(function (a,b) {
                if(a.id > b.id){
                    return 1;
                }
                else if(a.id < b.id){
                    return -1;
                }
                else return 0;
            });
            res.status(200).json({"customers" : result});
        })
        .on('error' , function (err) {
            res.status(500).json({error : "Internal server error"});
        });

});

router.post('/createDataFile', function(req, res) {
    var upperLimit = req.body.limit || 100;
    var obj;
    var customerList = [];
    var tempCoordinate;
    var inRadiusLimit = req.body.inRadiusLimit || Math.floor(Math.random() * upperLimit/(Math.ceil(Math.random()*10)));
    for(var i = 0 ; i < inRadiusLimit ; i++){
        obj = {};
        obj.name = faker.name.findName();
        obj.id = shortId.generate();
        tempCoordinate = helper.getRandomInRadiusPoint();
        obj.latitude = tempCoordinate.latitude;
        obj.longitude = tempCoordinate.longitude;
        customerList.push(obj);
    }

    for(i = 0 ; i < upperLimit-inRadiusLimit ; i++){
        obj = {};
        obj.name = faker.name.findName();
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
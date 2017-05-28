var express = require('express')
    ,router = express();
var path = require('path');

router.use('/public',express.static(__dirname + '/public'));
router.use('/sample' , express.static(__dirname+'/website'));
router.get('*',function (req , res) {
    res.sendFile('index.html', { root: path.join(__dirname,'../website')});
});

module.exports = router;
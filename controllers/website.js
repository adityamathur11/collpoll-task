var express = require('express')
    ,router = express();
var path = require('path');

router.get('*',function (req , res) {
    res.sendFile('index.html', { root: path.join(__dirname,'../website')});
});

module.exports = router;
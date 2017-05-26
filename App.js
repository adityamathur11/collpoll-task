/**
 * Created by Aditya on 26-May-17.
 */
const express = require('express')
    ,app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())
app.use('/public',express.static(__dirname + '/public'));
app.use(require('./controllers/Customer'));
var port = process.env.port || 3000;
app.listen(port , function () {
   console.log("Server is running on " , port);
   console.log("please check https://github.com/adityamathur11/collpoll-task#readme for doc");
});
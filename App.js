/**
 * Created by Aditya on 26-May-17.
 */
const express = require('express')
    ,app = express()
    ,bodyParser = require('body-parser')
    ,cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/public',express.static(__dirname + '/public'));
app.use('/website' , express.static(__dirname+'/website'));
app.use(require('./controllers/Customer'));
app.use(require('./controllers/website'));
var port = process.env.port || 3000;

app.listen(port , function () {
   console.log("Server is running on " , port);
   console.log("please check https://github.com/adityamathur11/collpoll-task#readme for doc");
});

module.exports = app;
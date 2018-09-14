var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
var request = require('request');


app.get('/', function(req, res) {

    res.render('index');

})

app.post('/process', function(req, res) {

    var points = req.body.coordinates.split(",")
    
    request('https://api.nasa.gov/planetary/earth/imagery/?lon='+points[0]+'&lat='+points[1]+'&date=2014-02-01&cloud_score=True&api_key=fU5PVIQKqs77NeWXbMbU2Oc8WuK3qlnpxVR08P0G', function(error, response, body) {
        if (error) {
            res.json({message: "Error"});
        } else {
            res.json({message: "Success", info: JSON.parse(body)});
        }
    })

})

app.listen(8000, function() {
 console.log("listening on port 8000");
});

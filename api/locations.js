var express = require('express');
var app = express();
var sql = require('mysql');
var util = require("util")
var path = require("path");
var bodyParser = require("body-parser");

//mysql db
var con = sql.createConnection({
    host: 'localhost',
    user: 'ryhma9',
    password: 'ryhma9',
    database: 'weather'
})

//POSTin jsonia varten
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../ui', 'index.html'))
})

app.get('/', function (req, res, next) {
    con.query('SELECT * FROM locations', function (err, result) {
        if (err) {
            return next(err)
        }
        if (result.length === 0) {
            result = 'tyhjää'
        }
        res.send(result)
    })
})

//http://127.0.0.1:8081/
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('pyörii')
})
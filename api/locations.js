var express = require('express');
var app = express();
const sql = require('mysql2/promise');
var util = require("util")
var path = require("path");
var bodyParser = require("body-parser");
const cors = require('cors');

//mysql db

//POSTin jsonia varten
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'public')))

async function postLocation(city, address) {
    let sql_query = "INSERT INTO locations (city,address) VALUES (?, ?)";
    console.log(sql_query, city, address);
    const con = await sql.createConnection({
        host: "localhost",
        user: "ryhma9",
        password: "ryhma9",
        database: "weather"
      });
    const result = await con.execute(sql_query, [city, address]);
    return result;
}

async function getLocations() {
    let sql_query = "SELECT * FROM locations";
    const con = await sql.createConnection({
        host: "localhost",
        user: "ryhma9",
        password: "ryhma9",
        database: "weather"
      });
    const result = await con.execute(sql_query);
    return result;
}

async function locationNotes(location) {
    let sql_query = 'SELECT * FROM notes INNER JOIN locations ON notes.locations_id = locations.locations_id WHERE locations.city="' + location + '"';
    const con = await sql.createConnection({
        host: "localhost",
        user: "ryhma9",
        password: "ryhma9",
        database: "weather"
    });
    const result = await con.execute(sql_query);
    return result;
}

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../', 'public/index.html'))
})

app.get('/locations', function (req, res, next) {
    console.log(req.query)
    let result = getLocations();

    result.then( ([rows, fields]) => {
        console.log(rows, fields);
        res.send(rows);
     })
     .catch(console.log);
})

app.get('/notes/:location', function (req, res, next) {
    var location = req.params.location
    console.log(req.query)
    let result = locationNotes(location);

    result.then( ([rows, fields]) => {
        console.log(rows, fields);
        res.send(rows);
    })
        .catch(console.log);
})

app.post('/post', function (req, res, next) {
    let city = req.param('city')
    let address = req.param('address')
    console.log(req.query)
    console.log("tää: " + req.query.city + req.body.city + req.param('city'))
    let result = postLocation(city, address);

    result.then( ([rows, fields]) => {
        console.log(rows, fields);
        res.sendStatus(200);
     })
     .catch(console.log);
})

//http://127.0.0.1:8081/
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('pyörii')
})
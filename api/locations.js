var express = require('express');
var app = express();
const sql = require('mysql2/promise');
var util = require("util")
var path = require("path");
var bodyParser = require("body-parser");
const cors = require('cors');

const sql_settings = {
        host: "localhost",
        user: "ryhma9",
        password: "ryhma9",
        database: "weather"
}

//mysql db

//POSTin jsonia varten
app.use(cors()); //tarvii et voi tehä api kutsuja
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, '../', 'public')))

async function postLocation(city, address) {
    let sql_query = "INSERT INTO locations (city,address) VALUES (?, ?)";
    console.log(sql_query, city, address);
    const con = await sql.createConnection(sql_settings);
    const result = await con.execute(sql_query, [city, address]);
    return result;
}

async function getLocations() {
    let sql_query = 'SELECT * FROM locations';
    const con = await sql.createConnection(sql_settings);
    const result = await con.execute(sql_query);
    return result;
}

async function updateNote(id, temperature, cloudiness, humidity, dtime) {
    let sql_query = 'UPDATE notes SET temperature=' + temperature + ', cloudiness="' + cloudiness +
        '", humidity=' + humidity + ', dtime="' + dtime + '" WHERE notes_id=' + id;
    const con = await sql.createConnection(sql_settings);
    const result = await con.execute(sql_query);
    return result;
}

async function deleteNote(id) {
    let sql_query = 'DELETE FROM notes WHERE notes_id=' + id;
    const con = await sql.createConnection(sql_settings);
    const result = await con.execute(sql_query);
    return result;
}

async function locationNotes(location) {
    let sql_query = 'SELECT * FROM notes INNER JOIN locations ON notes.locations_id = locations.locations_id WHERE ' +
        'locations.address="' + location + '"';
    const con = await sql.createConnection(sql_settings);
    const result = await con.execute(sql_query);
    return result;
}

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../', 'public/index.html'))
})

// get kaikki locations
app.get('/locations', function (req, res, next) {
    console.log(req.query)
    let result = getLocations();

    result.then( ([rows, fields]) => {
        console.log(rows, fields);
        res.send(rows);
     })
     .catch(console.log);
})

// get notes kadun nimellä
app.get('/notes/:location', function (req, res) {
    var location = req.params.location
    console.log(req.query)
    let result = locationNotes(location);

    result.then( ([rows, fields]) => {
        console.log(rows, fields);
        res.send(rows);
    })
        .catch(console.log);
})

// put update note
app.put('/update_note', function (req, res) {
    let id = req.param('id');
    let temperature = req.param('temperature');
    let cloudiness = req.param('cloudiness');
    let humidity = req.param('humidity');
    let dtime = req.param('dtime');
    console.log(id);
    console.log(temperature);
    console.log(cloudiness);
    console.log(humidity);
    console.log(dtime);
    let result = updateNote(id, temperature, cloudiness, humidity, dtime);

    result.then( ([rows, fields]) => {
        console.log(rows, fields);
        res.sendStatus(200);
    })
        .catch(console.log);
})

// delete note IDllä
app.delete('/notes/:id', function (req, res) {
    var id = req.params.id
    console.log(req.query)
    let result = deleteNote(id);

    result.then( ([rows, fields]) => {
        console.log(rows, fields);
        res.send(rows);
    })
        .catch(console.log);
})

// post uusi location(city, address)
app.post('/add-location', function (req, res) {
    let city = req.param('city')
    let address = req.param('address')
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
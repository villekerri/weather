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
    let sql_query = "SELECT * FROM locations ORDER BY city, address";
    const con = await sql.createConnection(sql_settings);
    const result = await con.execute(sql_query);
    return result;
}

async function locationNotes(locations_id) {
    let sql_query = 'SELECT * FROM notes INNER JOIN locations ON notes.locations_id = locations.locations_id ' +
        'WHERE locations.locations_id=' + locations_id + ' ORDER BY notes.dtime DESC';
    const con = await sql.createConnection(sql_settings);
    const result = await con.execute(sql_query);
    return result;
}

async function postNote(note_address, temperature, cloudiness, humidity, dtime) {
    let sql_query = "INSERT INTO notes (locations_id, temperature, cloudiness, humidity, dtime) VALUES (?, ?, ?, ?, ?)";
    console.log(sql_query, note_address, temperature, cloudiness, humidity, dtime);
    const con = await sql.createConnection(sql_settings);
    const result = await con.execute(sql_query, [note_address, temperature, cloudiness, humidity, dtime]);
    return result;
}

async function updateNote(id, temperature, cloudiness, humidity, dtime) {
    let sql_query = 'UPDATE notes SET temperature=' + temperature + ', cloudiness="' + cloudiness +
        '", humidity=' + humidity + ', dtime="' + dtime + '" WHERE notes_id=' + id;
    const con = await sql.createConnection(sql_settings);
    const result = await con.execute(sql_query);
    return result;
}

async function updateLocation(id, city, address) {
    let sql_query = 'UPDATE locations SET city="' + city + '", address="' + address + '" WHERE locations_id=' + id;
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

async function deleteLocation(id) {
    let sql_query = 'DELETE FROM notes WHERE locations_id=' + id;
    const con = await sql.createConnection(sql_settings);
    const result = await con.execute(sql_query);
    sql_query = 'DELETE FROM locations WHERE locations_id=' + id;
    const con2 = await sql.createConnection(sql_settings);
    const result2 = await con2.execute(sql_query);
    return result + result2;
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

app.get('/notes/:locations_id', function (req, res, next) {
    var locations_id = req.params.locations_id
    console.log(req.query)
    let result = locationNotes(locations_id);

    result.then( ([rows, fields]) => {
        console.log(rows, fields);
        res.send(rows);
    })
        .catch(console.log);
})

app.post('/:add-location', function (req, res, next) {
    let city = req.body.city;
    let address = req.body.address;
    console.log("req.body:", req.body,
                 "req.query: ", req.query);
    let result = postLocation(city, address);

    result.then( ([rows, fields]) => {
        console.log(rows, fields);
        res.sendStatus(200);
     })
     .catch(function(err) {
         console.log("error in add-location: ", err);
         res.sendStatus(500);
     });
})

// post note
app.post('/:add_note', function (req, res, next) {
    let note_address = req.body.note_address;
    let temperature = req.body.temperature;
    let cloudiness = req.body.cloudiness;
    let humidity = req.body.humidity
    let dtime = req.body.dtime
    console.log("req.body:", req.body,
        "req.query: ", req.query);
    let result = postNote(note_address, temperature, cloudiness, humidity, dtime);

    result.then( ([rows, fields]) => {
        console.log(rows, fields);
        res.sendStatus(200);
    })
        .catch(function(err) {
            console.log("error in add-location: ", err);
            res.sendStatus(500);
        });
})

// put update note
app.put('/update_note', function (req, res) {
    let id = req.param('id');
    let temperature = req.param('temperature');
    let cloudiness = req.param('cloudiness');
    let humidity = req.param('humidity');
    let dtime = req.param('dtime');
    let result = updateNote(id, temperature, cloudiness, humidity, dtime);

    result.then( ([rows, fields]) => {
        console.log(rows, fields);
        res.sendStatus(200);
    })
        .catch(console.log);
})

// put update location
app.put('/update_location', function (req, res) {
    let id = req.param('id');
    let city = req.param('city');
    let address = req.param('address');
    let result = updateLocation(id, city, address);

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

// delete location IDllä
app.delete('/locations/:id', function (req, res) {
    var id = req.params.id
    console.log(req.query)
    let result = deleteLocation(id);

    result.then( ([rows, fields]) => {
        console.log(rows, fields);
        res.send(rows);
    })
        .catch(console.log);
})

//http://127.0.0.1:8081/
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log('pyörii')
})
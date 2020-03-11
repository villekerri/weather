function locationNotes(){
    var loc_id = document.getElementById("location_id").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        console.log("readyState: " + xmlhttp.readyState);
        console.log("status: " + xmlhttp.status);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            console.log(json);
            document.getElementById("main").innerHTML = "Lämpötila: " + json[0].temperature;
        }
    }
    xmlhttp.open("GET", "http://127.0.0.1:8081/notes/" + loc_id, true);
    xmlhttp.send();
}

function addLocation(){
    var params = 'city=' + document.getElementById("add_city").value +
        '&address=' + document.getElementById("add_address").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://127.0.0.1:8081/add-location", true);
    console.log(params);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}

function updateNote(){
    var params = 'id=' + document.getElementById("note_id").value +
        '&temperature=' + document.getElementById("new_temperature").value +
        '&cloudiness=' + document.getElementById("new_cloudiness").value +
        '&humidity=' + document.getElementById("new_humidity").value +
        '&dtime=' + document.getElementById("new_dtime").value;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", "http://127.0.0.1:8081/update_note", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}

function deleteNote(){
    var note_id = document.getElementById("delete_note_id").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("DELETE", "http://127.0.0.1:8081/notes/" + note_id, true);
    xmlhttp.send();
}
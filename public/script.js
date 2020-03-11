function start() {
    locations();
}

function locationNotes(){
    var loc_id = document.getElementById("note_address_menu").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        console.log("readyState: " + xmlhttp.readyState);
        console.log("status: " + xmlhttp.status);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            console.log("json:", json)
            showNoteInfo(json);
        }
    }
    xmlhttp.open("GET", "http://127.0.0.1:8081/notes/" + loc_id, true);
    xmlhttp.send();
}
function showNoteInfo(notes) {
    if (notes.length > 0) {
        const table = `<table class="table table-dark" id="notes">
        <thead>
          <tr>
            <th scope="col">Address</th>
            <th scope="col">Humidity</th>
            <th scope="col">Outlook</th>
            <th scope="col">Temperature</th>
            <th scope"col">Time</th>
          </tr>
        </thead>
        <tbody>
        `
        document.getElementById("notes-list").innerHTML = table;
        for (let note of notes) {
            let t = note.dtime.split(/[T .]/);
            console.log(t);
            let time = t[1] + " " + t[0];
            const row = `
              <tr>
              <th scope="row">${note.address}</th>
              <td>${note.humidity}</td>
              <td>${note.cloudiness}</td>
              <td>${note.temperature + " °C"}</td>
              <td>${time}</td>
              </tr>
              `
            document.getElementById('notes').innerHTML += row;
        }
    }
}

function addLocation(){
    var params = 'city=' + document.getElementById("add_city").value +
        '&address=' + document.getElementById("add_address").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://127.0.0.1:8081/add-location", true);
    console.log(params);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
    locations();
}

function postNote(){
    var address_choice = document.getElementById("note_add_address_menu");
    var address_of_note = address_choice.options[address_choice.selectedIndex].value;
    console.log(address_of_note)
    var params = 'note_address=' + address_of_note +
        '&temperature=' + document.getElementById("note_temperature").value +
        '&cloudiness=' + document.getElementById("note_cloudiness").value +
        '&humidity=' + document.getElementById("note_humidity").value +
        '&dtime=' + document.getElementById("note_dtime").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://127.0.0.1:8081/add_note", true);
    console.log(params);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
}

function updateNote(){
    var params = 'id=' + document.getElementById("update_note_id").value +
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

function locations(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json = JSON.parse(xmlhttp.responseText);
            console.log("json:", json)
            var menu = '<select id="address_menu" name="address_menu">\n';
            for (let place of json) {
                menu += '<option value=' + place.locations_id + '>' + place.city + ', ' + place.address + '</option>\n';
            }
            menu += '</select>';
            document.getElementById("note_address_menu").innerHTML = menu;
            document.getElementById("note_add_address_menu").innerHTML = menu;
            document.getElementById("location_update_menu").innerHTML = menu;
            document.getElementById("location_delete_menu").innerHTML = menu;
        }
    }
    xmlhttp.open("GET", "http://127.0.0.1:8081/locations", true);
    xmlhttp.send();
}

function updateLocation(){
    var params = 'id=' + document.getElementById("location_update_menu").value +
        '&city=' + document.getElementById("new_city").value +
        '&address=' + document.getElementById("new_address").value;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", "http://127.0.0.1:8081/update_location", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params);
    locations();
}

function deleteLocation(){
    var note_id = document.getElementById("location_delete_menu").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("DELETE", "http://127.0.0.1:8081/locations/" + note_id, true);
    xmlhttp.send();
    locations();
}

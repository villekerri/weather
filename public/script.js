function locationNotes(){
    var json;
    var loc_id = document.getElementById("location_id").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        console.log("readyState: " + xmlhttp.readyState)
        console.log("status: " + xmlhttp.status)
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            json = JSON.parse(xmlhttp.responseText);
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
    var params = 'city=' + document.getElementById("add_city").value + '&address=' + document.getElementById("add_address").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://127.0.0.1:8081/add-location", true)
    console.log(params)
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params)
}
function locationNotes(){
    var json;
    var loc_id = document.getElementById("location_id").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        console.log("readyState: " + xmlhttp.readyState)
        console.log("status: " + xmlhttp.status)
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            json = JSON.parse(xmlhttp.responseText);
            console.log(json)
            document.getElementById("main").innerHTML = "Lämpötila: " + json[0].temperature;
        }
    }
    xmlhttp.open("GET", "http://127.0.0.1:8081/notes/" + loc_id, true);
    xmlhttp.send();
}

function addLocation(){
    var params = 'city=' + document.getElementById("add_city").value + '&address=' + document.getElementById("add_address").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://127.0.0.1:8081/add-location", true)
    console.log(params)
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(params)
}
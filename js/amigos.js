// amigos.js
// George Brown, August 2014

var lat = 22.2757544;
var longe = -94.231035;
me = new google.maps.LatLng(lat, longe);
var mapOptions = {
    zoom: 3,
    center: me,
    mapTypeId: google.maps.MapTypeId.TERRAIN
};

var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var places;
var lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 4
};

// Blue 2010; Orange 2014
var blueLoc = new Object();
var orangeLoc = new Object();

blueLoc[0] = {"name":"Palo Alto, California","lat":"37.4292","longe":"-122.1381", "numb":"first", "year":"2010", "photo":"paloaltosmall.jpg"};
blueLoc[1] = {"name":"Quito, Ecuador", "lat":"-0.3101894","longe":"-77.8434563", "numb":"second", "year":"2010", "photo":"quitosmall.jpg"};
blueLoc[2] = {"name":"San Diego de Mulalillo, Cotopaxi, Ecuador","lat":"-1.0397388","longe":"-78.5911274", "numb":"third", "year":"2010", "photo":"sandiegosmall.jpg"};

orangeLoc[0] = {"name":"Medford, Massachusetts","lat":"42.407484","longe":"-71.119023", "numb":"first", "year":"2014", "photo":"tuftssmall.jpg"};
orangeLoc[1] = {"name":"San Jose, Costa Rica","lat":"9.9356142","longe":"-84.1133451", "numb":"second", "year":"2014", "photo":"sanjosesmall.jpg"};
orangeLoc[2] = {"name":"Perez Zeledon, Costa Rica","lat":"9.3626055","longe":"-83.6943198", "numb":"third", "year":"2014", "photo":"perezsmall.jpg"};
orangeLoc[3] = {"name":"Parque Nacional Carara","lat":"9.780163","longe":"-84.553668", "numb":"fourth", "year":"2014", "photo":"cararasmall.jpg"};
orangeLoc[4] = {"name":"Parque Nacional Volcan Tenorio","lat":"10.658282","longe":"-84.971351", "numb":"fifth", "year":"2014", "photo":"tenoriosmall.jpg"};

function renderMap() {
    me = new google.maps.LatLng(lat, longe);
    map = new google.maps.Map(document.getElementById("amigosmap"), mapOptions);
 
    addStationMarkers();
    map.panTo(me);
    //marker.setMap(map);
}

function addStationMarkers()
{
    var flightPlanCoordinates = [];
    for (var i = 0; i < 3; i++) {
        createMarker(blueLoc[i], "blue");
        flightPlanCoordinates[i] = 
            new google.maps.LatLng(blueLoc[i].lat,blueLoc[i].longe);
    }
    drawLines(flightPlanCoordinates, "blue");

    var moreCoordinates = [];
    for (var i = 0; i < 5; i++) {
        createMarker(orangeLoc[i], "orange");
        moreCoordinates[i] =
            new google.maps.LatLng(orangeLoc[i].lat,orangeLoc[i].longe);
    }
    drawLines(moreCoordinates, "orange");
}

function drawLines(flightPlanCoordinates, color) {
    // Use google maps API Polyline object to connect stations with lines
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 0,
        strokeWeight: 2,
        icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '20px'
        }]
    });
   
    flightPath.setMap(map);
}

function createMarker(loc, color) {
    // Will be called on every station on particular line
    var loco = new google.maps.LatLng(loc.lat, loc.longe);
    var iconSource = "http://maps.google.com/mapfiles/kml/paddle/";
    
    // Decide whether markers should be blue, red, or yellow/orange
    if (color == "blue") {
        iconSource += "blu-circle-lv.png";
    } else if (color == "orange") {
        iconSource += "ylw-circle-lv.png";
    }

    // Add the marker
    var locationMarker = new google.maps.Marker({
        map: map,
        position: loco,
        icon: iconSource,
        disableAutoPan: false
    });

    // Using the API, add the correct information about each location
    google.maps.event.addListener(locationMarker, 'click', function() {
        infowindow.close();
        infowindow.setContent(makeTable(loc)); // This gets the information
        infowindow.open(map, this);
    });
}

function makeTable(loc) {
    var content = document.createElement("div");
    content = "<p>" + loc.name + ", my " + loc.numb + " stop in " + loc.year +
            ".</p><img src='/images/" + loc.photo + "' alt='Amigos Photos'>";
    return content;
}

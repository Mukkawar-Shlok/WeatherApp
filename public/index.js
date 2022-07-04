const city = document.getElementById("city");
var marker;
// Asynchronous function
const show = async () => {
    // Our node server end-point
    const apiUrl = `/weather/${city.value}`;

    // Fetch url
    const res = await fetch(apiUrl);

    // Fetch json data
    const json = await res.json();

    // Debug
    console.log(json["city"], json["temp"], json.coord);
    marker = new L.Marker(json.coord, { draggable: true });
    count = []
    addPoint(json.city, json.temp, json.coord);
};

/*
 *  INITIALIZING MAP
 */

var mapOptions = {
    center: [17.385044, 78.486671],
    zoom: 5,
};
var map = new L.map("map", mapOptions);
var layer = new L.TileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
);
map.addLayer(layer);
// L.marker([18.516726, 73.856255]).addTo(map);

const addPoint = (city, temp, coord) => {
    try {
        map.removeLayer(marker);
        map.addLayer(marker);
        marker
            .bindPopup(
                `Temperature at <b>${city}</b> is <br /> <div class='temp' style="display: flex; justify-content: center; align-item:center"> ${temp}&degC.`
            )
            .openPopup();
        L.marker([coord.lat, coord.lon]).addTo(map);
    } catch (e) {
        coord = [21.146633, 79.08886]
        console.log("City Not Found!");
        marker = new L.Marker([21.146633, 79.08886], { draggable: true });
        map.addLayer(marker);
        marker.bindPopup(`City <b>NOT</b> Found :(`).openPopup();
        L.marker([21.146633, 79.08886]).addTo(map);
    }
};

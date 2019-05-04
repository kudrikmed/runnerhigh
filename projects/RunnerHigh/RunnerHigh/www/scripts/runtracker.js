var navigatorOptions = {
    enableHighAccuracy: true,       // определяет точность геолокации
    timeout: 1000,                  // максимальное время для вычисления позиции, Infinity для бесконечности   
    maximumAge: 0                   // срок годности кэшированных данных о месторасположении
};

var coordsArray = [];  // массив для сохранения данных о координатах
var tripDistance = 0;      // пройденное расстояние

window.onload = getMyLocation; // вызов функции getMyLocation при окончании загрузки страницы

var ourCoords = {                // переменная для тестирования расстояния до объекта
    latitude: 47.624851,
    longitude: -122.52099
};

function getMyLocation() {
    if (navigator.geolocation) {          // проверка, поддерживает ли браузер geolocation
        // navigator.geolocation.getCurrentPosition(displayLocation, displayError);  // displayLocation - обработчик, которому передается объект с данными о местоположении, одна функция передвет значение другой функции, displayError - обработчик ошибок
        var watchButton = document.getElementById("startButton");           // при нажатии кнопок запускаются функции watchLocation и clearWatch
        watchButton.onclick = watchLocation;  // запускает функцию watchLocation


        var clearWatchButton = document.getElementById("stopButton");
        clearWatchButton.onclick = clearWatch;

    } else {
        alert("Oops, no geolocation support!")
    }
}
function displayLocation(position) { // данный обработчик вызывается, когда браузер получает данные о месторасположении и передает объект position
    var latitude = position.coords.latitude; // у объекта position есть свойство coords, содержащее значения широты и долготы, точности их определения
    var longitude = position.coords.longitude;
    var speed = position.coords.speed;  // скорость перемещения



    /*
    var div = document.getElementById("location"); // результаты задаются элементу HTML с помощью innerHTML текущее расположение
    div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude; // вывод текущего растоложения
    div.innerHTML += " with " + position.coords.accuracy + " meters accuracy";  // position.coords.accuracy - свойство, указывающее точность местоположения
    */

    /*
    var km = computeDistance(position.coords, ourCoords);  // здесь position - это текущее расположение, а ourCoords - задаваемое
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are " + km + " km from the ourCoords";
    */

    var speedOmeter = document.getElementById("speed");
    speedOmeter.innerHTML = "Your speed is " + Math.round(speed * 3.6) + " km/h";  // вывод значения скорости

    // Calculate distance from last position if available
    var lastPos = coordsArray[coordsArray.length - 1];
    if (lastPos) {
        if (speed > 1) {
            tripDistance += computeDistance(lastPos, position.coords);
        }
    }

    // Add new coordinates to array
    coordsArray.push(position.coords);

    var traveledDistance = document.getElementById("traveledDistance");
    traveledDistance.innerHTML = "Distance of trip is " + tripDistance + " m";

    var myMap = L.map('map', { center: [latitude, longitude], zoom: 16 });
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'OpenStreetMap' }).addTo(myMap);

/*
    if (map == null) {  // если карта не была  создана
        showMap(position.coords); // вызов функции showMap после загрузки остальных элементов
    }
    else {
        scrollMapToPosition(position);
    }

    */
}

var watchID = null; // глобальная переменная отслеживания расположения

function watchLocation() {   // вызывается при нажатии на кнопку watch
    watchID = navigator.geolocation.watchPosition(displayLocation, displayError, navigatorOptions); // используются те же обработчики, что и для функции getCurrentPosition

}

function clearWatch() {  // вызывается при нажатии на кнопку clearWatch 
    if (watchID) {
        navigator.geolocation.clearWatch(watchID); //передаем значение watchID при его наличии для остановки отслеживания
        watchID = null;
    }
}

function displayError(error) { // обработчик ошибок
    var errorTypes = {        // свойство errorTypes содержит числовые значения ошибок
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function scrollMapToPosition(coords) {
    var latitude = coords.latitude;
    var longitude = coords.longitude;
    var latlong = google.maps.LatLng(latitude, longitude); // извлекаются значения latitude и longitude и создается для них объект google.maps.LatLng

    map.panTo(latlong);
}

function computeDistance(startCoords, destCoords) { // функция принимает значение координат двух точек и возвращает значение расстояния между ними в километрах
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);

    var Radius = 6371000; // радиус Земли в метрах
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + // используется функция гаверсинуса
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function degreesToRadians(degrees) {  // перевод градусов в радианы
    var radians = (degrees * Math.PI) / 180;
    return radians;
}

function appendPosition(position) {
    // Calculate distance from last position if available
    var lastPos = coordsArray[coordsArray.length - 1];
    if (lastPos) {
        tripDistance += computeDistance(lastPos, position.coords);
    }

    // Add new coordinates to array
    coordsArray.push(position.coords);
}
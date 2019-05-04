// Dom7
var $$ = Dom7;
// Framework7 App main instance

var app  = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
      // Demo products for Catalog section
      products: [
        {
          id: '1',
          title: 'Apple iPhone 8',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis.'
        },
        {
          id: '2',
          title: 'Apple iPhone 8 Plus',
          description: 'Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!'
        },
        {
          id: '3',
          title: 'Apple iPhone X',
          description: 'Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum.'
        },
      ]
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
});

// Init/Create views
var homeView = app.views.create('#view-home', {
  url: '/'
});
/*
var catalogView = app.views.create('#view-catalog', {
  url: '/catalog/'
});
var settingsView = app.views.create('#view-settings', {
  url: '/settings/'
});
*/

var runtrackerView = app.views.create('#view-runtracker', {
    url: '/runtracker/'
});

var newsView = app.views.create('#view-news', {
    url: '/news/'
});

/*
var progressView = app.views.create('#view-progress', {
    url: '/progress/'
});
*/
var profileView = app.views.create('#view-profile', {
    url: '/profile/'
});
var programmsView = app.views.create('#view-programms', {
    url: '/programms/'
});


// загрузка экрана логина при первом старте

if (localStorage.getItem('firstStart') != 'no') {
    console.log('First start of the app');
    app.loginScreen.open('#my-login-screen');
  
}
else
{
 
    console.log('Not first start of the app');
}

var coordsArray = [];  // массив для сохранения данных о координатах
var tripDistance = 0;      // пройденное расстояние
var watchID = null; // глобальная переменная отслеживания расположения во время бега
var watchIDStatic = null; // глобальная переменная отслеживания расположения вне тренировки
var watchIDSteps = null; // глобальная переменная отслеживания акселерометра
var speed = 0; // переменная скорости перемещения
var myMap = null; // глобальная переменная, содержащая нашу карту
var stepsCount = 0; // количество пройденных шагов


var pedometerOptions = {
    frequency: 1000
};

var navigatorOptions = {
    enableHighAccuracy: true,       // определяет точность геолокации
    timeout: 1000,                  // максимальное время для вычисления позиции, Infinity для бесконечности   
    maximumAge: 0                   // срок годности кэшированных данных о месторасположении
};

var navigatorOptionsStatic = {
    enableHighAccuracy: true,       // определяет точность геолокации
    timeout: 1000,                  // максимальное время для вычисления позиции, Infinity для бесконечности   
    maximumAge: 0                   // срок годности кэшированных данных о месторасположении
};


// отслеживание и загрузка карты при отрытии таба runtracker
$$('#view-runtracker').on('tab:show', function (e) {

    if (navigator.geolocation) {
        console.log("runtracker tab is opened");
        watchIDStatic = navigator.geolocation.watchPosition(displayStaticLocation, displayError, navigatorOptionsStatic);

        if (window.DeviceOrientationEvent) {
            console.log("DeviceOrientation is supported");
        }
    };
});

$$('#fabstart').on('click', function () {
    app.popup.open('#my-popup', true);
    if (navigator.geolocation) {
        console.log("Navigation is ok");
        navigator.geolocation.clearWatch(watchIDStatic); //передаем значение watchID при его наличии для остановки отслеживания
        watchIDStatic = null;
        watchID = navigator.geolocation.watchPosition(displayLocation, displayError, navigatorOptions); // используются те же обработчики, что и для функции getCurrentPosition
        console.log("Tracking...");            
    }

    window.addEventListener("devicemotion", processAccelerationEvent, true);
  
    
});

$$('#fabstop').on('click', function () {
   
    if (watchID) {
        navigator.geolocation.clearWatch(watchID); //передаем значение watchID при его наличии для остановки отслеживания
        watchID = null;
        console.log("Tracking stopped");
        $$('#speed').text('-');
        $$('#traveledDistance').text('-');
       
        window.removeEventListener("devicemotion", processAccelerationEvent);

        watchIDStatic = navigator.geolocation.watchPosition(displayStaticLocation, displayError, navigatorOptionsStatic);
  
        app.popup.close('#my-popup', true);

    }

    });

function displayStaticLocation(position) { // загрузка карты при запуске приложения
        console.log('displayStaticLocation()');
        var latitude = position.coords.latitude; // у объекта position есть свойство coords, содержащее значения широты и долготы, точности их определения
        var longitude = position.coords.longitude;
     
        myMap = L.map('map', { center: [latitude, longitude], zoom: 16 });
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'OpenStreetMap' }).addTo(myMap);

       // $$('#fabgps').removeClass('color-yellow');
        $$('#fabgps').addClass('color-green');  // меняет цвет fab кнопки на зеленый при успешном подключении к gps

/*
        // определение погоды
        if (latitude) {
            if (sessionStorage.getItem('iKnowWeather') != 'yes')    // openweathermap.org, kudrikmed@gmail.com 241089dima,
            {
                app.request.json("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=8c5401f58cf58aec7c44b3e8f54e2847",
                    function (weather) {
                        console.log("weather");
                        console.log(weather);
                        sessionStorage.setItem('iKnowWeather', 'yes');
                      
                    },
                    function (e) { console.log("Error with weather " + e) });
            };

          // определение качества воздуха
            if (sessionStorage.getItem('iKnowAir') != 'yes')    // http://aqicn.org, token ddb560077545814354ba09bdbcd9d77bcaeff32e
            {
            
                app.request.json("https://api.waqi.info/feed/geo:" + latitude + ";" + longitude + "/?token=ddb560077545814354ba09bdbcd9d77bcaeff32e",
                    function (air) {
                        console.log("air");
                        console.log(air);
                        sessionStorage.setItem('iKnowAir', 'yes');

                    },
                    function (e) { console.log("Error with air " + e) });
            };
        };
*/
}

function displayLocation(position) { // данный обработчик вызывается, когда браузер динамически получает данные о месторасположении и передает объект position

    
    var latitude = position.coords.latitude; // у объекта position есть свойство coords, содержащее значения широты и долготы, точности их определения
    var longitude = position.coords.longitude;
    var speed = position.coords.speed;
    
  
    $$('#speed').text((speed * 3.6).toFixed(1) + " km/h");
    $$('#accuracy').text(position.coords.accuracy.toFixed(0));
    $$('#adrenalin').text(predictneuronet([15, 90], [1, 60]));  // аргументы ([время мин, ЧСС], [пол (0 - женский, 1 - мужской), Vo2 max // 40-60-80])

    // Calculate distance from last position if available
    var lastPos = coordsArray[coordsArray.length - 1];
    if (lastPos) {
        if (speed > 0 || position.coords.accuracy < 5) {
            tripDistance += computeDistance(lastPos, position.coords);
              // Add new coordinates to array
            coordsArray.push(position.coords);
          }
        
       
    }
    $$('#traveledDistance').text((tripDistance/1000).toFixed(1)+' km');
  

   
        myMap = L.map('map', { center: [latitude, longitude], zoom: 16 });
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '@OpenStreetMap' }).addTo(myMap);
    //    L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { attribution: 'OpenStreetMap' }).addTo(myMap);
   /*     L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            id: 'mapbox.streets'
        }).addTo(myMap);
   */
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
   console.log(errorMessage.stringify());
   
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

function processAccelerationEvent(event) {
    /*
    console.log(event.acceleration.x);
    console.log(event.acceleration.y);
    console.log(event.acceleration.z);
    */
}



$$('#view-news').on('tab:show', function (e) {

    app.request.post('http://kudrytski.by/runnerhigh/news.php', { newslanguage: 'eng' }, function (data) {
     
        var news = data.split('%$%');  // мой разделитель

        var newsBlock = document.getElementById('newsplace');
        newsBlock.innerHTML = "";

        for (var c = 0; c < (news.length - 1); c++) {


            // создание карточки с новостью

            var newElement = document.createElement('div');
            newElement.id = news[c]; newElement.className = "card card-expandable";
            newsBlock.appendChild(newElement);


            var newCardContent = document.createElement('div');
            newCardContent.className = "card-content";
            newElement.appendChild(newCardContent);

            var background = document.createElement('div');
            //    background.style = "background: url(./images/cordova.png) no-repeat center bottom; background-size: cover; height: 240px"
            newCardContent.appendChild(background);

            var newCloseButton = document.createElement('a');
            newCloseButton.href = "#";
            newCloseButton.className = "link card-close card-opened-fade-in color-white";
            newCloseButton.style = "position: absolute; right: 15px; top: 15px";
            newCardContent.appendChild(newCloseButton);

            var iconCloseButton = document.createElement('i');
            iconCloseButton.className = "icon f7-icons";
            iconCloseButton.innerHTML = "close_round_filled";
            newCloseButton.appendChild(iconCloseButton);

            var parsedNews = JSON.parse(news[c]);

            // картинка на фон
            background.style = "background : url(" + parsedNews['picture'] + ") no-repeat center bottom; background-size: cover; height: 240px";


            // создание заглавия для новости
            var newNewsHeader = document.createElement('div');
            newNewsHeader.className = "card-header display-block"; newNewsHeader.style = "height: 40px color: white; backgroung-color: pink";
            newNewsHeader.innerHTML = parsedNews['newsheader'];
            newCardContent.appendChild(newNewsHeader);

            // создание тела новости
            var newNewsBody = document.createElement('div');
            newNewsBody.className = "card-content-padding";
            newNewsBody.innerHTML = parsedNews['newsmain'];
            newCardContent.appendChild(newNewsBody);

            //создание ряда с двумя столбцами
            var newRow = document.createElement('div');
            newRow.className = "row";
            newCardContent.appendChild(newRow);
         

            var leftCol = document.createElement('div');
            leftCol.className = "col-50";
            newRow.appendChild(leftCol);
          

            var rightCol = document.createElement('div');
            rightCol.className = "col-50";
            newRow.appendChild(rightCol);
            
            // гиперссылка читать далее
            var newReadMoreButton = document.createElement('a');
            newReadMoreButton.href = parsedNews['newurl'];
            newReadMoreButton.className = "link external button button-fill button-round button-large";
            newReadMoreButton.innerHTML = "Read more";
            leftCol.appendChild(newReadMoreButton);

            // кнопка закрыть карточку
            var newBottomCloseButton = document.createElement('a');
            newBottomCloseButton.href = "#";
            newBottomCloseButton.className = "button button-fill button-round button-large card-close";
            newBottomCloseButton.innerHTML = "Close";
            rightCol.appendChild(newBottomCloseButton);


        }
    }, function () { console.log('Error'); });

});

function calculateAge() {
    var birthday = Date.parse(localStorage.getItem('birthday'));
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs);
    var ageYears = (Math.abs(ageDate.getUTCFullYear() - 1970));
    return ageYears;
};

// профиль
$$('#view-profile').on('tab:show', function (e) {
    // имя и фамилия
    var nameSecondName = document.getElementById('username');
    if (localStorage.getItem('firstname') && localStorage.getItem('secondname')) {
        nameSecondName.innerHTML = localStorage.getItem('firstname') + " " + localStorage.getItem('secondname');
    }
    else {
        nameSecondName.innerHTML = "Your name";
    }
   

     // индекс массы тела
    var bmi = parseInt(localStorage.getItem('bodymass')) / Math.pow(parseInt(localStorage.getItem('height')) / 100, 2);
    var bmihtml = document.getElementById('bmivalue');
    bmihtml.innerHTML = bmi.toFixed(1);

    // безопасная ЧСС  https://chelmetar.ru/raznoe/raschet-zon-chss-raschyot-pulsa-chss-dlya-raznyx-zon-nagruzki.html

    // расчет возраста
    /*
    var birthday = Date.parse(localStorage.getItem('birthday'));
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs);
    var ageYears = (Math.abs(ageDate.getUTCFullYear() - 1970));
    */
    var ageYears = calculateAge();

    var safeHR = 205.8 - (0.685 * ageYears);   // формула Robergs & Landwehr
    console.log(safeHR);
    var hrhtml = document.getElementById('safehrvalue');
    hrhtml.innerHTML = Math.round(safeHR);

    //процент жира
    var gender = 1;  // в данной формуле мужской пол кодируется 1, женский 0
    if (localStorage.getItem('gender') == 'Female')
    {
        gender = 0;
    }
    var bfp = 1.39 * bmi + 0.23 * ageYears - 10.34 * gender - 9;
    var bfphtml = document.getElementById('fatpercentagevalue');
    bfphtml.innerHTML = Math.round(bfp) + "%";
});




// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
    var username = $$('#my-login-screen [name="username"]').val();
    var password = $$('#my-login-screen [name="password"]').val();

    if (username == "") {
        app.dialog.alert('Please, enter username!')
        return;
    }
    if (password == "") {
        app.dialog.alert('Please, enter password!')
        return;
    }
        app.request.post('http://kudrytski.by/runnerhigh/login.php', {
            login: username,
            password: password
        }, function (data) {
      
            
            if (data == "usernotfound") {
                app.dialog.alert('Sorry, these is no accout with this login!')
                return;
            }
            if (data == "invalidpassword") {
                app.dialog.alert('Please, check the password!')
                return;
            }
          
            if (data['login'] != '') {

                var user = JSON.parse(data);
            
                localStorage.setItem('firstname', user['firstname']);               
                localStorage.setItem('secondname', user['secondname']);
                localStorage.setItem('birthday', user['birthday']);
                localStorage.setItem('gender', user['gender']);
                localStorage.setItem('bodymass', user['bodymass']);
                localStorage.setItem('height', user['height']);
                localStorage.setItem('email', user['email']);
                localStorage.setItem('login', user['login']);

                console.log(user['firstname']);
                console.log(user['secondname']);
                console.log(user['birthday']);
                console.log(user['gender']);
                console.log(user['bodymass']);
                console.log(user['height']);
                console.log(user['email']);
                console.log(user['login']);
                
                localStorage.setItem('firstStart', 'no');
                // Close login screen
                app.loginScreen.close('#my-login-screen');
            }

        }, function () {
            console.log('Error during login');
            app.dialog.alert('Error during login!')
        });
    });



// Registration screen
$$('#createNewAcc').on('click', function () {
    app.loginScreen.open('#my-registration-screen');
    app.loginScreen.close('#my-login-screen');
});

// Registration

$$('#register-button').on('click', function () {

    var firstnamedata = $$('#my-registration-screen [name="firstname"]').val();
    var secondnamedata = $$('#my-registration-screen [name="secondname"]').val();
    var birthdaydata = $$('#my-registration-screen [name="birthday"]').val();
    var e = document.getElementById("genderselector");
    var genderdata = e.options[e.selectedIndex].text;
    var f = document.getElementById("massselector");
    var massselectordata = f.options[f.selectedIndex].text;
    var bodymassdata = $$('#my-registration-screen [name="bodymass"]').val();
    var g = document.getElementById("heightselector");
    var heightselectordata = g.options[g.selectedIndex].text;
    var heightdata = $$('#my-registration-screen [name="height"]').val();
    var emaildata = $$('#my-registration-screen [name="email"]').val();
    var logindata = $$('#my-registration-screen [name="login"]').val();
    var passworddata = $$('#my-registration-screen [name="password"]').val();

        if ($$('#my-registration-screen [name="password"]').val() != $$('#my-registration-screen [name="password2"]').val())
          {
            app.dialog.alert('Password and control password are not similar!')
            return;
         }
        if (genderdata == "") {
            app.dialog.alert('Please, select gender!')
            return;
        }
        if (bodymassdata == "") {
            app.dialog.alert('Please, ender body mass!')
            return;
        }
        if (heightdata == "") {
            app.dialog.alert('Please, ender height!')
            return;
        }
        if (birthdaydata == "") {
            app.dialog.alert('Please, select birthday date!')
            return;
        }
        if (emaildata == "") {
            app.dialog.alert('Please, enter e-mail!')
            return;
        }
        if (logindata == "") {
            app.dialog.alert('Please, enter login!')
            return;
        }
        if (passworddata == "") {
            app.dialog.alert('Please, enter password!')
            return;
        }
        if (massselectordata == 'lbs')
        {
            bodymassdata = Math.round(bodymassdata / 2.205);
        }
        if (heightselectordata == 'inch') {
            heightdata = Math.round(heightdata * 2.54);
        }
        app.request.post('http://kudrytski.by/runnerhigh/registration.php', {
            firstname: firstnamedata,
            secondname: secondnamedata,
            birthday: birthdaydata,
            gender: genderdata,
            bodymass: bodymassdata,
            height: heightdata,
            email: emaildata,
            login: logindata,
            password: passworddata
        }, function (data) {
            console.log(data);
            if (data == "success")
            {
                localStorage.setItem('firstname', firstnamedata);
                localStorage.setItem('secondname', secondnamedata);
                localStorage.setItem('birthday', birthdaydata);
                localStorage.setItem('gender', genderdata);
                localStorage.setItem('bodymass', bodymassdata);
                localStorage.setItem('height', heightdata);
                localStorage.setItem('email', emaildata);
                localStorage.setItem('login', logindata);
                localStorage.setItem('password', passworddata);

                localStorage.setItem('firstStart', 'no');

                app.loginScreen.close('#my-registration-screen');
            }
            if (data == "sameloginsameemail") {
                app.dialog.alert('Sorry, accout with these login and email already exists!')
            }
            if (data == "samelogin")
            {
                app.dialog.alert('Sorry, accout with this login already exists!')
            }
            if (data == "sameemail") {
                app.dialog.alert('Sorry, accout with this e-mail already exists!')
            }

            
        }, function () {
            console.log('Error during registration');
            app.dialog.alert('Error during registration!')
        });

    
   
       
    
});

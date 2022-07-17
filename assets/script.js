var searchSpan = document.getElementById('search-span');
var searchBtn = document.querySelector('#search-button');
var historySpan = document.querySelector('#history-span');
var historyBtn = document.querySelectorAll('.history-button');
var citySearch = document.getElementById('city-search');
var searchedCity = document.getElementById('searched-city');
var weatherInfo = document.createElement('p');
var rowDiv2 = document.getElementById('row-2');
var currentDate = moment().format('DD/MM/YYYY');
var searchHistory = [];
var cityInput = [];

// Function fetches API url for current weather forecast
function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&units=metric' + '&APPID=9e2b252191b74f3988fdce624f0c0b11';
    rowDiv2.innerHTML = '';

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)

        searchedCity.innerHTML = data.name + " - " + currentDate + " " + "<img src='http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png' alt='weather-icon' height='40'>";
        weatherInfo.innerHTML = '<b>Temp:</b> ' + data.main.temp + ' °C<br><b>Wind:</b> ' + data.wind.speed + ' MPH<br><b>Humidity:</b> ' + data.main.humidity + ' %<br><b>UV Index:</b> ';
        searchedCity.after(weatherInfo);

        // 5-day forecast
        var forecastUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&units=metric' + '&exclude=current,minutely,hourly,alerts' + '&appid=9e2b252191b74f3988fdce624f0c0b11';
        console.log(forecastUrl);

        fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            var uvIndex = document.createElement("mark");
            uvIndex.innerHTML = '<b>' + data.daily[0].uvi + '</b>';
            weatherInfo.append(uvIndex);

            if (data.daily[0].uvi > 2) {
                uvIndex.setAttribute('style','background-color: red');
            } else {
                uvIndex.setAttribute('style','background-color: green');
            }

            rowDiv2.innerHTML = '<hr><h2>5-Day Forecast:</h2>';

            function forecastDay1() {
                var unix1 = data.daily[1].dt;
                var date1 = moment.unix(unix1).format('DD/MM/YYYY');
                var weatherCard1 = document.createElement('div');
                weatherCard1.classList.add('weather-card');
                weatherCard1.innerHTML = "<h3>" + date1 + "</h3>" + "<img src='http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png' alt='weather-icon'>" + '<b>Temp:</b> ' + data.daily[1].temp.day + ' °C<br><b>Wind:</b> ' + data.daily[1].wind_speed + ' MPH<br><b>Humidity:</b> ' + data.daily[1].humidity + ' %';
                rowDiv2.append(weatherCard1);
            }

            function forecastDay2() {
                var unix2 = data.daily[2].dt;
                var date2 = moment.unix(unix2).format('DD/MM/YYYY');
                var weatherCard2 = document.createElement('div');
                weatherCard2.classList.add('weather-card');
                weatherCard2.innerHTML = "<h3>" + date2 + "</h3>" + "<img src='http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png' alt='weather-icon'>" + '<b>Temp:</b> ' + data.daily[2].temp.day + ' °C<br><b>Wind:</b> ' + data.daily[2].wind_speed + ' MPH<br><b>Humidity:</b> ' + data.daily[2].humidity + ' %';
                rowDiv2.append(weatherCard2);
            }

            function forecastDay3() {
                var unix3 = data.daily[3].dt;
                var date3 = moment.unix(unix3).format('DD/MM/YYYY');
                var weatherCard3 = document.createElement('div');
                weatherCard3.classList.add('weather-card');
                weatherCard3.innerHTML = "<h3>" + date3 + "</h3>" + "<img src='http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png' alt='weather-icon'>" + '<b>Temp:</b> ' + data.daily[3].temp.day + ' °C<br><b>Wind:</b> ' + data.daily[3].wind_speed + ' MPH<br><b>Humidity:</b> ' + data.daily[3].humidity + ' %';
                rowDiv2.append(weatherCard3);
            }

            function forecastDay4() {
                var unix4 = data.daily[4].dt;
                var date4 = moment.unix(unix4).format('DD/MM/YYYY');
                var weatherCard4 = document.createElement('div');
                weatherCard4.classList.add('weather-card');
                weatherCard4.innerHTML = "<h3>" + date4 + "</h3>" + "<img src='http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png' alt='weather-icon'>" + '<b>Temp:</b> ' + data.daily[4].temp.day + ' °C<br><b>Wind:</b> ' + data.daily[4].wind_speed + ' MPH<br><b>Humidity:</b> ' + data.daily[4].humidity + ' %';
                rowDiv2.append(weatherCard4);
            }

            function forecastDay5() {
                var unix5 = data.daily[5].dt;
                var date5 = moment.unix(unix5).format('DD/MM/YYYY');
                var weatherCard5 = document.createElement('div');
                weatherCard5.classList.add('weather-card');
                weatherCard5.innerHTML = "<h3>" + date5 + "</h3>" + "<img src='http://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + "@2x.png' alt='weather-icon'>" + '<b>Temp:</b> ' + data.daily[5].temp.day + ' °C<br><b>Wind:</b> ' + data.daily[5].wind_speed + ' MPH<br><b>Humidity:</b> ' + data.daily[5].humidity + ' %';
                rowDiv2.append(weatherCard5);
            }

            forecastDay1();
            forecastDay2();
            forecastDay3();
            forecastDay4();
            forecastDay5();
        });

    });
}

// Q: why does this function not automatically run on page load/reload?
function renderHistory() {
    historySpan.innerHTML = '';

    for (var i = 0; i < searchHistory.length; i++) {
        var searchList = searchHistory[i];

        var btn = document.createElement('button');
        btn.textContent = searchList;
        btn.setAttribute('data-index', i);
        btn.setAttribute('class', 'history-button');
        historySpan.appendChild(btn);
    }
}

// get local storage
function init() {
    var storedSearch = JSON.parse(localStorage.getItem('history'));

    if (storedSearch !== null) {
        searchList = storedSearch;
    }

    renderHistory();
}

// store into local storage
function storeHistory() {
    localStorage.setItem("history", JSON.stringify(searchHistory));
}

// search via user input
function search() {
    cityInput = citySearch.value.trim();

    if (cityInput === "") {
        return;
    }

    searchHistory.push(cityInput);
    citySearch.value = "";

    storeHistory();
    renderHistory();
    getApi();

    console.log(cityInput);
}

// search button event
searchBtn.addEventListener('click', function(event) {
    event.preventDefault();

    search();
});

// search via history search buttons
historySpan.addEventListener('click', function(event) {
    var element = event.target;

    if (element.matches('button') === true) {
        cityInput = element.textContent;
        getApi();
    }
})

init();
renderHistory();
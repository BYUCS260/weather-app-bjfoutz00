document.getElementById("weatherSubmit").addEventListener("click", (event) => {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "") { 
        return;
    }
    console.log(value);

    const apiKey = "1777915fc425033c4976ef4487519f53";
    const url1 = "https://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=" + apiKey;
    fetch(url1).then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json);
        let results = "";
        results += '<div id="weather-results-container">';
        results += '<h2 id="weather-title">Weather in ' + json.name + "</h2>";
        results += '<div class="main-weather">';
        results += '<h2 class="main-temp">' + json.main.temp + " &deg;F</h2>";
        for (let i = 0; i < json.weather.length; i++) {
            results += '<img id="weather-icon" src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '</div>';
        results += "<p>Feels like " + json.main.feels_like + " &deg;F</p>";
        
        results += "<p>Conditions: ";
        for (let i = 0; i < json.weather.length; i++) {
            results += json.weather[i].description;
            if (i !== json.weather.length - 1) {
                results += ", ";
            }
        }
        results += "<p>Wind: " + json.wind.speed + " mph</p>";
        results += "<p>Humidity: " + json.main.humidity + "%</p>";
        results += "<p>Visibility: " + json.visibility + " meters</p>";
        
        results += "</div>";
        document.getElementById("weatherResults").innerHTML = results;
    }).catch(e => {
        console.log(e);
    });

    const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + ",US&units=imperial" + "&APPID=" + apiKey;
    fetch(url2).then((response) => {
        return response.json();
    }).then((json) => {
        console.log(json);
        let forecast = "";
        forecast += "<h2 id='forecast-title'>Forecast</h2>";
        forecast += "<div id='forecast-results-container'>";
        for (let i = 0; i < json.list.length; i++) {
            forecast += "<div class='forecast-tile'>"
            forecast += "<h2 id='location'>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm a') + "</h2>";
            forecast += "<div id='main-forecast'>";
            forecast += "<h3 class='main-temp' id='tile-temp'>" + json.list[i].main.temp + " &deg;F</h3>";
            forecast += "<img id='weather-icon' src='https://openweathermap.org/img/w/" + json.list[i].weather[0].icon + ".png'/>";
            forecast += "</div>";
            forecast += "<p>Conditions: " + json.list[i].weather[0].description + "</p>"; 
            forecast += "<p>Precipitation: " + json.list[i].pop + "%</p>";
            forecast += "<p>Wind: " + json.list[i].wind.speed + " mph</p>";
            forecast += "<p>Humidity: " + json.list[i].main.humidity + "%</p>";
            forecast += "<p>Visibility: " + json.list[i].visibility + " meters</p>";
            forecast += "</div>";
        }
        forecast += "</div>";
        document.getElementById("forecastResults").innerHTML = forecast;
    });
});
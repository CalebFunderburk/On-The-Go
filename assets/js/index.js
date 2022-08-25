// // Global Selectors
// let btn = document.querySelector(".btn");
// let inputValue = document.querySelector(".input-value");
// let cityName = document.querySelector(".city-name");
// let date = document.querySelector(".date");
// let pic = document.querySelector(".pic");
// let temp = document.querySelector(".temp");
// let wind = document.querySelector(".wind");
// let humid = document.querySelector(".humid");

// Display current date and time
const currentTime = moment();
$("p.time-display").html(currentTime.format("[Today's date is: ] dddd MMMM Do, YYYY h:mm a"));

// Weather API function
const app = {
    init: () => {
      document
        .getElementById("btn-current")
        .addEventListener("click", app.fetchWeather);
      document
        .getElementById("btn-get")
        .addEventListener("click", app.getLocation);
    },
    fetchWeather: (ev) => {
        // Open Weather Map API Variables
        let lat = document.getElementById("latitude").value;
        let lon = document.getElementById("longitude").value;
        let key = "bd92569b2643837c2eebddc7bd2b2560";
        let lang = "en";
        let units = "standard";
        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;

        // Caleb's Open Weather Map ID = bd92569b2643837c2eebddc7bd2b2560
        // Original API link I was using = https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=3895e7bdd38cc88449bc0dc944a705c5 

        // Fetch the weather
        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                app.showWeather(data);
            })
            .catch(console.err);
    },
    getLocation: (ev) => {
        // Default options
        let opts = {
            enableHighAccuracy: true,
            timeout: 1000 * 10,
            maximumAge: 1000 * 60 * 5, 
        };
        navigator.geolocation.getCurrentPosition(app.success, app.failure, opts);
    },
    success: (position) => {
        // Geolocation success
        document.getElementById("latitude").value = 
            position.coords.latitude.toFixed(2);
        document.getElementById("longitude").value =
            position.coords.longitude.toFixed(2);
    },
    failure: (err) => {
        // Geolocation failed
        console.error(err);
    },
    showWeather: (response) => {
        console.log(response);
        //let row = document.querySelector("current-weather");
    }
}

// Holiday API fetch request
fetch('https://date.nager.at/api/v3/publicholidays/2017/AT')
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
    });



app.init();
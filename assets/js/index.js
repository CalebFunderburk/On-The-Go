// Global Selectors
var btn = document.querySelector(".btn");
var inputValue = document.querySelector(".input-value");
var cityName = document.querySelector(".city-name");
var date = document.querySelector(".date");
var pic = document.querySelector(".pic");
var temp = document.querySelector(".temp");
var wind = document.querySelector(".wind");
var humid = document.querySelector(".humid");

const currentTime = moment();

// Display current date and time
$("p.time-display").html(currentTime.format("[Today's date is: ] dddd MMMM Do, YYYY h:mm a"));

btn.addEventListener("submit", function() {
    // Caleb's Open Weather Map ID = 3895e7bdd38cc88449bc0dc944a705c5
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=3895e7bdd38cc88449bc0dc944a705c5`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
});
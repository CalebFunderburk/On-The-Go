// Global Selectors
let btn = document.querySelector(".btn");
let inputValue = document.querySelector(".input-value");
let cityName = document.querySelector(".city-name");
let date = document.querySelector(".date");
let pic = document.querySelector(".pic");
let temp = document.querySelector(".temp");
let wind = document.querySelector(".wind");
let humid = document.querySelector(".humid");

// Display current date and time
const currentTime = moment();
$("p.time-display").html(currentTime.format("[Today's date is: ] dddd MMMM Do, YYYY h:mm a"));

// Weather API function
const app = {

    // Event listeners for buttons
    init: () => {
      document
        .getElementById("btn-current")
        .addEventListener("click", app.fetchWeather);
      document
        .getElementById("btn-get")
        .addEventListener("click", app.getLocation);
    },

    // API Fetch
    fetchWeather: () => {
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

    // Get the users current location
    getLocation: () => {
        // Default options
        let opts = {
            enableHighAccuracy: true,
            timeout: 1000 * 10,
            maximumAge: 1000 * 60 * 5, 
        };
        navigator.geolocation.getCurrentPosition(app.success, app.failure, opts);
    },

    // Geolocation success
    success: (position) => {
        document.getElementById("latitude").value = 
            position.coords.latitude.toFixed(2);
        document.getElementById("longitude").value =
            position.coords.longitude.toFixed(2);
    },

    // Geolocation failed
    failure: (err) => {
        console.error(err);
    },

    // Display weather stats
    showWeather: (response) => {
        console.log(response);


        // Variable for DOM
        let currentCity = document.getElementById("current-city");
        let currentIcon = document.getElementById("current-icon");
        let currentDesc = document.getElementById("current-desc");
        let currentTemp = document.getElementById("current-temp");
        let currentHumid = document.getElementById("current-humid");
        let currentSpeed = document.getElementById("current-speed");
        var Kelvin = response.list[0].main.temp-273.15;
        
        
        //map to convert icon response to local img
        const map = new Map();

        map.set('01d', './assets/images/01d.png')
        map.set('01n', './assets/images/01n.png')
        map.set('02d', './assets/images/02d.png')
        map.set('02n', './assets/images/02n.png')
        map.set('03d', './assets/images/03d.png')
        map.set('03n', './assets/images/03n.png')
        map.set('04d', './assets/images/04d.png')
        map.set('04n', './assets/images/04n.png')
        map.set('09d', './assets/images/09d.png')
        map.set('09n', './assets/images/09n.png')
        map.set('10d', './assets/images/10d.png')
        map.set('10n', './assets/images/10n.png')
        map.set('11d', './assets/images/11d.png')
        map.set('11n', './assets/images/11n.png')
        map.set('13d', './assets/images/13d.png')
        map.set('13n', './assets/images/13n.png')
        map.set('50d', './assets/images/50d.png')
        map.set('50n', './assets/images/50n.png');

        // Display current weather data onto the page
        currentCity.innerHTML = response.city.name;
        currentIcon.innerHTML = "<img src ='"+map.get(response.list[0].weather[0].icon)+"'/>";
        currentDesc.innerHTML = response.list[0].weather[0].description;
        currentTemp.innerHTML = "Temp:" + ((Kelvin*1.8)+32).toFixed(2) + "F";
        currentHumid.innerHTML = "Humidity: " + response.list[0].main.humidity + "%";
        currentSpeed.innerHTML = "Wind Speed: " + response.list[0].wind.speed + " MPH";
     
        // Display day 1 weather data to page
        let dateDay1 = document.getElementById("date-day1");
        let iconDay1 = document.getElementById("icon-day1");
        let descDay1 = document.getElementById("desc-day1");
        let tempDay1 = document.getElementById("temp-day1");

        dateDay1.innerHTML = response.list[3].dt_txt.replace("12:00:00", "");
        iconDay1.innerHTML = "<img src ='"+map.get(response.list[3].weather[0].icon)+"'/>";
        descDay1.innerHTML = response.list[3].weather[0].description;
        tempDay1.innerHTML= displayFahrenheit(response.list[3].main.temp);

        function displayFahrenheit (temp) {
            var Kelvin = temp-273.15
            return "Temp:" + ((Kelvin*1.8)+32).toFixed(2) + "F"
        }

//****DAY2 
// Display day 2 weather data to page
        let dateDay2 = document.getElementById("date-day2");
        let iconDay2 = document.getElementById("icon-day2");
        let descDay2 = document.getElementById("desc-day2");
        let tempDay2 = document.getElementById("temp-day2");

        dateDay2.innerHTML = response.list[11].dt_txt.replace("12:00:00", "");
        iconDay2.innerHTML = "<img src ='"+map.get(response.list[11].weather[0].icon)+"'/>";
        descDay2.innerHTML = response.list[11].weather[0].description;
        tempDay2.innerHTML= displayFahrenheit(response.list[11].main.temp); 
        
// //****DAY3 
// Display day 3 weather data to page
        let dateDay3 = document.getElementById("date-day3");
        let iconDay3 = document.getElementById("icon-day3");
        let descDay3 = document.getElementById("desc-day3");
        let tempDay3 = document.getElementById("temp-day3");

        dateDay3.innerHTML = response.list[19].dt_txt.replace("12:00:00", "");
        iconDay3.innerHTML = "<img src ='"+map.get(response.list[19].weather[0].icon)+"'/>";
        descDay3.innerHTML = response.list[19].weather[0].description;
        tempDay3.innerHTML= displayFahrenheit(response.list[19].main.temp);
        
//****DAY4 
        // // Display day 2 weather data to page
        let dateDay4 = document.getElementById("date-day4");
        let iconDay4 = document.getElementById("icon-day4");
        let descDay4 = document.getElementById("desc-day4");
        let tempDay4 = document.getElementById("temp-day4");

        dateDay4.innerHTML = response.list[27].dt_txt.replace("12:00:00", "");
        iconDay4.innerHTML = "<img src ='"+map.get(response.list[27].weather[0].icon)+"'/>";
        descDay4.innerHTML = response.list[27].weather[0].description;
        tempDay4.innerHTML= displayFahrenheit(response.list[27].main.temp);   
        
 //****DAY5 
        // // Display day 5 weather data to page
        let dateDay5 = document.getElementById("date-day5");
        let iconDay5 = document.getElementById("icon-day5");
        let descDay5 = document.getElementById("desc-day5");
        let tempDay5 = document.getElementById("temp-day5");

        dateDay5.innerHTML = response.list[35].dt_txt.replace("12:00:00", "");
        iconDay5.innerHTML = "<img src ='"+map.get(response.list[35].weather[0].icon)+"'/>";
        descDay5.innerHTML = response.list[35].weather[0].description;
        tempDay5.innerHTML= displayFahrenheit(response.list[35].main.temp);             
    }
}

// Holiday API fetch request
fetch("https://date.nager.at/api/v3/NextPublicHolidaysWorldwide")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        // Variables for card 1
        let dateHoli1 = document.getElementById("date-holi1");
        let localHoli1 = document.getElementById("local-holi1");
        let commonHoli1 = document.getElementById("common-holi1");

        // Variables for card 2
        let dateHoli2 = document.getElementById("date-holi2");
        let localHoli2 = document.getElementById("local-holi2");
        let commonHoli2 = document.getElementById("common-holi2");

        // Variables for card 3
        let dateHoli3 = document.getElementById("date-holi3");
        let localHoli3 = document.getElementById("local-holi3");
        let commonHoli3 = document.getElementById("common-holi3");
        
        // Variables for card 4
        let dateHoli4 = document.getElementById("date-holi4");
        let localHoli4 = document.getElementById("local-holi4");
        let commonHoli4 = document.getElementById("common-holi4");
        
        // Variables for card 5
        let dateHoli5 = document.getElementById("date-holi5");
        let localHoli5 = document.getElementById("local-holi5");
        let commonHoli5 = document.getElementById("common-holi5");        

        // Display this data in card 1
        dateHoli1.innerHTML = data[0].date
        localHoli1.innerHTML = data[0].localName 
        commonHoli1.innerHTML = data[0].name

        // Display this data in card 2
        dateHoli2.innerHTML = data[1].date
        localHoli2.innerHTML = data[1].localName 
        commonHoli2.innerHTML = data[1].name

        // Display this data in card 3
        dateHoli3.innerHTML = data[2].date
        localHoli3.innerHTML = data[2].localName 
        commonHoli3.innerHTML = data[2].name

        // Display this data in card 4
        dateHoli4.innerHTML = data[3].date
        localHoli4.innerHTML = data[3].localName 
        commonHoli4.innerHTML = data[3].name

        // Display this data in card 5
        dateHoli5.innerHTML = data[4].date
        localHoli5.innerHTML = data[4].localName 
        commonHoli5.innerHTML = data[4].name        

        // Store country code as a variable
        let countryCode1 = data[0].countryCode;
        let countryCode2 = data[1].countryCode;
        let countryCode3 = data[2].countryCode;
        let countryCode4 = data[3].countryCode;
        let countryCode5 = data[4].countryCode;

        // Fetch data with countryCode1
        fetch(`https://date.nager.at/api/v3/CountryInfo/${countryCode1}`)
        .then (function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Variable for card 1
            let countryHoli1 = document.getElementById("country-holi1")

            // Display this data in card 1
            countryHoli1.innerHTML = data.commonName;
        })

        // Fetch data with countryCode2
        fetch(`https://date.nager.at/api/v3/CountryInfo/${countryCode2}`)
        .then (function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Variable for card 2
            let countryHoli2 = document.getElementById("country-holi2")

            // Display this data in card 2
            countryHoli2.innerHTML = data.commonName;
        })

        // Fetch data with countryCode3
        fetch(`https://date.nager.at/api/v3/CountryInfo/${countryCode3}`)
        .then (function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Variable for card 3
            let countryHoli3 = document.getElementById("country-holi3")

            // Display this data in card 3
            countryHoli3.innerHTML = data.commonName;
        })

        // Fetch data with countryCode4
        fetch(`https://date.nager.at/api/v3/CountryInfo/${countryCode4}`)
        .then (function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Variable for card 4
            let countryHoli4 = document.getElementById("country-holi4")

            // Display this data in card 4
            countryHoli4.innerHTML = data.commonName;
        })
        
        // Fetch data with countryCode5
        fetch(`https://date.nager.at/api/v3/CountryInfo/${countryCode5}`)
        .then (function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Variable for card 5
            let countryHoli5 = document.getElementById("country-holi5")

            // Display this data in card 5
            countryHoli5.innerHTML = data.commonName;
        })         
    })
    .catch((err) => {
        console.log(err);
    });



app.init();
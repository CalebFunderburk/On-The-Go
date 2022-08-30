// Display current date and time
const currentTime = moment();
$("p.time-display").html(currentTime.format("dddd MMMM Do, YYYY h:mm a"));

// Weather API function
const app = {

    // Event listeners for buttons
    init: () => {
    document
        .getElementById("btn-get")
        .addEventListener("click", app.getLocation);
    document
        .getElementById("btn-current")
        .addEventListener("click", app.fetchWeather);
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

        // Open Weather Map API fetch request
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
    // What Caleb did here is questionable
    success: (position) => {
        let latData = document.getElementById("latitude").value = 
            position.coords.latitude.toFixed(2);
        let lonData = document.getElementById("longitude").value =
            position.coords.longitude.toFixed(2);

        // Save cordinate data in an array
        let userLoc = {
            lat: `${latData}`,
            lon: `${lonData}`
        }

        // Save user cordinate data to local storage
        localStorage.setItem("User Location", JSON.stringify(userLoc));

    },

    // Geolocation failed
    failure: (err) => {
        console.error(err);
    },

    // Display weather stats
    showWeather: (response) => {
        console.log(response);

        //  Map to convert icon response to local img
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

        // Convert Kelvin to Farenheit function
        function displayFahrenheit (temp) {
            var Kelvin = temp-273.15
            return "Temp: " + ((Kelvin*1.8)+32).toFixed(2) + "F"
        }

        // Variables for current weather area
        // **Ask about var Kelvin**
        let currentCity = document.getElementById("current-city");
        let currentIcon = document.getElementById("current-icon");
        let currentDesc = document.getElementById("current-desc");
        let currentTemp = document.getElementById("current-temp");
        let currentHumid = document.getElementById("current-humid");
        let currentSpeed = document.getElementById("current-speed");
        var Kelvin = response.list[0].main.temp-273.15;        

        // Display current weather data in the current weather area
        currentCity.innerHTML = response.city.name;
        currentIcon.innerHTML = "<img src ='"+map.get(response.list[0].weather[0].icon)+"'/>";
        currentDesc.innerHTML = response.list[0].weather[0].description;
        currentTemp.innerHTML = "Temp: " + ((Kelvin*1.8)+32).toFixed(2) + "F";
        currentHumid.innerHTML = "Humidity: " + response.list[0].main.humidity + "%";
        currentSpeed.innerHTML = "Wind Speed: " + response.list[0].wind.speed + " MPH";

        // "5-Day Forecast"
        let forecastHeader = document.getElementById("forecast-header");
        forecastHeader.innerHTML = "5-Day Forecast:";
     
        // Varibles for weather card 1
        let dateDay1 = document.getElementById("date-day1");
        let iconDay1 = document.getElementById("icon-day1");
        let descDay1 = document.getElementById("desc-day1");
        let tempDay1 = document.getElementById("temp-day1");

        // Format day 1 date
        dateDataDay1 = response.list[4].dt_txt;
        let day1 = new Date(dateDataDay1).getDate();
        let month1 = new Date(dateDataDay1).getMonth() + 1;
        let year1 = new Date(dateDataDay1).getFullYear();
        let dateFormat1 = `${month1}/${day1}/${year1}`;

        // Display day 1 weather data in weather card 1
        dateDay1.innerHTML = dateFormat1;
        iconDay1.innerHTML = "<img src ='"+map.get(response.list[4].weather[0].icon)+"'/>";
        descDay1.innerHTML = response.list[4].weather[0].description;
        tempDay1.innerHTML= displayFahrenheit(response.list[4].main.temp);

        // Varibles for weather card 2
        let dateDay2 = document.getElementById("date-day2");
        let iconDay2 = document.getElementById("icon-day2");
        let descDay2 = document.getElementById("desc-day2");
        let tempDay2 = document.getElementById("temp-day2");

        // Format day 2 date
        dateDataDay2 = response.list[12].dt_txt;
        let day2 = new Date(dateDataDay2).getDate();
        let month2 = new Date(dateDataDay2).getMonth() + 1;
        let year2 = new Date(dateDataDay2).getFullYear();
        let dateFormat2 = `${month2}/${day2}/${year2}`;

        // Display day 2 weather data in weather card 2
        dateDay2.innerHTML = dateFormat2;
        iconDay2.innerHTML = "<img src ='"+map.get(response.list[12].weather[0].icon)+"'/>";
        descDay2.innerHTML = response.list[12].weather[0].description;
        tempDay2.innerHTML= displayFahrenheit(response.list[12].main.temp); 
        
        // Variables for weather card 3
        let dateDay3 = document.getElementById("date-day3");
        let iconDay3 = document.getElementById("icon-day3");
        let descDay3 = document.getElementById("desc-day3");
        let tempDay3 = document.getElementById("temp-day3");

        // Format day 3 date
        dateDataDay3 = response.list[20].dt_txt;
        let day3 = new Date(dateDataDay3).getDate();
        let month3 = new Date(dateDataDay3).getMonth() + 1;
        let year3 = new Date(dateDataDay3).getFullYear();
        let dateFormat3 = `${month3}/${day3}/${year3}`;

        // Display day 3 weather data in weather card 3
        dateDay3.innerHTML = dateFormat3;
        iconDay3.innerHTML = "<img src ='"+map.get(response.list[20].weather[0].icon)+"'/>";
        descDay3.innerHTML = response.list[20].weather[0].description;
        tempDay3.innerHTML= displayFahrenheit(response.list[20].main.temp);
        
        // Variables for weather card 4
        let dateDay4 = document.getElementById("date-day4");
        let iconDay4 = document.getElementById("icon-day4");
        let descDay4 = document.getElementById("desc-day4");
        let tempDay4 = document.getElementById("temp-day4");

        // Format day 4 date
        dateDataDay4 = response.list[28].dt_txt;
        let day4 = new Date(dateDataDay4).getDate();
        let month4 = new Date(dateDataDay4).getMonth() + 1;
        let year4 = new Date(dateDataDay4).getFullYear();
        let dateFormat4 = `${month4}/${day4}/${year4}`;

        // Display day 4 weather data in weather card 4
        dateDay4.innerHTML = dateFormat4;
        iconDay4.innerHTML = "<img src ='"+map.get(response.list[28].weather[0].icon)+"'/>";
        descDay4.innerHTML = response.list[28].weather[0].description;
        tempDay4.innerHTML= displayFahrenheit(response.list[28].main.temp);   
        
        // Variables for weather card 5
        let dateDay5 = document.getElementById("date-day5");
        let iconDay5 = document.getElementById("icon-day5");
        let descDay5 = document.getElementById("desc-day5");
        let tempDay5 = document.getElementById("temp-day5");

        // Format day 5 date
        dateDataDay5 = response.list[36].dt_txt;
        let day5 = new Date(dateDataDay5).getDate();
        let month5 = new Date(dateDataDay5).getMonth() + 1;
        let year5 = new Date(dateDataDay5).getFullYear();
        let dateFormat5 = `${month5}/${day5}/${year5}`;

        // Display day 5 weather data in weather card 5
        dateDay5.innerHTML = dateFormat5;
        iconDay5.innerHTML = "<img src ='"+map.get(response.list[36].weather[0].icon)+"'/>";
        descDay5.innerHTML = response.list[36].weather[0].description;
        tempDay5.innerHTML= displayFahrenheit(response.list[36].main.temp); 
        
        // Add classes to style html elements
        // Current weather container
        let currentContainer = document.getElementById("current-weather");
        currentContainer.className = "hero has-text-left m-5 p-2";
        currentCity.className = "has-text-info-light has-text-weight-bold is-size-3";
        currentIcon.className = "image is-96x96";
        currentDesc.className = "has-text-info-light is-size-4";
        currentTemp.className = "has-text-info-light is-size-4";
        currentHumid.className = "has-text-info-light is-size-4";
        currentSpeed.className = "has-text-info-light is-size-4";
        currentContainer.style.backgroundColor = "rgb(0,0,0)"

        // Cards container
        let cardContainer = document.getElementById("cards");
        cardContainer.className = "columns is-one-fifth  m-5 p-2";

        // Card 1
        let card1 = document.getElementById("update-1");
        card1.className = "column card m-3";        
        dateDay1.className = "is-size-4";
        iconDay1.className = "image is-64x64";
        descDay1.className = "is-size-4";
        tempDay1.className = "is-size-4"; 
        card1.style.backgroundImage = "linear-grandient(#185EE6, #29BFF0)"     

        // Card 2
        let card2 = document.getElementById("update-2");
        card2.className = "column card m-3";
        dateDay2.className = "is-size-4";
        iconDay2.className = "image is-64x64";
        descDay2.className = "is-size-4";
        tempDay2.className = "is-size-4";

        // Card 3
        let card3 = document.getElementById("update-3");
        card3.className = "column card m-3";
        dateDay3.className = "is-size-4";
        iconDay3.className = "image is-64x64";
        descDay3.className = "is-size-4";
        tempDay3.className = "is-size-4";
        
        // Card 4
        let card4 = document.getElementById("update-4");
        card4.className = "column card m-3";
        dateDay4.className = "is-size-4";
        iconDay4.className = "image is-64x64";
        descDay4.className = "is-size-4";
        tempDay4.className = "is-size-4";
        
        // Card 5
        let card5 = document.getElementById("update-5");
        card5.className = "column card m-3"; 
        dateDay5.className = "is-size-4";
        iconDay5.className = "image is-64x64";
        descDay5.className = "is-size-4";
        tempDay5.className = "is-size-4";
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
        
        // Format first date
        dateDataHoli1 = data[0].date;
        let holiDay1 = new Date(dateDataHoli1).getDate() + 1;
        let holiMonth1 = new Date(dateDataHoli1).getMonth() + 1;
        let holiYear1 = new Date(dateDataHoli1).getFullYear();
        let holiDateFormat1 = `${holiMonth1}/${holiDay1}/${holiYear1}`;

        // Display this data in card 1
        dateHoli1.innerHTML = holiDateFormat1;
        localHoli1.innerHTML = data[0].localName;
        commonHoli1.innerHTML = data[0].name;
        dateHoli1.className = "is-size-6";
        localHoli1.className = "is-size-6";
        commonHoli1.className = "is-size-6";        

        // Format second date
        dateDataHoli2 = data[1].date;
        let holiDay2 = new Date(dateDataHoli2).getDate() + 1;
        let holiMonth2 = new Date(dateDataHoli2).getMonth() + 1;
        let holiYear2 = new Date(dateDataHoli2).getFullYear();
        let holiDateFormat2 = `${holiMonth2}/${holiDay2}/${holiYear2}`;

        // Display this data in card 2
        dateHoli2.innerHTML = holiDateFormat2;
        localHoli2.innerHTML = data[1].localName;
        commonHoli2.innerHTML = data[1].name;
        dateHoli2.className = "is-size-6";
        localHoli2.className = "is-size-6";
        commonHoli2.className = "is-size-6"; 

        // Format third date
        dateDataHoli3 = data[2].date;
        let holiDay3 = new Date(dateDataHoli3).getDate() + 1;
        let holiMonth3 = new Date(dateDataHoli3).getMonth() + 1;
        let holiYear3 = new Date(dateDataHoli3).getFullYear();
        let holiDateFormat3 = `${holiMonth3}/${holiDay3}/${holiYear3}`;

        // Display this data in card 3
        dateHoli3.innerHTML = holiDateFormat3;
        localHoli3.innerHTML = data[2].localName;
        commonHoli3.innerHTML = data[2].name;
        dateHoli3.className = "is-size-6";
        localHoli3.className = "is-size-6";
        commonHoli3.className = "is-size-6"; 

        // Format fourth date
        dateDataHoli4 = data[3].date;
        let holiDay4 = new Date(dateDataHoli4).getDate() + 1;
        let holiMonth4 = new Date(dateDataHoli4).getMonth() + 1;
        let holiYear4 = new Date(dateDataHoli4).getFullYear();
        let holiDateFormat4 = `${holiMonth4}/${holiDay4}/${holiYear4}`;

        // Display this data in card 4
        dateHoli4.innerHTML = holiDateFormat4;
        localHoli4.innerHTML = data[3].localName;
        commonHoli4.innerHTML = data[3].name;
        dateHoli4.className = "is-size-6";
        localHoli4.className = "is-size-6";
        commonHoli4.className = "is-size-6"; 

        // Format fifth date
        dateDataHoli5 = data[4].date;
        let holiDay5 = new Date(dateDataHoli5).getDate() + 1;
        let holiMonth5 = new Date(dateDataHoli5).getMonth() + 1;
        let holiYear5 = new Date(dateDataHoli5).getFullYear();
        let holiDateFormat5 = `${holiMonth5}/${holiDay5}/${holiYear5}`;

        // Display this data in card 1
        dateHoli5.innerHTML = holiDateFormat5;
        localHoli5.innerHTML = data[4].localName;
        commonHoli5.innerHTML = data[4].name;
        dateHoli5.className = "is-size-6";
        localHoli5.className = "is-size-6";
        commonHoli5.className = "is-size-6";      

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
            countryHoli1.className = "is-size-6";
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
            countryHoli2.className = "is-size-6";
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
            countryHoli3.className = "is-size-6";
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
            countryHoli4.className = "is-size-6";
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
            countryHoli5.className = "is-size-6";
        })         
    })
    .catch((err) => {
        console.log(err);
    });

app.init();  
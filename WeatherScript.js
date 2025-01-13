// Open Weather Map API Key
const myKey = "d6ba5f951aad1233103595391c73212b"


/**
 * Function storePosition
 *  Takes care of storing the result of calling getCurrentPosition and transforming it into the city name
 * @param {*} position The longitude and latitude of the current user position
 */
function storePosition(position){
    // Take longitude and latitude from position
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Use OpenWeatherMap's reverse geocoding API to convert latitude and longitude into city name
    const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${myKey}`;

    // Get the location element from index.html
    const locationElement = document.getElementById('location')
    
    // This portion of code fetches the data from apiURL and extracts the city name
    fetch(apiUrl) 
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const city = data[0].name;
                locationElement.innerHTML = city;
                return city;
            } else {
                console.log("City not found");
            }
        })
        .catch(error => {
            console.error("Error fetching city data:", error);
        });
    
}

// Check if geolocation is supported
if ("geolocation" in navigator) {
    // If yes get the current position of the user and invoke the storePosition() function
    navigator.geolocation.getCurrentPosition(
        (position) => {
        storePosition(position);
        }
)}   else {
    // If the geolocation is not supported throw in an alert
    alert("If you want to see the weather information pleas turn on your location ")
}

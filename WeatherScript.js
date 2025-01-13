const myKey = "d6ba5f951aad1233103595391c73212b"

function storePosition(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${myKey}`;

    fetch(apiUrl) 
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const city = data[0].name;
                console.log(`City: ${city}`);
            } else {
                console.log("City not found");
            }
        })
        .catch(error => {
            console.error("Error fetching city data:", error);
        });
}


if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
        storePosition(position);
        }
)}   else {

}

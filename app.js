window.addEventListener('load', () => {
    let long;
    let lat;
    const tempDescription = document.querySelector('.temp-description');
    const tempDegree = document.querySelector('.temp-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const tempSection = document.querySelector(".temp");
    const tempSpan = document.querySelector(".temp span");
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/f87c0bae45087c25d09d20b585b1f092/${lat},${long}`

            fetch(api)
                .then(response => {
                 return response.json();
                })
                .then(data => {
                    const { temperature, summary, icon } = data.currently;
                    // Set dom elements from the api
                    tempDegree.textContent = temperature;
                    tempDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    // Set Icon
                    setIcons(icon, document.querySelector(".icon"));

                    // Change temp degree
                    tempSection.addEventListener('click', () => {
                        if (tempSpan.textContent === "°F") {
                            tempSpan.textContent = "°C";
                            tempDegree.textContent = convertToCelsius(temperature);
                        } else {
                            tempSpan.textContent = "°F";
                            tempDegree.textContent = temperature;
                        }
                    })
                });
        })
    } 

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    function convertToCelsius(temp) {
        const celsius = (temp - 32) * 5/9;
        return Math.floor(celsius);
    }
});


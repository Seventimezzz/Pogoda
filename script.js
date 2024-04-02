const APIKey = "4034e91d266b79661e349e9c380f4375"

const apiUrl =`http://api.openweathermap.org/data/2.5/weather?units=metric&q=`

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");

async function checkWeather(description) {
    const response = await fetch(apiUrl + description + `&appid=${APIKey}`) ;
    const data = await response.json();
    const image = document.querySelector('.weather-img')
    console.log(image, 'image')

    document.querySelector('.description').innerHTML = data.name;
    document.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + "°C" ;
    document.querySelector('.info-humidity').innerHTML = (data.main.humidity) + "%";
    document.querySelector('.info-wind').innerHTML = (data.wind.speed) + "Км/ч";

    if (data.weather[0].main == 'Clear'){
        image.src = './photo/clear.png'
    } else if (data.weather[0].main == 'Rain'){
        image.src = './photo/rain.png'
    }else if (data.weather[0].main == 'Mist'){
        image.src = './photo/mist.png'
    }else if (data.weather[0].main == 'Snow'){
        image.src = './photo/snow.png'
    }else if (data.weather[0].main == 'Clouds'){
        image.src = './photo/cloud.png'
    }
}

searchButton.addEventListener('click', () => {
    checkWeather(searchInput.value);
    searchInput.value = "";
})







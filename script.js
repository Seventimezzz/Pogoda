const APIKey = "4034e91d266b79661e349e9c380f4375"

const apiUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=`

const container = document.querySelector('.container')

const searchInput = container.querySelector(".search-input");
const searchButton = container.querySelector(".search-btn");

const getWeather = async (description) => {
    return new Promise((resolve, reject) => {
        fetch(apiUrl + description + `&appid=${APIKey}`)
            .then(response => {
                if (response.cod === '404') {
                    throw new Error('ОшибкаЖ: ' + response.status);
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject('Не получилось получить погоду в текущем регионе'));
    });
}

async function checkWeather(description) {
    const data = await getWeather(description)

    const image = container.querySelector('.weather-img')

    container.querySelector('.description').innerHTML = data.name;
    container.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + "°C";
    container.querySelector('.info-humidity').innerHTML = (data.main.humidity) + "%";
    container.querySelector('.info-wind').innerHTML = (data.wind.speed) + "Км/ч";

    switch (data.weather[0].main) {
        case 'Clear':
            image.src = './image/clear.png'
            break;
        case 'Rain':
            image.src = './image/rain.png'
            break;
        case 'Mist':
            image.src = './image/mist.png'
            break;
        case 'Snow':
            image.src = './image/snow.png'
            break;
        case 'Clouds':
            image.src = './image/cloud.png'
            break;
        default:
            image.src = './image/clear.png'
            break
    }
}

searchButton.addEventListener('click', () => {
    checkWeather(searchInput.value);
    searchInput.value = "";
})







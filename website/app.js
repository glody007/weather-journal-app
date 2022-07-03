/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const KEY = '7f7da594e7943a81894f9523ee0c8411'

/* Function called by event listener */
const onGenerateClicked = () => {
    const zip = document.getElementById('zip').value
    getLocationData(zip)
    .then((locationData) => {
        const weatherData = getWeatherData(locationData.lat, locationData.lon)
        return weatherData
    })
    .then((weatherData) => {
        const feelings = document.getElementById('feelings').value
        postData('/add', {
            temperature: weatherData.main.temp,
            date: newDate,
            userResponse: feelings
        })
    })
    .then(() => {
        return getData()
    })
    .then((userData) => {
        const dateElement = document.getElementById('date')
        const tempElement = document.getElementById('temp')
        const content = document.getElementById('content')
        dateElement.innerHTML = 'Date: ' + userData.date
        tempElement.innerHTML = 'Temperature: ' + userData.temperature + ' Degrees'
        content.innerHTML = 'Content: ' + userData.userResponse
    })
}

/* Function to GET Location Data*/
const getLocationData = async (zip) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${KEY}`)
    try {
        const locationData = await response.json()
        return locationData
    } catch (error) {
        console.log(error)
    }
}

/* Function to GET Weather Data*/
const getWeatherData = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${KEY}`)
    try {
        const weatherData = await response.json()
        return weatherData
    } catch (error) {
        console.log(error)
    }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        return response.json()
    } catch (error) {
        console.log('error')
    }
}

/* Function to GET Project Data */
const getData = async () => {
    const response = await fetch('/all', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    try {
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error.data)
    }
}

// Add Event listener for generate button
document.getElementById('generate').addEventListener('click', onGenerateClicked)
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const KEY = '7f7da594e7943a81894f9523ee0c8411'

/* Function called by event listener */
const onGenerateClicked = () => {
    getLocationData()
    .then((locationData) => {
        const weatherData = getWeatherData(locationData.lat, locationData.lon)
        return weatherData
    })
    .then((weatherData) => {
        postData('/add', {
            temperature: weatherData.main.temp,
            date: newDate,
            userResponse: ''
        })
    })
    .then(() => {
        return getData()
    })
    .then((userData) => {
        // TO DO: Display data
        console.log(userData)
    })
}

/* Function to GET Location Data*/
const getLocationData = async () => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=E14,GB&appid=${KEY}`)
    try {
        const locationData = await response.json()
        return locationData
    } catch (error) {
        console.log(error)
    }
}

/* Function to GET Weather Data*/
const getWeatherData = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`)
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
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API


/* Function called by event listener */
const onGenerateClicked = () => {
    postData('/add', {
        temperature: 28,
        date: newDate,
        userResponse: ''
    })
    .then(() => {
        getData()
    })
}

/* Function to GET Web API Data*/

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
        // TO DO: display data 
    } catch (error) {
        console.log(error.data)
    }
}

// Add Event listener for generate button
document.getElementById('generate').addEventListener('click', onGenerateClicked)
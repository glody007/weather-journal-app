// Personal API Key for OpenWeatherMap API

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', onGenerateClicked)

/* Function called by event listener */
const onGenerateClicked = () => {
    const data =  postData('add')
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
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error.data)
    }
}

/* Function to GET Project Data */
const getData = async (url = '') => {
    const response = await fetch(url, {
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
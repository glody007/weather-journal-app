// Setup empty JS object to act as endpoint for all routes
const data = {}

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app  = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

// Here we are configuring express to use body-parser as middle-ware.
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
// Callback to debug
const port = 3000;
app.listen(port, () => {
    console.log(`Server run on port ${port}`)
})


// Initialize all route with a callback function
app.get('/all', (req, res) => {
    res.send(data)
    console.log('Get data')
})

// Post Route
app.post('/add', (req, res) => {
    data['temperature'] = req.body.temperature
    data['date'] = req.body.date
    data['userResponse'] = req.body.userResponse
    res.send(data)
    console.log('Post data')
})
  
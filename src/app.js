const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');

// Set up express app
const app = express();
const port = process.env.PORT || 3000;

// Static path setting
const dirPath = path.join(__dirname, '../public'); 
app.use(express.static(dirPath));

// Views path setting
app.set('views', path.join(__dirname, '../templates/views'));

// Partials path setting
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// Set up template engine
app.set('view engine', 'hbs');

app.get('', (req, res) => {
    res.render('index', {
        name: 'Farhan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Farhan',
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Farhan'
    })
})

app.get('/weather', (req, res) => {
    const location = req.query.address;
    const jsonData = {
        name: 'Farhan',
        location
    };

    // res.send(jsonData)

    if(!location) {
        jsonData.location = 'No address is entered.'
        // res.render('weather', jsonData);
        res.send(jsonData)
    }
    else {
        geocode(location, (error, { latitude, longitude, location } = {}) => {
            jsonData.location = location;
            if (error) {
                jsonData.forecast = error;
                res.send(jsonData)
                // res.render('weather', jsonData);
            }
            else {
                console.log(latitude, longitude, location)
                const respData = {
                    latitude,
                    longitude,
                    location
                }
                res.send(respData)
            }
        })
    }
    
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Something went wrong with the page you are looking for',
        title: '404',
        name: 'Farhan'
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', { message: 'Help articles not found' });
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
})
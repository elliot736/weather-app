const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()
const port = process.env.PORT || 3000

// Paths setup

const publichDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// HBS Setup

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publichDir))
hbs.registerPartials(partialsPath)

// dirs
 

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Elliot'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Elliot'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Elliot'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        }) 
    } 
    geocode(req.query.address, (error, { lat, lon, loc }= {} )=> {
        if (error) {
            return res.send({ error }) 
        }
        forecast(lat, lon,(error, fData) => {
            if (error) {
                return res.send({ error }) 
            }
            res.send({
                forecast: fData,
                loc,
                address: req.query.address
                
            })
    })

    })

    
        
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Elliot',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Elliot',
        errorMessage: 'Page not found.'
    })
})



app.get('*',(req,res) => {
    res.render('404')
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
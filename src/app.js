const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000


//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//Various Gets:
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jonas Vandebroek'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        msg: 'This is helpful text',
        name: 'Jonas Vandebroek'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Jonas Vandebroek'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        res.send({
            error: 'you must provide a search term'
        })
    }else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
            if(error){
                return res.send({
                    error: error
                })
            }
            forecast(latitude, longitude, (error, forecastdata, tempInfo, icon, alertT, alertD) => {
                if(error){
                    return res.send({
                        error: error
                    })
                }
                res.send({ 
                    location: location,
                    forecast: forecastdata,
                    address: req.query.address,
                    tempInfo: tempInfo,
                    icon: icon,
                    alertT: alertT,
                    alertD: alertD
                })
            })
         })
    }
})


app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        msg: 'Help page not found',
        name: 'Jonas Vandebroek'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        msg: 'URL not valid',
        name: 'Jonas Vandebroek'
    })
})

//localhost:port/xxx
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})


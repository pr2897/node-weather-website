const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setting various routes

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Piyush raj'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name: 'Piyush Raj',
        title: 'Software Developer'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        help: 'Helping here',
        name: 'Piyush Raj',
        title: 'Help page'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide a search address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location } = {})=>{
        if(error)
            return res.send({
                error: 'Could not connect to the Geocode server!'
            })
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
                return res.send({
                    error: 'could not connect to the forecast server!'
                })
            res.send({
                location,
                address: req.query.address,
                latitude,
                longitude,
                forecastData
            })
        })

    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Piyush Raj',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Piyush Raj',
        errorMessage: 'Page not found'
    })
})

app.listen(PORT, ()=>{
    console.log('Server is up on port '+ PORT +'. !')
})

const path =require('path')
const express = require('express')
const request = require('request')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

//Give express the address of partials directory
hbs.registerPartials(partialsPath)

//Seup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Baseerat'
    });
});

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Baseerat'
    });
});

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'Baseerat'
    });
});

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }
    forecast(req.query.address, (error, forecastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast: forecastData.Temperature,
            weather: forecastData.Weather,
            location: forecastData.Location
        })
        //console.log({forecastData})
    })
})

app.get('/help/*',(res,req)=>{
    res.render('404',{
        title: '404',
        name: 'Baseerat',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Baseerat',
        errorMessage: 'Page not found'
    })
})







app.listen(3000, ()=>{
    console.log('Server up on port 3000')
})
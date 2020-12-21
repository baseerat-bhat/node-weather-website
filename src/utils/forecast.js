const request = require('request')

const forecast = (address, callback)=>{
    const url = "https://api.weatherbit.io/v2.0/current?city=" + address + "&key=189a770b49124ddcbeacaf95c601dc54"

request({url, json: true}, (error, { body })=>{
    if(error){
        callback('Unable to connect to weather service!', undefined)
    }else if(body.message){
        callback('Unable to find the location', undefined)
    }else{
        callback(undefined, {
            Temperature: 'It is currently ' + body.data[0].temp + ' degress Celsius',
            Weather: body.data[0].weather.description,
            Location: body.data[0].city_name + ', ' + body.data[0].timezone
        })
        // console.log('It is currently ' + response.body.data[0].temp + ' degress Celsius')
        // console.log('Weather: ' + response.body.data[0].weather.description)
        // console.log('Location: ' + response.body.data[0].city_name + ', ' + response.body.data[0].timezone)
    }
})
}

module.exports = forecast;
const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/1d1249a5dea0dc9cc0f9cdb236001ec9/' + latitude + ','+ longitude
    
    request({url:url,json:true},(error,response)=>{
        if(error)
            callback('Unable to connect to weather service!',undefined)
        else if(response.error){
            callback('Unable to find location.',undefined)
        }
        else{
            callback(undefined,{
                 temperature: response.body.currently.temperature,
                precProbability: response.body.currently.precipProbability,
                forecast: response.body.currently.summary
            })
        }
    })
}

module.exports = forecast


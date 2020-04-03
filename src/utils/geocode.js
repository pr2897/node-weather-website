const request = require('request')

const geocode = (address,callback) => {
    const url   = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoicGl5dXNocmFqa2hnIiwiYSI6ImNrODVnZmZzZjA2OWczbHBldGJ3N2Y4dDAifQ.IpQKRa-Dr1-6TG5HmpUbWw&limit=1"
    request({url: url, json: true}, (error,response) => {
        //console.log(response)
        if(error){
            callback('Unable to connect to location services!',undefined)
        }
        else if(response.body.features.length === 0 ){
            callback('Unable to retreive data from the location server',undefined)
        }
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
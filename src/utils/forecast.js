const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/6f4bc4edf5f1c5af32677ec53edf9bdf/${lat},${long}`
    request({url: url, json:true}, (error, {body}) =>{
        if (!error){
            if(body.error){
                callback(body.error, undefined, undefined, undefined)
            }else{
                callback(undefined, body.daily.data[0].summary + ` It is currently ${body.currently.temperature} degrees out. There is a ${body.daily.data[0].precipProbability * 100} % chance of ${body.daily.data[0].precipType}.`, `The high temp for the day will be ${body.daily.data[0].temperatureHigh} degrees and the low will be ${body.daily.data[0].temperatureLow} degrees`, body.daily.data[0].icon, body.alerts[0].title, body.alerts[0].description)
            }
        }else{
            callback(error, undefined, undefined, undefined)
        }
    })
}

module.exports = forecast
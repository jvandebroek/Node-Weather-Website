const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/6f4bc4edf5f1c5af32677ec53edf9bdf/${lat},${long}`
    request({url: url, json:true}, (error, {body}) =>{
        if (!error){
            if(body.error){
                callback(body.error, undefined)
            }else{
                callback(undefined, body.daily.data[0].summary + ` It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} % chance of rain.`)
            }
        }else{
            callback(error, undefined)
        }
    })
}

module.exports = forecast
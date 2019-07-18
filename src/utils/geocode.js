const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianZhbmRlYnJvZWsiLCJhIjoiY2p5NHRpODZ4MDBnYTNtc3kxaHFlemgyZSJ9.gM1Q57XyUSRyuxrJH1YxoA&limit=1'
    request({url: url, json:true}, (error, {body}) =>{
        if (!error){
            if(body.features[0]){
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }else{
                callback('Location Not Found', undefined)
            }
        }else{
            callback('Network Error', undefined)
        }
    })
}
///geocoding/v5/{endpoint}/{longitude},{latitude}.json
const geocodecoord = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianZhbmRlYnJvZWsiLCJhIjoiY2p5NHRpODZ4MDBnYTNtc3kxaHFlemgyZSJ9.gM1Q57XyUSRyuxrJH1YxoA&limit=1'
    request({url: url, json:true}, (error, {body}) =>{
        if (!error){
            if(body.features[0]){
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }else{
                callback('Location Not Found', undefined)
            }
        }else{
            callback('Network Error', undefined)
        }
    })
}


module.exports = geocode
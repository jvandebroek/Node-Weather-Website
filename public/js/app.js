const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const locHTML = document.querySelector('#locid')
const forHTML = document.querySelector('#forid')
const tempHTML = document.querySelector('#forTemps')
const iconHTML = document.querySelector('.icon')
const alertHTML = document.querySelector('.alert')
const useLocation = document.querySelector('#useLocation')
const checkWeatherButton = document.querySelector('#checkWeather')

useLocation.addEventListener('click', (e)=>{
    e.preventDefault()

    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.')
    }
//{lat: position.coords.latitude, long: position.coords.longitude}
    navigator.geolocation.getCurrentPosition((position)=>{
        const location = {lat: position.coords.latitude, long: position.coords.longitude}
        console.log(1)
        locHTML.textContent = 'Loading'
        forHTML.textContent = '..........................................................'
        fetch(`/coordweather?address=${location.long},${location.lat}`).then((response) =>{
        response.json().then((data) => {
            if(!data.error){
                locHTML.textContent = data.location
                forHTML.textContent = data.forecast
                tempHTML.textContent = data.tempInfo
                iconHTML.src = `/img/${data.icon}.png`
                if(data.alertT){
                    alertHTML.textContent = `${data.alertT}: ${data.alertD}`
                }else{
                    alertHTML.textContent = ''
                }
            }else{
                locHTML.textContent = 'Error'
                forHTML.textContent = data.error
            }
        })
    })
        
    })
})

checkWeatherButton.addEventListener('click', (e) => {

    e.preventDefault()

    const location = search.value
    locHTML.textContent = 'Loading'
    forHTML.textContent = '..........................................................'
    fetch(`/weather?address=${location}`).then((response) =>{
    response.json().then((data) => {
        if(!data.error){
            locHTML.textContent = data.location
            forHTML.textContent = data.forecast
            tempHTML.textContent = data.tempInfo
            iconHTML.src = `/img/${data.icon}.png`
            if(data.alertT){
                alertHTML.textContent = `${data.alertT}: ${data.alertD}`
            }else{
                alertHTML.textContent = ''
            }
        }else{
            locHTML.textContent = 'Error'
            forHTML.textContent = data.error
        }
    })
    })
})
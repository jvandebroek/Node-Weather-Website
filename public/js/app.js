const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const locHTML = document.querySelector('#locid')
const forHTML = document.querySelector('#forid')
const tempHTML = document.querySelector('#forTemps')
const iconHTML = document.querySelector('.icon')



weatherform.addEventListener('submit', (e) => {
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
            console.log(data.icon)
        }else{
            locHTML.textContent = 'Error'
            forHTML.textContent = data.error
        }
    })
    })
})
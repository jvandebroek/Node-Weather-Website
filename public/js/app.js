


const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const locHTML = document.querySelector('#locid')
const forHTML = document.querySelector('#forid')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    locHTML.textContent = 'Loading'
    forHTML.textContent = '..........................................................'
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) =>{
    response.json().then((data) => {
        if(!data.error){
            locHTML.textContent = data.location
            forHTML.textContent = data.forecast
        }else{
            locHTML.textContent = 'Error'
            forHTML.textContent = data.error
        }
    })
    })
})
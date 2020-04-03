// console.log('Client side file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '' 
    e.preventDefault()
    const location = search.value
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.location
                // console.log(data.location)
                // console.log(data.latitude)
                messageTwo.textContent = JSON.stringify(data.forecastData)
                //console.log(data.forecastData.forecast)
            }
        })
    })
    // console.log('testing')
})
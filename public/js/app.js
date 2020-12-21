const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#messageOne');
const msg2 = document.querySelector('#messageTwo');
const msg3 = document.querySelector('#messageThree')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    msg3.textContent = ''

    fetch('http://localhost:3000/weather?address='+ search.value).then((response) => {
        response.json().then((data)=>{
            if(data.error){
              msg1.textContent = data.error;
            }else{
                msg1.textContent = data.forecast;
                msg2.textContent = data.weather;
                msg3.textContent = data.location;
            }
        })
    })
})
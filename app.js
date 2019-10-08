// getting a reference to all the html elements i'll need
const form = document.querySelector('form');
const weather = document.querySelector('.weather-details');
const hide = document.querySelector('.hide');
const imgTime = document.querySelector('.time-img');
const icon = document.querySelector('.icon img');

// change the card UI for weather details. I take data as city from form.
const updateUI = (data) => {
    const {cityData, weatherData} = data; // i get returned an object with both my cityData & weatherData as sub objects. So i destructured them.
    // updating details in the card
    weather.innerHTML = `
    <h5 class="py-3">${cityData.EnglishName}</h5>
    <div class="weather-condition text-muted my-3">${weatherData.WeatherText}</div>
    <div class="temp py-3">
        <span>${weatherData.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `
    // updating image in the card
    let imgTimeSrc = null;
    if(weatherData.IsDayTime) {
        imgTimeSrc = 'img/day.svg';
    
    } else {
        imgTimeSrc = 'img/night.svg';
    }
    imgTime.setAttribute('src', imgTimeSrc); // set the src of image according to the if-else condition

    // getting icons (there are 44 different weather icons so got them off some site and changed name)
    const iconSrc = `img/icons/${weatherData.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc);

    // by default my card is hidden. This is to remove that hide class.
    if(hide.classList.contains('hide')) {
        hide.classList.remove('hide');
    }
};

// eventListener for submitting the form
form.addEventListener('submit', e => {
    e.preventDefault(); // prevent page from reloading
    const cityName = form.city.value.trim(); // get city user inputs
    form.reset(); // reset the form
    // resolve updateCity promise
    updateCity(cityName)
        .then(data => updateUI(data)) // take the data from updateCity and pass it to updateUI
        .catch(err => console.log(err)); // display error if any
    localStorage.setItem('city', cityName); // i use local storage to save the city name
});

// if there is a city name in my local storage it gives the details for that city by default
// in short just displays my last searched city even after a page reload
if(localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}


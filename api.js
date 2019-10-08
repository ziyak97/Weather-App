// take ApiKey from AccuWeather
const apiKey = 'PjBmDxn6STZnGRBlmeAsgRAVBhwKUKwy';

// get city name using AccuWeather reference. I get the city parameter from my form.
const getCity = async (city) => {
    const url = 'http://dataservice.accuweather.com/locations/v1/cities/search'; //url
    const query = `?apikey=${apiKey}&q=${city}`; // query
    const cityDetails = await fetch(url + query); //fetch combination of url and query
    const cityData = await cityDetails.json(); // convert to JSON
    return cityData[0]; // take only the first object (there were multiple city objects)
};

// get weather details using AccuWeather reference. I get the key parameter from cityData in getCity.
const getWeather = async (key) => {
    const url = 'http://dataservice.accuweather.com/currentconditions/v1/'; //base
    const base = `${key}?apikey=${apiKey}`; //query
    const weatherDetails = await fetch(url + base); //fetch combination of url and query
    const weatherData = await weatherDetails.json(); // convert to JSON
    return weatherData[0]; // take only the first object (there were multiple weatherData objects)
};

// this is to display city weather details. I get city name from the form.
const updateCity = async (cityName) => {
    const cityData = await getCity(cityName); // displays city object
    const weatherData = await getWeather(cityData.Key); // take key from city object to display weather object
    return {cityData, weatherData}; // i return both the objects
};
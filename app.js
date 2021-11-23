const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}

/**
 * Capitalizes first letter
 * @param {string} str 
 * @returns
 */
function capitalize(str){
    return str[0].toUpperCase() + str.slice(1);
}
// Async / Await => permet de rendre une promesse synchrone
async function main(){
    // 1. Choper l'adresse IP du PC qui ouvre la page : https://api.ipify.org?format=json
    const ip = await fetch('https://api.ipify.org?format=json')
        .then(resultat => resultat.json())
        .then(json => json.ip)
    // 2. Choper la ville grâce à l'adresse IP : http://ip-api.com/json/adresseDuMec
    const ville = await fetch('http://ip-api.com/json/' + ip)
        .then(resultat => resultat.json())
        .then(json => json.city)
    // 3. Choper les infos météo grâce à la ville : http://api.openweathermap.org/data/2.5/weather?q=VilleDuMec&appid=c0d4a23f973c3521df89aa75a2c37ac1&lang=fr&units=metric
    const meteo = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=c0d4a23f973c3521df89aa75a2c37ac1&lang=fr&units=metric')
        .then(resultat => resultat.json())
        .then(json => json)

    console.log(meteo);
    // 4. Afficher les informations sur la page
    displayWeatherInfos(meteo);
}

/**
 * Affichage des données météo sur le DOM à partir de l'objet météo passé en paramètre (data)
 * @param {object} data 
 */
function displayWeatherInfos(data){
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;

    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = capitalize(description);

    document.querySelector('i.wi').className = weatherIcons[conditions];

    document.body.className = conditions.toLowerCase();
}

main();


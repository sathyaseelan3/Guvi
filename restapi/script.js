document.addEventListener('DOMContentLoaded', function() {
    fetch('https://restcountries.com/v3.1/all')
        .then(function(response) {
            return response.json();
        })
        .then(function(countries) {
            var selectedCountries = countries.slice(0, 3);
            displayCountryCards(selectedCountries);
        })
        .catch(function(error) {
            console.log(error);
        });
});

function displayCountryCards(countries) {
    var cardsContainer = document.getElementById('cards-container');

    countries.forEach(function(country) {
        var cardColumn = document.createElement('div');
        cardColumn.className = 'col-sm-6 col-md-4 col-lg-4 col-xl-4';

        var card = document.createElement('div');
        card.className = 'card h-100 text-center'; 

        var cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        cardHeader.textContent = country.name.common;

        var cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        var flag = document.createElement('img');
        flag.src = country.flags.png;
        flag.className = 'card-img-top flag';
        flag.alt = 'Country Flag';

        var countryDetails = document.createElement('div');
        countryDetails.className = 'card-text';
        
        var capital = document.createElement('p');
        capital.textContent = 'Capital: ' + country.capital;

        var region = document.createElement('p');
        region.textContent = 'Region: ' + country.region;

        var nativeNames = document.createElement('p');
        nativeNames.textContent = 'Native Names: ' + getNativeNames(country.name.native);

        var population = document.createElement('p');
        population.textContent = 'Population: ' + country.population;

        var countryCodes = document.createElement('p');
        countryCodes.textContent = 'Country Codes: ' + JSON.stringify(country.cca2) + ', ' + JSON.stringify(country.cca3);

        var weatherButton = document.createElement('button');
        weatherButton.className = 'btn btn-primary';
        weatherButton.textContent = 'Click for Weather';
        weatherButton.style.backgroundColor = 'transparent'; // Set button color to transparent
        weatherButton.addEventListener('click', function() {
            fetchWeather(country.capital);
        });

        countryDetails.appendChild(capital);
        countryDetails.appendChild(region);
        countryDetails.appendChild(nativeNames);
        countryDetails.appendChild(population);
        countryDetails.appendChild(countryCodes);

        cardBody.appendChild(flag);
        cardBody.appendChild(countryDetails);
        cardBody.appendChild(weatherButton);

        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        cardColumn.appendChild(card);

        cardsContainer.appendChild(cardColumn);
    });
}

function getNativeNames(nativeNameObj) {
    var nativeNames = [];
    for (var lang in nativeNameObj) {
        if (nativeNameObj.hasOwnProperty(lang)) {
            nativeNames.push(lang + ': ' + nativeNameObj[lang].official);
        }
    }
    return nativeNames.join(', ');
}

function fetchWeather(city) {
    var apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(weatherData) {
            console.log(weatherData);
            
        })
        .catch(function(error) {
            console.log(error);
        });
}

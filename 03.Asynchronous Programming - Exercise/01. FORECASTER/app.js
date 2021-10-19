function attachEvents() {
    let weatherButton = document.getElementById('submit');
    let locationName = document.getElementById('location');
    let currentDiv = document.getElementById('current');
    let upcomingDiv = document.getElementById('upcoming');
    let forecastParentDiv = document.getElementById('forecast');

    const baseURL = `https://judgetests.firebaseio.com/forecast/`;
    const locationsURL = `https://judgetests.firebaseio.com/locations.json`;

    const symbols = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'Degrees': '&#176',
    };

    weatherButton.addEventListener('click', () => {
        fetch(locationsURL)
        .then(response => response.json())
        .then(data =>{
            let {code} = data.find (element => element.name === locationName.value);

            let current = fetch(baseURL+ `today/${code}.json`)
            .then(response=> response.json())
          
            let upcoming = fetch(baseURL + `upcoming/${code}.json`)
            .then(response => response.json())

            Promise.all([current, upcoming]) 
            .then(showForecast)
            .catch(err => {
                forecastParentDiv.textContent = 'Error';
            });
            
        });
    });
    function createElement(ele, classes, content) {
        let element = document.createElement(ele);
        element.className = classes;
        element.innerHTML = content;

        return element;
    };

    function showForecast([currentData, upcomingData]){
      
        forecastParentDiv.style.display = 'block';
         showCurrentForecast(currentData);
         showUpcomingForecast(upcomingData);      
    };

    function showCurrentForecast(currentData) {

        let forecastDiv = createElement('div', 'forecasts', '');  
        let currentSymbol = symbols[currentData.forecast.condition];
        let currentSpanForecastDataSecondContent = `${currentData.forecast.low}${symbols["Degrees"]}/${currentData.forecast.high}${symbols["Degrees"]}`;                
        let conditionSpan = createElement('span', 'condition symbol', currentSymbol);
        let conditionInfoSpan = createElement('span', 'condition', '');
        let spanForecastDataFirst = createElement('span', 'forecast-data', currentData.name);
        let spanForecastDataSecond = createElement('span', 'forecast-data', currentSpanForecastDataSecondContent);
        let spanForecastDataThird = createElement('span', 'forecast-data', currentData.forecast.condition );
        forecastDiv.appendChild(conditionSpan);
        currentDiv.appendChild(forecastDiv);
        forecastDiv.appendChild(conditionInfoSpan);
        conditionInfoSpan.appendChild(spanForecastDataFirst);
        conditionInfoSpan.appendChild(spanForecastDataSecond);
        conditionInfoSpan.appendChild(spanForecastDataThird);
    };

    function showUpcomingForecast(upcomingData) {

        let divForecastInfo = createElement('div', 'forecast-info', '');
        upcomingData.forecast.forEach(obj=> {
        let spanUpcoming = createElement('span', 'upcoming', '');
        let spanSymbol =  createElement('span', 'symbol', symbols[obj.condition] );
        let currentSpanForecastDataSecondContent = `${obj.low}${symbols["Degrees"]}/${obj.high}${symbols["Degrees"]}`;
        let spanForecastDataDegrees = createElement('span', 'forecast-data', currentSpanForecastDataSecondContent);
        let spanForecastDataCondition = createElement('span', 'forecast-data', obj.condition);
        spanUpcoming.appendChild(spanSymbol);
        spanUpcoming.appendChild(spanForecastDataDegrees);
        spanUpcoming.appendChild(spanForecastDataCondition);
        divForecastInfo.appendChild(spanUpcoming);
        });        
        upcomingDiv.appendChild(divForecastInfo);
    };
};

attachEvents();
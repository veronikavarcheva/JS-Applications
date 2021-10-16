function getInfo() {
    let busStopIdElement = document.getElementById('stopId');
    // let checkButton = document.getElementById('submit');
    let busStopIdElementValue = busStopIdElement.value;
    let divIdStopName  = document.getElementById('stopName');
    let ulIdBuses = document.getElementById('buses');
    let validBuses = ['1287', '1308', '1327', '2334'];
    if(!validBuses.includes(busStopIdElementValue)){
        ulIdBuses.textContent = '';
        divIdStopName.textContent = 'Error';       
       return;
    }

    const url = `https://judgetests.firebaseio.com/businfo/${busStopIdElementValue}.json`;
    fetch(url)
    .then((response) => response.json())
    .then((stopId) => {
        ulIdBuses.textContent = '';
        divIdStopName.textContent = stopId.name;        
        Object.entries(stopId.buses).forEach((x)=>{
            ulIdBuses.appendChild(document.createElement('li')).textContent = `Bus ${x[0]} arrives in ${x[1]} minutes`;
        });         
       
    });    
    
}
function solve() {
    let infoElement = document.querySelector('#info');
    let departElement = document.getElementById('depart');
    let arriveElement = document.getElementById('arrive');
    let stopId = 'depot';
    let stopName;
  
    function depart() {
       const url = `https://judgetests.firebaseio.com/schedule/${stopId}.json`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                infoElement.textContent = `Next stop ${data.name}`;
                stopId = data.next;
                stopName = data.name;
            })
            .catch(Error());

        departElement.disabled = true;
        arriveElement.disabled = false;
    }

    function arrive() {
        infoElement.textContent = `Arriving at ${stopName}`;
        arriveElement.disabled = true;
        departElement.disabled = false;
    }

    function Error() {
        return () => {
            info.textContent = "Error";
            departElement.disabled = true;
            arriveElement.disabled = true;
        };
    }

    return {
        depart,
        arrive
    };
}

let result = solve();

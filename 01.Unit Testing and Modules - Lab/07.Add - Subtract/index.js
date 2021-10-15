function createCalculator() {
    let value = 0;
    return {
        add: function(num) { value += Number(num); },
        subtract: function(num) { value -= Number(num); },
        get: function() { return value; }
    }
}
// console.log(createCalculator().get());
let result = createCalculator.add(5);
console.log(result.get());
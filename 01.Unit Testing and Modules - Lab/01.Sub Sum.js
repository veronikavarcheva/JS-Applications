function solve(arr, startIndex, endIndex) {
    let sum = 0;
    if (!Array.isArray(arr)) {
        return NaN;
    }

    if (startIndex < 0) {
        startIndex = 0;
    }

    if (endIndex > arr.length - 1) {
        endIndex = arr.length - 1;
    }

    // for(let i = startIndex; i <= endIndex; i++) {
    //     sum += Number(arr[i]);
    // }
    sum = arr
        .slice(startIndex, endIndex + 1)
        .reduce((acc, curr) => acc + Number(curr), 0)

    return sum;
}

let result = solve([10, 20, 30, 40, 50, 60], 3, 300);
let result1 = solve([1.1, 2.2, 3.3, 4.4, 5.5], -3, 1);
let result2 = solve([10, 'twenty', 30, 40], 0, 2);
let result3 = solve([], 1, 2);
let result4 = solve('text', 0, 2);
console.log(result);
console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);



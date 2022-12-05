module.exports = function(arr) {
    let index = randomInteger(0, arr.length - 1);

    return arr[index];
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
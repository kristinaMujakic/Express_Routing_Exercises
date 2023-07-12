function findMean(arr) {
    if (arr.length === 0) return 0;

    let sum = arr.reduce(function (acc, currentValue) { return acc + currentValue; }, 0);

    let mean = sum / arr.length;
    return mean;
}

function findMedian(arr) {
    arr.sort((a, b) => a - b);

    let midIdx = Math.floor(arr.length / 2);
    let midpoint;

    if (arr.length % 2 === 0) {
        midpoint = (arr[midIdx] + arr[midIdx - 1]) / 2;
    } else { midpoint = arr[midIdx]; }

    return midpoint;
}

function findMode(arr) {

    const countMap = {};

    arr.forEach((value) => {
        countMap[value] = (countMap[value] || 0) + 1;
    });


    let maxCount = 0;
    let modeValue;

    for (const key in countMap) {
        if (countMap[key] > maxCount) {
            maxCount = countMap[key];
            modeValue = parseFloat(key);
        }
    }

    return modeValue;
}

function convertAndValidateNumsArray(numsAsStrings) {
    let result = [];

    for (let i = 0; i < numsAsStrings.length; i++) {
        let valToNumber = Number(numsAsStrings[i]);

        if (Number.isNaN(valToNumber)) {
            return new Error(
                `The value '${numsAsStrings[i]}' at index ${i} is not a valid number.`
            );
        }

        result.push(valToNumber);
    }
    return result;
}

module.exports = {
    findMean,
    findMedian,
    findMode, convertAndValidateNumsArray
};
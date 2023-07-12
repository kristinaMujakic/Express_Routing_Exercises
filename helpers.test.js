const { findMean, findMedian, findMode } = require('./helpers');

describe('findMean', function () {
    test('Should find average number', function () {

        const array = [1, 3, 5, 7];
        const result = findMean(array);

        expect(result).toBe(4);
        expect(typeof result).toBe('number');

    });

});

describe('findMode', function () {
    test('Should find most frequent number', function () {

        const array = [1, 3, 5, 7];
        const result = findMode(array);

        expect(result).toBe(1);
        expect(typeof result).toBe('number');

    });

});

describe('findMedian', function () {
    test('Should find midpoint number', function () {

        const array = [1, 3, 5, 7];
        const result = findMedian(array);

        expect(result).toBe(4);
        expect(typeof result).toBe('number');

    });

});
const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');

const ExpressError = require("./expressError");
const { findMode, findMean, findMedian, convertAndValidateNumsArray } = require('./helpers');


app.get('/mean', function (req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }

    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let response = {
        operation: 'mean',
        value: findMean(nums),

    };

    return res.send(response);
});


app.get('/median', function (req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }

    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }


    let response = {
        operation: 'median',
        value: findMedian(nums),

    };

    return res.send(response);
});


app.get('/mode', function (req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }

    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }


    let response = {
        operation: 'mode',
        value: findMode(nums),

    };

    return res.send(response);

});

app.get('/all', function (req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }

    let numsAsStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numsAsStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let save = req.query.save;

    let response = {
        operation: 'mode',
        mean: findMean(nums),
        median: findMedian(nums),
        mode: findMode(nums),
    };

    const filePath = path.join(__dirname, 'results.json');

    if (save === 'true') {
        fs.writeFile(filePath, JSON.stringify(response), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                res.status(500).send('Error occurred while saving the result.');
            } else {
                console.log('Result saved to file:', filePath);
                res.json(response);
            }
        });
    } else {
        return res.send(response);
    }


});

app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError);
});

app.use(function (err, req, res, next) {

    let status = err.status || 400;
    let message = err.message;


    return res.status(status).json({
        error: { message, status }
    });
});


app.listen(3000, function () {
    console.log('App on port 3000');
}); 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobs = void 0;
/**
 * @desc Worker.
 * @param {Boolean} [errorOut=false] - Whether or not should reject promise.
 * @param {Number} [timeLimit=10] - Limit of time in miliseconds for each job to finish.
 * @returns {Promise<void>}
 */
var Worker = (function (errorOut, timeLimit) {
    if (errorOut === void 0) { errorOut = false; }
    if (timeLimit === void 0) { timeLimit = 10; }
    // simulate work
    return new Promise(function (resolve, reject) {
        var num = Math.floor(Math.random() * timeLimit);
        setTimeout(function () {
            if (errorOut) {
                reject();
            }
            else {
                resolve();
            }
        }, num * 1000);
    });
});
/**
 * @desc Creates jobs that take a random amount of time to complete.
 * @param {Number} [qty=1] - Quantity of Jobs to produce.
 * @param {Object} [options={}]
 * @param {Number} [options.errorRate=0] - Percentage rate in which jobs should error out (from 0 to 1).
 * @param {Number} [options.timeLimit] - Limit of time in seconds for each job to finish.
 * @param {Array<Function>}
 */
function createJobs(qty, options) {
    var _a;
    if (qty === void 0) { qty = 1; }
    if (options === void 0) { options = {}; }
    var _b = options.errorRate, errorRate = _b === void 0 ? 0 : _b, timeLimit = options.timeLimit;
    if (Number.isNaN(Number(errorRate))) {
        throw new Error('errorRate must be a number');
    }
    if (errorRate < 0 || errorRate > 1) {
        throw new Error('errorRate must be between 0 and 1');
    }
    if (timeLimit && Number.isNaN(Number(timeLimit))) {
        throw new Error('timeLimit must be a number');
    }
    var jobs = new Array(qty);
    var errorMax = Math.floor(jobs.length * errorRate);
    // Create an array of indices representing the positions in the original array
    var indices = Array.from({ length: jobs.length }, function (_, index) { return index; });
    // Shuffle the indices randomly
    for (var i = indices.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [indices[j], indices[i]], indices[i] = _a[0], indices[j] = _a[1];
    }
    // Set the first errorMax indices in the original array
    for (var i = 0; i < indices.length; i++) {
        if (i < errorMax) {
            var worker = Worker.bind(null, true, timeLimit);
            worker.errorOut = true;
            jobs[indices[i]] = worker;
        }
        else {
            var worker = Worker.bind(null, false, timeLimit);
            worker.errorOut = false;
            jobs[indices[i]] = worker;
        }
    }
    return jobs;
}
exports.createJobs = createJobs;

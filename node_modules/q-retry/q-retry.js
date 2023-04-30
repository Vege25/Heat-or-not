/**
 * Q-retry plugin v0.1 for Q
 * https://github.com/vilic/q-retry
 * 
 * By VILIC VANE
 * https://github.com/vilic
 */

var Q = require('q');

Q().constructor.prototype.retry = function (process, onFail, options) {
    var limit = Infinity;
    var interval = 0;
    var maxInterval = Infinity;
    var intervalMultiplier = 1;

    if (typeof onFail != 'function') {
        options = onFail;
        onFail = null;
    }

    if (typeof options == 'number') {
        limit = options;
    }
    else if (options && typeof options == 'object') {
        limit = typeof options.limit == 'number' ? options.limit : limit;
        interval = typeof options.interval == 'number' ? options.interval : interval;
        maxInterval = typeof options.maxInterval == 'number' ? options.maxInterval : maxInterval;
        intervalMultiplier = typeof options.intervalMultiplier == 'number' ? options.intervalMultiplier : intervalMultiplier;
    }

    return this.then(function (value) {
        return Q.fcall(function () {
            return process(value);
        }).fail(function (reason) {
            return retry(value, reason, limit, interval);
        });
    });

    function retry(value, reason, limit, interval) {
        if (onFail) {
            onFail(reason, limit);
        }

        if (limit <= 0) {
            throw reason;
        }

        return Q.delay(Math.floor(interval)).then(function () {
            return process(value);
        }).fail(function (reason) {
            return retry(value, reason, limit - 1, Math.min(interval * intervalMultiplier));
        });
    }
};

Q.retry = function (process, onFail, options) {
    return Q().retry(process, onFail, options);
};

module.exports = Q;
'use strict';

module.exports.handler = (event, context, callback) => {
    console.log("Scheduler was triggered.");
    callback(null, "Scheduler was triggered.");
};
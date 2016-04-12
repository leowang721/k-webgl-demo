/**
 * @file a hello world
 * @author Leo Wang(wangkemiao@baidu.com)
 */

'use strict';

let Promise = require('promise');

/* global exports */
exports.process = function (request) {
    let query = request.query || {};

    return Promise.resolve({
        content: query
    });
};

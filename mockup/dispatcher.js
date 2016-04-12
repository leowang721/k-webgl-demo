/**
 * @file dispatcher
 * @author Leo Wang(wangkemiao@baidu.com)
 */

'use strict';
let Promise = require('promise');

/* global exports */
exports.process = function (request) {
    let pathname = request.pathname;

    // 映射到相应的处理器中去
    return new Promise((resolve, reject) => {
        let processor = require('.' + pathname);
        processor.process(request).then(resolve, reject);
    });
};

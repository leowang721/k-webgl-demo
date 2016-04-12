/**
 * @file server handler of api
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

'use strict';

let edp = require('edp-core');

/* globals home, redirect, content, empty, autocss, file, less, stylus, proxyNoneExists */

/**
 * handler method
 *
 * @return {Function} method
 */
module.exports = function () {
    return function (context) {
        edp.log.info(`API called in: [${context.request.path}]`);
        context.stop();
        // dispatch api
        let dispatcher = require('../../api/lib/dispatcher');

        let start = new Date();

        context.header['content-type'] = 'application/json;charset=utf-8';

        dispatcher.process(context.request).then(response => {
            response = response || {};

            if (response.header) {
                for (let k in response.header) {
                    if (response.header.hasOwnProperty(k)) {
                        context.header[k] = response.header[k];
                    }
                }
                // 设置了header 就不用默认的模式了
                context.content = response.content;
            }
            else {
                context.content = JSON.stringify({
                    status: 200,
                    data: response.content
                });
            }
        }).catch(e => {
            context.content = JSON.stringify({
                status: 500
            });
            edp.log.error(e);
        }).finally(() => {
            context.status = 200;
            context.start();
            let timespan = new Date() - start;
            edp.log.info(`API [${context.request.path}] (${timespan}ms)`);
        });
    };
};

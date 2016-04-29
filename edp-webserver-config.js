/**
 * @file config edp-webserver
 * @author EFE
 */

'use strict';

/* globals home, redirect, content, empty, autocss, file, less, stylus, proxyNoneExists */
let path = require('path');


let api = require('./tool/server/handler-api');

exports.port = 8888;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;
exports.getLocations = function () {
    let locations = [
        {
            location: /\/$/,
            handler: home('index.html')
        },
        {
            location: /^\/redirect-local/,
            handler: redirect('redirect-target', false)
        },
        {
            location: /^\/redirect-remote/,
            handler: redirect('http://www.baidu.com', false)
        },
        {
            location: /^\/redirect-target/,
            handler: content('redirectd!')
        },
        {
            location: '/empty',
            handler: empty()
        }
    ];

    let fileProcessors = [
        {
            location: /\.(html|tpl|png|jpg|gif|bmp)($|\?)/,
            handler: [
                file()
            ]
        },
        {
            location: /\.css($|\?)/,
            handler: [
                autocss()
            ]
        },
        {
            location: /\.less($|\?)/,
            handler: [
                file(),
                less()
            ]
        },
        {
            location: /\.js($|\?)/,
            handler: [processEs6]
        },
        {
            location: /\.styl($|\?)/,
            handler: [
                file(),
                stylus()
            ]
        },
        {
            path: /^\/api\//,
            handler: [
                api()
            ]
        },
        {
            path: /^.*$/g,
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];

    locations = locations.concat(...fileProcessors);

    return locations;
};

let babel = require('./tool/server/handler-babel');
function processEs6(context) {
    let pathname = context.request.pathname;
    let abs = path.join(__dirname, pathname);
    return babel(abs, context);
}

/* eslint-disable guard-for-in */
exports.injectResource = function (res) {
    for (var key in res) {
        global[key] = res[key];
    }
};

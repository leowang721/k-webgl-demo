/**
 * @file server file handler of babel
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

'use strict';

let fs = require('fs');
let babel = require('babel-core');
let minimatch = require('minimatch');

let extraPaths = [
    '/dep/k-core/**/*.js',
    '/dep/k-ajax/**/*.js',
    '/dep/k-webgl/**/*.js',
    '/dep/pmx/**/*.js'
];

/* globals home, redirect, content, empty, autocss, file, less, stylus, proxyNoneExists */

/**
 * handler method
 *
 * @param {string} abs JS文件的绝对路径.
 * @param {Object} context edp webserver context.
 */
module.exports = function (abs, context) {

    context.stop();

    let pathname = context.request.pathname;

    // 对于.es文件进行转换，js 直接返回
    let esPath = abs.replace(/\.js$/, '.es');
    if (fs.existsSync(esPath)) {
        let transform = babel.transformFileSync(esPath);
        context.content = transform.code;
        context.start();
    }
    else if (
        extraPaths.some(pattern => minimatch(pathname, pattern))
        && fs.existsSync(abs)
    ) {  // minimatch
        let transform = babel.transformFileSync(abs);
        context.content = transform.code;
        context.start();
    }
    else {
        file(abs)(context);
    }
};

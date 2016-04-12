/**
 * @file util
 * @author Leo Wang(wangkemiao@baidu.com)
 */
'use strict';
let querystring = require('querystring');
let childProcess = require('child_process');
let Promise = require('promise');
let edp = require('edp-core');

/* global exports */
exports.getPostData = function (request) {
    let contentType = request.headers['content-type'] || '';
    let postData = (request.bodyBuffer || '').toString();
    postData = contentType.indexOf('application/json') > -1
        ? JSON.parse(postData)
        : querystring.parse(postData);
    postData.params && (postData.params = JSON.parse(postData.params));
    return postData;
};

/**
 * 子进程调用，以Promise的形式返回
 *
 * @param {string} command 命令
 *
 * @return {Promise}
 */
exports.exec = function (command) {
    edp.log.warn('executing command: ' + command);
    return new Promise((resolve, reject) => {
        childProcess.exec(command, (error, stdout, stderr) => {
            if (error !== null) {
                reject(error);
            }
            console.log(stdout);
            resolve(stdout);
        });
    });
};

exports.execFile = function (filePath, args) {
    edp.log.warn('executing file: ' + filePath);
    return new Promise((resolve, reject) => {
        childProcess.execFile(filePath, args, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            console.log(stdout);
            resolve(stdout);
        });
    });
};

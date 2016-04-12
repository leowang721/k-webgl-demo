/**
 * @file ajax请求的真正实现
 * 鉴于原依赖的er/ajax有一点性能调度问题，因此在此重写
 * 依然基于er/ajax的实现方案
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import _ from 'lodash';
import {EventTarget, Promise, util} from 'k-core';

import hooks from './hooks';
import config from './config';

const REQID_PARAM_KEY = '_';

export class Ajax extends EventTarget {
    request(options) {
        if (typeof hooks.beforeExecute === 'function') {
            hooks.beforeExecute(options);
        }
        options = _.assign({}, config, options);

        // 创建xhr实例
        let xhr = window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new window.ActiveXObject('Microsoft.XMLHTTP');
        let fakeXHR;

        // 扩展fakeXHR，让它更像xhr对象
        let xhrWrapper = {
            // abort 在 racingPromise中处理
            setRequestHeader(name, value) {
                xhr.setRequestHeader(name, value);
            },
            getAllResponseHeaders() {
                return xhr.getAllResponseHeaders();
            },
            getResponseHeader(name) {
                return xhr.getResponseHeader(name);
            },
            getRequestOption(name) {
                return options[name];
            }
        };

        // 声明一个用于打断的Promise, for timeout or abort
        let timeoutTic = null;
        let racingPromise = new Promise((resolve, reject) => {
            // 处理abort
            xhrWrapper.abort = () => {
                // 有些浏览器`abort()`就会把`readyState`变成4，
                // 这就会导致进入处理函数变成**resolved**状态，
                // 因此事先去掉处理函数，然后直接进入**rejected**状态
                xhr.onreadystatechange = null;
                try {
                    xhr.abort();
                }
                catch (ex) {}

                if (!fakeXHR.status) {
                    fakeXHR.status = 0;
                }

                fakeXHR.readyState = xhr.readyState;
                fakeXHR.responseText = '';
                fakeXHR.responseXML = '';
                reject(fakeXHR);
            };

            // 如果超时了，直接处理自己的状态，进而打断整个状态
            if (options.timeout > 0) {
                timeoutTic = setTimeout(() => {
                    fakeXHR.status = 408; // HTTP 408: Request Timeout
                    fakeXHR.abort();
                }, options.timeout);
            }
        });

        // 声明xhrPromise代表了真正的xhr对象的执行状态
        let xhrPromise = new Promise(function (resolve, reject) {
            // 执行beforeCreate hook
            if (typeof hooks.beforeCreate === 'function') {
                // 可以在hook中直接调用resolve和reject来改变状态
                // 或者去关联另外一个Promise
                let canceled = hooks.beforeCreate(options, resolve, reject);
                // 如果返回true，则中断执行
                if (canceled === true) {
                    return;
                }
            }

            // xhr状态变化处理
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    let status = fakeXHR.status || xhr.status;
                    // IE9会把204状态码变成1223
                    if (status === 1223) {
                        status = 204;  // 这个是没有内容，不过开发者基本无需care
                    }

                    fakeXHR.status = fakeXHR.status || status;
                    fakeXHR.readyState = xhr.readyState;
                    fakeXHR.responseText = xhr.responseText;
                    fakeXHR.responseXML = xhr.responseXML;

                    if (typeof hooks.afterReceive === 'function') {
                        hooks.afterReceive(fakeXHR, options);
                    }

                    // 如果请求不成功，也就不用再分解数据了，直接丢回去就好
                    if (status < 200 || (status >= 300 && status !== 304)) {
                        reject(fakeXHR);
                        return;
                    }

                    let data = xhr.responseText;
                    if (options.dataType === 'json') {
                        try {
                            data = JSON.parse(data);
                        }
                        catch (ex) {
                            // 服务器返回的数据不符合JSON格式，认为请求失败
                            fakeXHR.error = ex;
                            reject(fakeXHR);
                            return;
                        }
                    }

                    if (typeof hooks.afterParse === 'function') {
                        try {
                            data = hooks.afterParse(data, fakeXHR, options);
                        }
                        catch (ex) {
                            fakeXHR.error = ex;
                            reject(fakeXHR);
                            return;
                        }
                    }

                    // 数据处理成功后，进行回调
                    resolve(data);
                }
            };

            let method = options.method.toUpperCase();
            let data = _.assign({}, options.urlParam);
            if (method === 'GET') {
                _.assign(data, options.data);
            }
            if (options.cache === false) {
                data[REQID_PARAM_KEY] = util.uid();
            }

            let query = hooks.serializeData('', data, 'application/x-www-form-urlencoded');
            let url = options.url;
            if (query) {
                let delimiter = url.indexOf('?') >= 0 ? '&' : '?';
                url += delimiter + query;
            }

            xhr.open(method, url, true);

            if (typeof hooks.beforeSend === 'function') {
                hooks.beforeSend(xhrWrapper, options);
            }

            if (method === 'GET') {
                xhr.send();
            }
            else {
                let contentType = options.contentType
                    || 'application/x-www-form-urlencoded';
                query = hooks.serializeData('', options.data, contentType, xhrWrapper);
                if (options.charset) {
                    contentType += ';charset=' + options.charset;
                }
                xhr.setRequestHeader('Content-Type', contentType);
                xhr.send(query);
            }
        });

        fakeXHR = Promise.race([xhrPromise, racingPromise]);
        _.assign(fakeXHR, xhrWrapper);

        fakeXHR.ensure(() => {
            clearTimeout(timeoutTic);
        });

        return fakeXHR;
    }

    /**
     * 发起一个`GET`请求
     *
     * @param {string} url 请求的地址
     * @param {Object} [data] 请求的数据
     * @param {boolean} [cache] 决定是否允许缓存
     * @return {meta.FakeXHR}
     */
    get(url, data, cache) {
        let options = {
            method: 'GET',
            url: url,
            data: data,
            cache: cache || this.config.cache
        };
        return this.request(options);
    }

    /**
     * 发起一个`GET`请求并获取JSON数据
     *
     * @param {string} url 请求的地址
     * @param {Object} [data] 请求的数据
     * @param {boolean} [cache] 决定是否允许缓存
     * @return {meta.FakeXHR}
     */
    getJSON(url, data, cache) {
        let options = {
            method: 'GET',
            url: url,
            data: data,
            dataType: 'json',
            cache: cache || this.config.cache
        };
        return this.request(options);
    }

    /**
     * 发起一个`POST`请求
     *
     * @param {string} url 请求的地址
     * @param {Object} [data] 请求的数据
     * @param {string} [dataType="json"] 指定响应的数据格式
     * @return {meta.FakeXHR}
     */
    post(url, data, dataType) {
        let options = {
            method: 'POST',
            url: url,
            data: data,
            dataType: dataType || 'json'
        };
        return this.request(options);
    }
}

export default new Ajax();

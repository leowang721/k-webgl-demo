/**
 * @file Requester Class.
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import _ from 'lodash';
import {EventTarget, setImmediate, Promise} from 'k-core';

import ajax from './ajax';
import hooks from './hooks';
import STATUS from './STATUS';
import config from './config';

export default class Requester extends EventTarget {
    constructor(options) {
        super(options);
        this.options = options;
    }

    request() {
        hooks.beforeEachRequest.call(this);
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            ajax.request(this.options)
                .then(_.bind(this.processXhrSuccess, this), _.bind(this.processXhrFailure, this))
                .catch(_.bind(this.processXhrException, this))
                .ensure(_.bind(hooks.afterEachRequest, this));
        }).catch(e => {  // to catch running exception in constructor
            this.fire('error', {
                error: e
            });
            return Promise.reject(e);
        });

        return this.promise;
    }

    /**
     * 处理ajax请求成功，转为定制状态
     *
     * @param {Object=} result ajax的执行结果
     * @return {meta.Promise} 定制状态
     */
    processXhrSuccess(result) {
        try {
            // 如果是转向行为，直接转向，整体转为reject
            if (result.redirect) {
                return Promise.reject({
                    status: STATUS.REQ_CODE.REDIRECT,
                    desc: STATUS.REQ_CODE_DESC.REDIRECT,
                    response: result
                });
            }

            if (_.isFunction(hooks.businessCheck)) {
                // 直接返回businessCheck的结果
                result = hooks.businessCheck.call(this, result);
            }

            // 如果是Promise状态，继续传递
            if (Promise.isPromise(result)) {
                return result.then(
                    response => {
                        hooks.eachSuccess.call(this, response);
                        // resolve整个状态
                        this.resolve(response);
                    },
                    response => Promise.reject(response)
                );
            }

            // 调用成功的hook
            hooks.eachSuccess.call(this, result);
            // resolve 结果
            this.resolve(result);
        }
        catch (e) {
            // 如果捕获到异常，是因为result的格式并非预期
            // 直接认为是CLIENT_SIDE_EXCEPTION
            // 不用fire error，因为在失败处理中会统一fire
            return Promise.reject({
                status: STATUS.REQ_CODE.CLIENT_SIDE_EXCEPTION,
                error: e,
                response: result
            });
        }
    }

    /**
     * 处理ajax失败！
     *
     * @param {Object} result 上一步的执行结果
     * @return {meta.Promise} rejected状态的Promise
     */
    processXhrFailure(result) {

        // 先处理超时
        // HTTP 408: Request Timeout
        if (result.status === 408) {
            return Promise.reject({
                status: STATUS.REQ_CODE.TIMEOUT,
                desc: STATUS.REQ_CODE_DESC.TIMEOUT,
                response: null
            });
        }

        // 请求失败：HTTP status < 200 || (status >= 300 && status !== 304
        return Promise.reject({
            httpStatus: result.status,
            status: STATUS.REQ_CODE.REQUEST_ERROR,
            desc: STATUS.REQ_CODE_DESC.REQUEST_ERROR,
            response: null
        });
    }

    /**
     * 处理成功处理方法中手动转为失败状态的状况
     *
     * @param {Object} result 上一步的执行结果
     */
    processXhrException(result) {

        // 服务器返回的数据在后置处理时异常，认为请求失败，此时result.error存在
        // 并且是一个Error
        if (result && result.error instanceof Error) {
            // 先抛出去异常
            this.fire('error', result);
        }

        hooks.eachFailure.call(this, result);

        // 如果已经有了status定义，直接返回
        if (result.status) {

            if (result.status === STATUS.REQ_CODE.REDIRECT) {
                setImmediate(() => {
                    window.location.href = result.response.redirecturl || config.redirectUrl;
                });

                // leave hanging
                return;
            }

            this.reject(result);
            return;
        }

        // 走到这里，就认为是浏览器端执行的抛错
        // 在这里才置为reject
        this.reject({
            status: STATUS.REQ_CODE.CLIENT_SIDE_EXCEPTION,
            desc: STATUS.REQ_CODE_DESC.CLIENT_SIDE_EXCEPTION,
            response: result
        });
    }
}

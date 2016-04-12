/**
 * @file k-ajax main entrance
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import _ from 'lodash';
import {util} from 'k-core';

import hooks from './hooks';
import Requester from './Requester';

export default {

    /**
     * 发送请求的主接口方法
     *
     * @param {string} url 请求的url
     * @param {?Object} params 携带的数据参数
     * @param {?Object} extraOpts 额外的请求参数
     *
     * @return {meta.Promise} 请求的Promise
     */
    request(url, params, extraOpts) {
        let ajaxOption = this.adjustOption(url, params, extraOpts);

        let req = new Requester(ajaxOption);
        req.on('error', util.processError);
        return req.request().then(response => response.data);
    },

    adjustOption(url, params, extraOpts) {

        if (_.isObject(url)) {
            extraOpts = params;
            params = url;
            url = params.url;
            delete params.url;
        }

        let ajaxOption = {
            url: url,
            urlParam: {}  // 请求url额外加的参数
        };

        // 如果指定了extraOpts，则进行额外的覆盖
        // 在这里执行可以覆盖url
        _.extend(ajaxOption, extraOpts);

        // 强制取消自动携带的_字段
        ajaxOption.cache = true;  // 如果为假则ajax执行每次请求的url都会携带参数`_`

        // 增加reqId
        let reqId = util.uid();
        ajaxOption.urlParam.reqId = reqId;

        let requestData = {
            reqId,
            params: JSON.stringify(params || {})
        };

        ajaxOption.data = _.isFunction(hooks.getRequestData) ? hooks.getRequestData(requestData) : requestData;

        return ajaxOption;
    }
};

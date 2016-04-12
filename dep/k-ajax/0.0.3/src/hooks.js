/**
 * @file hooks
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import _ from 'lodash';

/**
 * 序列化数组
 *
 * @member fc.ajax.hooks
 * @private
 *
 * @param {?string} prefix 前缀
 * @param {Array.<*>} array 数组
 *
 * @return {string}
 */
function serializeArray(prefix, array) {
    let encodedKey = prefix ? encodeURIComponent(prefix) : '';
    let encoded = [];
    for (let i = 0; i < array.length; i++) {
        let item = array[i];
        encoded[i] = this.serializeData('', item);
    }
    return encodedKey
        ? encodedKey + '=' + encoded.join(',')
        : encoded.join(',');
}

/**
 * 序列化数据
 *
 * @member fc.ajax.hooks
 * @private
 *
 * @param {?string} prefix 前缀
 * @param {*} data 数据
 *
 * @return {string}
 */
function serializeData(prefix, data) {
    if (arguments.length === 1) {
        data = prefix;
        prefix = '';
    }

    if (data == null) {
        data = '';
    }
    let getKey = this.serializeData.getKey;
    let encodedKey = prefix ? encodeURIComponent(prefix) : '';

    let type = Object.prototype.toString.call(data);
    switch (type) {
        case '[object Array]':
            return this.serializeArray(prefix, data);
        case '[object Object]':
            let result = [];
            for (let name in data) {
                if (data.hasOwnProperty(name)) {
                    let propertyKey = getKey(name, prefix);
                    let propertyValue = this.serializeData(
                        propertyKey, data[name]
                    );
                    result.push(propertyValue);
                }
            }
            return result.join('&');
        default:
            return encodedKey
                ? encodedKey + '=' + encodeURIComponent(data)
                : encodeURIComponent(data);
    }
}

/**
 * 获取组合的键名，例如sth.sub
 *
 * @private
 *
 * @param {string} propertyName 属性名
 * @param {string=} parentKey 可选的父级键名
 *
 * @return {string} 组合键名
 */
serializeData.getKey = function (propertyName, parentKey) {
    return parentKey ? parentKey + '.' + propertyName : propertyName;
};

/**
 * ajax行为的钩子们
 *
 * @class fc.ajax.hooks
 * @mixins meta.AjaxHook
 * @type {meta.AjaxHook}
 *
 */
export default {
    // er/ajax中的hooks
    serializeData: serializeData,  // 序列化数据，数组数据会走serializeArray
    serializeArray: serializeArray,  // 序列化数组数据
    // beforeExecute: noop,
    // beforeCreate: noop,
    // afterReceive: noop,
    // afterParse: noop,

    // 特定的hooks方法，会导致ajax行为发生变化

    // ajax请求成功之后立刻执行
    // 如果制定了businessCheck，会根据它的执行结果决定整个执行的状态是成功还是失败
    // @param {Object} response ajax返回的数据
    // businessCheck: noop,

    // 公共性质的处理请求的数据
    // getRequestData: _.noop,

    // 每次请求的hooks方法，不会终止执行
    beforeEachRequest: _.noop,
    afterEachRequest: _.noop,
    eachSuccess: _.noop,
    eachFailure: _.noop
};

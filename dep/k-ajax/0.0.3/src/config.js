/**
 * @file config
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

export default {

    /**
     * 默认的请求方法：GET|POST
     *
     * @type {string}
     */
    method: 'POST',

    /**
     * 请求时默认携带的数据
     *
     * @type {Object}
     */
    data: {},

    /**
     * 是否使用缓存？当前主要是针对着请求时是否携带一个随机串
     *
     * @type {boolean}
     */
    cache: false,

    /**
     * 默认超时时间，0为不设超时
     *
     * @type {number}
     */
    timeout: 0,

    /**
     * 默认的charset
     *
     * @type {string}
     */
    charset: '',

    /**
     * 默认的返回数据类型
     *
     * @type {string}
     */
    dataType: 'json'
};

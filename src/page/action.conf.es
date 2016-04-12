/**
 * @file pages action 的相关配置汇总入口
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

/**
 * ER Action 的注册配置，可引用子级的配置进行统一注册
 *
 * @type {Array}
 */
export default [
    {
        path: '/',
        movedTo: '/index'
    },
    {
        path: '/index',
        type: 'page/index/Action'
    }
];

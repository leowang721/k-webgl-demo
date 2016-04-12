/**
 * @file action 的相关配置汇总入口，此入口仅用于整个系统初始化时使用，后续项目切换时进行增量的注册，但是机制一样
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

import pages from './page/action.conf';

/**
 * ER Action 的注册配置，可引用子级的配置进行统一注册
 *
 * @type {Array}
 */
export default [
    pages
];

/**
 * @file learning pages action 的相关配置汇总入口
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
        path: '/learning',
        type: 'page/learning/Action',
        args: {
            name: '学习',
            id: 'page-learning'
        }
    },
    {
        path: '/learning/point',
        type: 'page/learning/point/Action',
        args: {
            name: '画点点(正方形)',
            id: 'page-learning-point'
        }
    },
    {
        path: '/learning/line',
        type: 'page/learning/line/Action',
        args: {
            name: '画线',
            id: 'page-learning-line'
        }
    },
    {
        path: '/learning/triangle',
        type: 'page/learning/triangle/Action',
        args: {
            name: '画三角形',
            id: 'page-learning-triangle'
        }
    },
    {
        path: '/learning/shape',
        type: 'page/learning/shape/Action',
        args: {
            name: '各种形状',
            id: 'page-learning-shape'
        }
    },
    {
        path: '/learning/transform',
        type: 'page/learning/transform/Action',
        args: {
            name: '变换',
            id: 'page-learning-transform'
        }
    },
    {
        path: '/learning/3d',
        type: 'page/learning/3d/Action',
        args: {
            name: '3d',
            id: 'page-learning-3d'
        }
    }
];

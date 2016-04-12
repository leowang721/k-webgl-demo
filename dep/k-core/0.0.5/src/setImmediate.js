/**
 * @file setImmediate
 *
 * @author Leo Wang(wangkemiao@baidu.com)
 */

import _ from 'lodash';
import setImmediate from 'promise/setImmediate';

/**
 * setImmediate的封装
 * IE10~11下window.setImmediate如果使用时的this值得不是window，就会抛出异常
 */
if (document.expando && window.setImmediate) {
    window.setImmediate = _.bind(window.setImmediate, window);
}

export default setImmediate;

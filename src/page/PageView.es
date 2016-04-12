/**
 * @file page的公共View
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import ErView from 'er/View';

import 'etpl/tpl!./common.tpl.html';
import 'k-component/component!../../component/my-navigator';

class View extends ErView {

    /**
     * 构造函数
     * @constructor
     */
    constructor(...args) {
        super(args);
    }

    enterDocument() {
        this.bindEvents();
    }

    bindEvents() {}
}

export default View;

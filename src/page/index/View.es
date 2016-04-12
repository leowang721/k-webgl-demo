/**
 * @file index - View
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import PageView from '../PageView';
import 'etpl/tpl!./tpl.html';

class View extends PageView {

    /**
     * 构造函数
     * @constructor
     */
    constructor() {
        super();
        // 指定模板
        this.template = 'page-index';
    }
}

export default View;

/**
 * @file point - View
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import _ from 'lodash';
import $ from 'k-component/lib/zepto';
import Coordinate from 'k-webgl/helper/Coordinate';
import PageView from '../../PageView';

import 'css!./style.less';
import 'etpl/tpl!./tpl.html';

class View extends PageView {
    /**
     * 构造函数
     * @constructor
     */
    constructor() {
        super();
        // 指定模板
        this.template = 'page-learning-point';
    }

    enterDocument() {
        $('#point-stage').click((e) => {
            let rect = e.target.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY -rect.top;

            this.fire('click', {
                position: Coordinate.transformFromScreen({x, y}, rect)
            });
        });
    }
}

export default View;

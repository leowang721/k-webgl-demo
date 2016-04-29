/**
 * @file 2D变换 - View
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import _ from 'lodash';
import $ from 'k-component/lib/zepto';
import Coordinate from 'k-webgl/helper/Coordinate';
import Rgba from 'k-webgl/helper/Rgba';
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
        this.template = 'page-learning-transform';
    }

    enterDocument() {
        let points = [];
        $('#transform-translation').click((e) => {
            this.fire('translation');
        });
        $('#transform-rotation').click((e) => {
            this.fire('rotation');
        });
        $('#transform-rotation-axis').click((e) => {
            this.fire('rotation-axis');
        });
        $('#transform-scaling').click((e) => {
            this.fire('scaling');
        });
    }
}

export default View;

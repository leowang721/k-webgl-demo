/**
 * @file 各种形状 - View
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
        this.template = 'page-learning-shape';
    }

    enterDocument() {
        let points = [];
        $('#operator').click((e) => {
            let target = e.target;
            let type = target.getAttribute('data-type');

            this.fire('draw', {
                shape: type
            });

            e.preventDefault();
            e.stopPropagation();
        });
    }
}

export default View;

/**
 * @file 三角形 - View
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
        this.template = 'page-learning-triangle';
    }

    enterDocument() {
        $('#triangle-stage').click((e) => {
            let rect = e.target.getBoundingClientRect();
            let x = e.clientX - rect.left - rect.width / 2;
            let y = -(e.clientY -rect.top - rect.height / 2);

            this.fire('draw', {
                pos: [x, y, 0]
            });

            e.preventDefault();
        });
    }
}

export default View;

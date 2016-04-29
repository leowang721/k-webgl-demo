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
        let points = [];
        $('#triangle-stage').click((e) => {
            let rect = e.target.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY -rect.top;

            let pos = Coordinate.transformFromScreen({x, y}, rect);
            points.push(pos);
            //
            // if (points.length === 3) {
            //     this.fire('draw', {
            //         a: points[0],
            //         b: points[1],
            //         c: points[2],
            //         color: new Rgba(Math.random(), Math.random(), Math.random(), 1)
            //     });
            //     points = [];
            // }

            this.fire('draw', {
                c: pos,
                color: new Rgba(Math.random(), Math.random(), Math.random(), 1)
            });

        });
    }
}

export default View;

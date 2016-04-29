/**
 * @file 线 - View
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
        this.template = 'page-learning-line';
    }

    enterDocument() {
        let line = [];
        $('#line-stage').click((e) => {
            let rect = e.target.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY -rect.top;

            let pos = Coordinate.transformFromScreen({x, y}, rect);
            line.push(pos);

            // if (line.length === 2) {
            //     this.fire('drawLine', {
            //         from: line[0],
            //         to: line[1],
            //         color: new Rgba(Math.random(), Math.random(), Math.random(), 1)
            //     });
            //     line = [];
            // }

            this.fire('draw', {
                to: pos,
                color: new Rgba(Math.random(), Math.random(), Math.random(), 1)
            });

        });
    }
}

export default View;

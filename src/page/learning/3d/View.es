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
        this.template = 'page-learning-3d';
    }

    enterDocument() {
        let points = [];

        $('#play').click((e) => {
            this.fire('play');
        });

        let changing = false;
        let pos = null;
        $('#stage-3d').on('mousedown', (e) => {
            changing = true;
            pos = {
                x: e.clientX,
                y: e.clientY
            };
            this.fire('dragbegin');
        });
        $('#stage-3d').on('mouseup', () => {
            changing = false;
            this.fire('dragend');
        });
        $('#stage-3d').on('mouseout', () => {
            changing = false;
            this.fire('dragend');
        });
        $('#stage-3d').on('mousemove', (e) => {
            if (changing) {
                this.fire('camerachange', {
                    dx: e.clientX - pos.x,
                    dy: e.clientY - pos.y
                });
                pos = {
                    x: e.clientX,
                    y: e.clientY
                };
            }
        });
    }
}

export default View;

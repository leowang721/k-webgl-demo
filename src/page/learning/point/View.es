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
            let x = e.clientX - rect.left - rect.width / 2;
            let y = -(e.clientY - rect.top - rect.height / 2);

            this.fire('click', {
                position: [x, y, 0]
            });
        });

        $(window).keydown(e => {
            switch (e.code) {
                case 'ArrowUp':
                    this.fire('camerachange', {
                        diff: 0.1
                    });
                    break;
                case 'ArrowDown':
                    this.fire('camerachange', {
                        diff: -0.1
                    });
                    break
            }
        });
    }
}

export default View;

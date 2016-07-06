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
import PMDFileParser from './PMDFileParser';

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
        this.template = 'page-learning-mmd';
    }

    enterDocument() {
        $('#file').on('change', e => {
            let reader = new FileReader();
            reader.onload = ee => {
                let parser = new PMDFileParser(ee.target.result);
                console.log(parser.parse());
            };
            reader.readAsBinaryString(e.target.files[0]);
        });
    }
}

export default View;

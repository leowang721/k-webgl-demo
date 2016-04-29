/**
 * @file 线 - Action
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import _ from 'lodash';
import PageAction from '../../PageAction';

import Renderer from 'k-webgl/Renderer';
import Scene from 'k-webgl/Scene';
import Coordinate from 'k-webgl/helper/Coordinate';
import Vertex from 'k-webgl/element/Vertex';
import Lines from 'k-webgl/shape/Lines';
import Rgba from 'k-webgl/helper/Rgba';

import Model from './Model';
import View from './View';

class Action extends PageAction {

    /**
     * 构造函数
     *
     * @constructor
     *
     * @param {Object} context ER Action构造函数默认传入的环境信息
     */
    constructor() {
        super();
        this.modelType = Model;
        this.viewType = View;
    }

    /**
     * 行为初始化
     *
     * @override
     */
    initBehavior() {
        super.initBehavior();

        let scene = new Scene();

        let renderer = new Renderer({
            domId: 'line-stage'
        });

        let lines = new Lines({
            mode: Lines.MODE.STRIP,
            color: new Rgba(Math.random(), Math.random(), Math.random(), 1)
        });
        lines.addLines({
            to: new Coordinate(0, 0, 0)
        });
        scene.add(lines);
        renderer.render(scene);

        this.view.on('draw', (e) => {
            lines.addLines(e);
            renderer.render(scene);
        });
    }
}

export default Action;

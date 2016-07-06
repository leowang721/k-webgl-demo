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

        let range = {
            width: document.getElementById('line-stage').offsetWidth,
            height: document.getElementById('line-stage').offsetHeight
        };

        let scene = new Scene({
            width: range.width,
            height: range.height,
            depth: 100
        });

        let renderer = new Renderer({
            domId: 'line-stage'
        });

        let lines = new Lines({
            color: new Rgba(Math.random(), Math.random(), Math.random(), 1)
        });
        lines.addVertices([
            [0, 0, 0],
            [0, 100, 0],
            [100, 100, 0]
        ]);
        scene.addShapes([lines, new Lines({
            color: Rgba.RED,
            vertices: [
                [100, 0, 0],
                [-100, 0, 0]
            ]
        })]);

        renderer.render(scene);

        this.view.on('draw', (e) => {
            lines.addVertices({
                coord: e.pos,
                color: new Rgba(Math.random(), Math.random(), Math.random(), 1)
            });
            renderer.repaint();
        });
    }
}

export default Action;

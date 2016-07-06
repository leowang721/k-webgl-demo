/**
 * @file point - Action
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import _ from 'lodash';
import PageAction from '../../PageAction';

import Renderer from 'k-webgl/Renderer';
import Scene from 'k-webgl/Scene';
import Camera from 'k-webgl/Camera';
import Coordinate from 'k-webgl/helper/Coordinate';
import Points from 'k-webgl/shape/Points';
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
            width: document.getElementById('point-stage').offsetWidth,
            height: document.getElementById('point-stage').offsetHeight
        };

        let scene = new Scene({
            width: range.width,
            height: range.height,
            depth: 100,
            camera: new Camera({
                position: [0, 0, 7],
                near: 7,
                far: 100
                // projection: 'perspective'
            })
        });

        let renderer = new Renderer({
            domId: 'point-stage'
        });

        let points = new Points({
            color: new Rgba(Math.random(), Math.random(), Math.random(), 1),
            size: 10,
            vertices: [
                [0, 0, 0],
                [-range.width / 4, -range.height / 4, 0],
                [range.width / 4, range.height / 4, 0],
                [range.width / 4, -range.height / 4, 0],
                [-range.width / 4, range.height / 4, 0]
            ]
        });
        scene.addShapes(points);

        renderer.render(scene);

        this.view.on('click', (e) => {
            points.add({
                coord: e.position,
                color: new Rgba(Math.random(), Math.random(), Math.random(), 1),
                size: Math.random() * 10 + 10
            });
            renderer.repaint();
        });

        this.view.on('camerachange', e => {
            let diff = e.diff;
            let pos = scene.currentCamera.position;
            if (pos[0] != -7) {
                // console.log([pos[0] + diff, pos[1], pos[2]])
                scene.setCameraPosition([pos[0] + diff, pos[1], pos[2]]);
            }
        });
    }
}

export default Action;

/**
 * @file mmd - Action
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import _ from 'lodash';
import PageAction from '../../PageAction';

import Renderer from 'k-webgl/Renderer';
import Scene from 'k-webgl/Scene';
import Camera from 'k-webgl/Camera';
import Light from 'k-webgl/Light';
import Coordinate from 'k-webgl/helper/Coordinate';
import Rgba from 'k-webgl/helper/Rgba';
import Polygon from 'k-webgl/shape/Polygon';

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
            width: document.getElementById('stage-mmd').offsetWidth,
            height: document.getElementById('stage-mmd').offsetHeight
        };

        let scene = new Scene({
            width: range.width,
            height: range.height,
            depth: 100,
            camera: new Camera({
                position: [3, 3, 7],
                up: [0, 1, 0],
                looking: [0, 0, 0],
                // projection: 'perspective',
                // projectionSettings: {
                //     fovy: 30,  // 视线角度
                    // aspect: range.width / range.height,  // 宽高比
                    // near: 1,
                    // far: 10
                // }
                projection: 'orthographic',
                projectionSettings: {
                    left: -range.width / 200,
                    right: range.width / 200,
                    bottom: -range.height / 200,
                    top: range.height / 200
                }
            }),
            light: new Light({
                color: [1, 1, 1],
                ambientColor: [0.3, 0.3, 0.3],
                direction: [-3, -3, 3]
            })
        });

        let renderer = new Renderer({
            domId: 'stage-mmd'
        });

        // renderer.render(scene).then(() => renderer.animation.play());

    }
}

function getRandom() {
    return (Math.random() > 0.5 ? 1 : -1) * Math.random();
}

function getRandomColor() {
    return new Rgba(0.7, 0.7, 0.7, 1);
    return new Rgba(getRandom(), getRandom(), getRandom(), 1)
}

export default Action;

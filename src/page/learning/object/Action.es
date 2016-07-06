/**
 * @file object - Action
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
import Points from 'k-webgl/shape/Points';
import Lines from 'k-webgl/shape/Lines';
import Cube from 'k-webgl/shape/Cube';
import Motion from 'k-webgl/animation/Motion';

import ObjFileParser from 'k-webgl/object/ObjFileParser';


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
            width: document.getElementById('stage-object').offsetWidth,
            height: document.getElementById('stage-object').offsetHeight
        };

        let scene = new Scene({
            width: range.width,
            height: range.height,
            depth: 100,
            mash: {
                unitDistance: 1
            },
            camera: new Camera({
                position: [3, 3, 15],
                up: [0, 1, 0],
                looking: [0, 0, 0],
                projection: 'perspective',
                near: 5,
                far: 1000
            }),
            light: new Light({
                color: [1, 1, 1],
                ambientColor: [0.3, 0.3, 0.3],
                direction: [0.5, 3, 4]
            })
        });

        let aCube = new Cube({
            length: 2,
            width: 2,
            height: 2,
            position: [3, 1, 0],
            color: [0.6, 0.6, 1, 1],
            flag: {
                light: true
            }
        });

        scene.addShapes(aCube);

        let renderer = new Renderer({
            domId: 'stage-object'
        });
        renderer.render(scene);

        let parser = new ObjFileParser(require.toUrl('./resource/obj/miku.obj'));
        let obj = null;
        parser.parse().then(shapes => {
            scene.addShapes(shapes);
            obj = shapes;
            renderer.repaint();

            let scroll360 = new Motion({
                id: 'scroll360',
                target: shapes[0]
            });
            scroll360
                .begin()
                .then().spent(5000).scale([0.5, 0.5, 0.5]).rotate(-3600, [0, 1, 0])
                .then().spent(3000).scale([2, 2, 2])
                .end();
            scene.animation.addMotion(scroll360);
        });

        this.view.on('play', e => {
            scene.animation.play();
        });

        this.view.on('dragbegin', () => {
            renderer.autoRefresh(true);
        });
        this.view.on('dragend', () => {
            renderer.autoRefresh(false);
        });
        this.view.on('camerachange', e => {
            // 位移数据
            let dx = e.dx / range.width * 360;
            let dy = e.dy / range.height * 360;
            // 计算出旋转的角度
            let ydeg = dx * 0.1;
            let xdeg = dy * 0.1;
            // 旋转
            scene.getCurrentCamera().transform.rotate(xdeg, [1, 0, 0]).rotate(ydeg, [0, 1, 0]).apply();
        });
    }
}

function getRandom() {
    return (Math.random() > 0.5 ? 1 : -1) * Math.random();
}

function getRandomColor() {
    return new Rgba(getRandom(), getRandom(), getRandom(), 1)
}

function getRandomCoord() {
    return new Coordinate(getRandom() * 10, getRandom() * 10, getRandom() * 10);
}

export default Action;

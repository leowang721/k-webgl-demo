/**
 * @file matchman - Action
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
import Motion from 'k-webgl/animation/Motion';

import Person from '../../../matchman/Person';

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
            width: document.getElementById('stage-matchman').offsetWidth,
            height: document.getElementById('stage-matchman').offsetHeight
        };

        let scene = new Scene({
            width: range.width,
            height: range.height,
            depth: 1000,
            mash: {
                unitDistance: 1
            },
            camera: new Camera({
                position: [1, 1, 6],
                up: [0, 1, 0],
                looking: [0, 0, 0],
                projection: 'perspective',
                near: 3,
                far: 100
            }),
            light: new Light({
                color: [1, 1, 1],
                ambientColor: [0.3, 0.3, 0.3],
                direction: [0.5, 3, 4]
            })
        });

        let leo = new Person({
            color: Rgba.BLACK,
            height: 1
        });
        scene.addShapes(leo.getShapes());

        let renderer = new Renderer({
            domId: 'stage-matchman'
        });

        renderer.render(scene);
        //
        // let scroll360 = new Motion({
        //     id: 'scroll360',
        //     target: leo.shapes
        // });
        // scroll360
        //     .begin()
        //     .spent(3000).rotate(360, [0, 0, 1])
        //     .then().spent(3000).translate(-2, -2, -2).rotate(-360, [0, 1, 0])
        //     .then().spent(3000).translate(2, 2, 2)
        //     .end();
        // scene.animation.addMotion(scroll360);

        let walkMotions = leo.walk();
        walkMotions.forEach(m => scene.animation.addMotion(m));

        // scene.animation.on('frame', () => {
        //     leo.chest.setPosition([leo.chest.position.x, leo.chest.position.y, leo.chest.position.z + 0.01]);
        // });
        scene.animation.on('finish', () => {scene.animation.replay()});
        this.view.on('play', e => scene.animation.play());
        this.view.on('stop', e => scene.animation.stop());
        let dx = 100 / range.width;
        let dy = 100 / range.height;
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
            scene.getCurrentCamera().transform.rotateX(xdeg).rotateY(ydeg).apply();
        });

        scene.animation.play();
    }
}

function getRandom() {
    return (Math.random() > 0.5 ? 1 : -1) * Math.random();
}

function getRandomColor() {
    return new Rgba(getRandom(), getRandom(), getRandom(), 1);
}

function getRandomCoord() {
    return new Coordinate(getRandom() * 10, getRandom() * 10, getRandom() * 10);
}

export default Action;

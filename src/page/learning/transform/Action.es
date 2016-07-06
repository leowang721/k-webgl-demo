/**
 * @file 2D变换 - Action
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import _ from 'lodash';
import PageAction from '../../PageAction';

import Renderer from 'k-webgl/Renderer';
import Scene from 'k-webgl/Scene';
import Coordinate from 'k-webgl/helper/Coordinate';
import TextureCoord from 'k-webgl/helper/TextureCoord';
import Polygon from 'k-webgl/shape/Polygon';
import Rgba from 'k-webgl/helper/Rgba';
import Texture from 'k-webgl/Texture';

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
            width: document.getElementById('transform-stage').offsetWidth,
            height: document.getElementById('transform-stage').offsetHeight
        };
        let scene = new Scene({
            width: range.width,
            height: range.height,
            depth: 100
        });

        let renderer = new Renderer({
            domId: 'transform-stage'
        });

        let imageRange = {
            width: 300,
            height: 300
        }

        let width = imageRange.width / 2;
        let height = imageRange.height / 2;

        let pos = [-width, -height, 0];
        let pos1 = [width, -height, 0];
        let pos2 = [width, height, 0];
        let pos3 = [-width, height, 0];
        let item = new Polygon({
            color: new Rgba(Math.random(), Math.random(), Math.random(), 1),
            vertices: [
                pos, pos1, pos2, pos3
            ],
            texture: new Texture({
                url: 'src/resource/texture/1.png',
                coords: [
                    TextureCoord.transformFromImage([0, 0], imageRange),
                    TextureCoord.transformFromImage([1024, 0], imageRange),
                    TextureCoord.transformFromImage([1024, 1024], imageRange),
                    TextureCoord.transformFromImage([0, 1024], imageRange)
                ]
            })
        });

        scene.addShapes(item);
        //
        // // 动画
        // let moving = renderer.animation.createMotion(0);
        // moving.animate(items[0])
        //     .begin()
        //     .then().spent(1000).moveBy({x: 100 / range.width / 2, y: -50 / range.height / 2, z: 0})
        //     .then().spent(1000).rotate(360, [0, 0, 1])
        //     .then().spent(1000).scale({x: 1.1, y: 1.1, z: 1.1})
        //     .end();
        //

        renderer.render(scene).then(() => {
            // renderer.animation.play();
        });

        renderer.autoRefresh(true);

        this.view.on('translation', (e) => {
            item.transform.translate(getRandom() * 20, getRandom() * 20, 0).apply();
        });

        this.view.on('rotation', (e) => {
            item.transform.rotate(Math.PI / 5, [0, 0, 1]).apply();
        });

        this.view.on('scaling', (e) => {
            item.transform.scale([1.1, 1.1, 1.1]).apply();
        });
    }
}

function getRandom() {
    return (Math.random() > 0.5 ? 1 : -1) * Math.random();
}

function getRandomPos() {
    return new Coordinate(getRandom(), getRandom(), getRandom())
}

function getRandomColor() {
    return new Rgba(getRandom(), getRandom(), getRandom(), 1)
}

export default Action;

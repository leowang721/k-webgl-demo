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
import Vertex from 'k-webgl/element/Vertex';
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
        let scene = new Scene();

        let renderer = new Renderer({
            domId: 'transform-stage'
        });

        // 扔100个大小为10px随机位置、随机颜色的方块
        let range = {
            width: document.getElementById('transform-stage').offsetWidth,
            height: document.getElementById('transform-stage').offsetHeight
        };
        let imageRange = {
            width: 1024,
            height: 1024
        }

        let width = 1024 / 2;
        let height = 1024 / 2;

        let items = _.times(1, () => {
            let pos = {
                // x: Math.random() * range.width,
                // y: Math.random() * range.height
                x: range.width / 2 - width / 2,
                // y: range.height / 2 - height / 2
                y: 0
            };
            let pos1 = {x: pos.x + width, y: pos.y};
            let pos2 = {x: pos.x + width, y: pos.y + height};
            let pos3 = {x: pos.x, y: pos.y + height};
            return new Polygon({
                color: new Rgba(Math.random(), Math.random(), Math.random(), 1),
                points: [
                    Coordinate.transformFromScreen(pos, range),
                    Coordinate.transformFromScreen(pos1, range),
                    Coordinate.transformFromScreen(pos2, range),
                    Coordinate.transformFromScreen(pos3, range)
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
        });

        scene.add(items);

        // 动画
        let moving = renderer.animation.createMotion(0);
        moving.animate(items[0])
            .begin()
            .then().spent(1000).moveBy({x: 100 / range.width / 2, y: -50 / range.height / 2, z: 0})
            .then().spent(1000).rotate(360, [0, 0, 1])
            .then().spent(1000).scale({x: 1.1, y: 1.1, z: 1.1})
            .end();


        renderer.render(scene).then(() => {
            renderer.animation.play();
        });

        this.view.on('translation', (e) => {
            items.forEach(item => {
                item.transform.translate(getRandom() / 2, getRandom() / 2, getRandom() / 2).apply();
            });
        });

        this.view.on('rotation-axis', (e) => {
            items.forEach(item => {
                item.transform.rotate(Math.PI / 5, [0, 0, 1]).apply();
            });
        });

        this.view.on('rotation', (e) => {
            items.forEach(item => {
                item.transform.rotateSelf(Math.PI / 5, [0, 0, 1]).apply();
            });
        });

        this.view.on('scaling', (e) => {
            items.forEach(item => {
                // item.transform.scale(_.times(2, () => {
                //     return Math.random() * 3;
                // }).concat(1)).apply();
                item.transform.scale([1.1, 1.1, 1.1]).apply();
            });
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

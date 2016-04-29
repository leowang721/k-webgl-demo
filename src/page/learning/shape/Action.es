/**
 * @file 各种形状 - Action
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import _ from 'lodash';
import PageAction from '../../PageAction';

import Renderer from 'k-webgl/Renderer';
import Scene from 'k-webgl/Scene';
import Coordinate from 'k-webgl/helper/Coordinate';
import Vertex from 'k-webgl/element/Vertex';
import Rgba from 'k-webgl/helper/Rgba';
import Points from 'k-webgl/shape/Points';
import Lines from 'k-webgl/shape/Lines';
import Triangles from 'k-webgl/shape/Triangles';
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
        let scene = new Scene();

        let renderer = new Renderer({
            domId: 'shape-stage'
        });

        this.view.on('draw', (e) => {
            let shape = e.shape;

            switch (shape) {
                case 'point':
                    scene.add(new Points({
                        color: getRandomColor(),
                        size: Math.random() * 100,
                        points: [getRandomPos()]
                    }));
                    break;
                case 'line':
                    scene.add(new Lines({
                        color: getRandomColor(),
                        lines: {
                            from: getRandomPos(),
                            to: getRandomPos()
                        }
                    }));
                    break;
                case 'triangle':
                    scene.add(new Triangles({
                        color: getRandomColor(),
                        triangles: {
                            a: getRandomPos(),
                            b: getRandomPos(),
                            c: getRandomPos()
                        }
                    }));
                    break;
                case 'polygon':
                    scene.add(new Polygon({
                        color: getRandomColor(),
                        points: _.times(~~(Math.random() * 10 + 2), () => {
                            return getRandomPos();
                        })
                    }));
            }
            renderer.render(scene);
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

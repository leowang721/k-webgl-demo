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

        let range = {
            width: document.getElementById('shape-stage').offsetWidth,
            height: document.getElementById('shape-stage').offsetHeight
        };


        function getRandomPos() {
            return new Coordinate(getRandom() * range.width / 3, getRandom() * range.height / 2, 0)
        }

        let scene = new Scene({
            width: range.width,
            height: range.height,
            depth: 100
        });

        let renderer = new Renderer({
            domId: 'shape-stage'
        });

        let points = new Points({
            size: 10
        });
        let lines = new Lines({
            color: Rgba.BLACK
        });
        let triangles = new Triangles();

        _.times(100, () => {
            points.add({
                color: getRandomColor(),
                size: Math.random() * 5 + 5,
                coord: getRandomPos()
            });
        });

        scene.addShapes([points, lines, triangles]);

        renderer.render(scene);

        this.view.on('draw', (e) => {
            let shape = e.shape;

            switch (shape) {
                case 'point':
                    points.add({
                        color: getRandomColor(),
                        size: Math.random() * 100,
                        coord: getRandomPos()
                    });
                    break;
                case 'line':
                    lines.addVertices([
                        {
                            color: getRandomColor(),
                            coord: getRandomPos(),
                        },
                        {
                            color: getRandomColor(),
                            coord: getRandomPos(),
                        }
                    ]);
                    break;
                case 'triangle':
                    triangles.addVertices(
                        [
                            {
                                color: getRandomColor(),
                                coord: getRandomPos()
                            },
                            {
                                color: getRandomColor(),
                                coord: getRandomPos()
                            },
                            {
                                color: getRandomColor(),
                                coord: getRandomPos()
                            }
                        ]
                    );
                    break;
                case 'polygon':
                    scene.addShapes(new Polygon({
                        color: getRandomColor(),
                        vertices: _.times(~~(Math.random() * 3 + 3), () => getRandomPos())
                    }));
            }
            renderer.repaint();
        });
    }
}

function getRandom() {
    return (Math.random() > 0.5 ? 1 : -1) * Math.random();
}

function getRandomColor() {
    return new Rgba(Math.random(), Math.random(), Math.random(), 1)
}

export default Action;

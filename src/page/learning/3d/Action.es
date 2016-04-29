/**
 * @file 3d - Action
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import _ from 'lodash';
import PageAction from '../../PageAction';

import Renderer from 'k-webgl/Renderer';
import Scene from 'k-webgl/Scene';
import Camera from 'k-webgl/Camera';
import Coordinate from 'k-webgl/helper/Coordinate';
import Vertex from 'k-webgl/element/Vertex';
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
            width: document.getElementById('stage-3d').offsetWidth,
            height: document.getElementById('stage-3d').offsetHeight
        };

        let scene = new Scene({
            camera: new Camera({
                position: [0.2, 0.25, 0.5]
            })
        });

        let width = 100;
        let height = 100;
        let pos = [range.width / 2 - width / 2, range.height / 2 - height / 2];
        let [sx, sy] = pos;

        let squart1 = new Polygon({
            color: new Rgba(Math.random(), Math.random(), Math.random(), 1),
            points: [
                Coordinate.transformFromScreen(pos, range),
                Coordinate.transformFromScreen([sx + width, sy], range),
                Coordinate.transformFromScreen([sx + width, sy + height], range),
                Coordinate.transformFromScreen([sx, sy + height], range)
            ]
        });

        let squart2 = new Polygon({
            color: new Rgba(Math.random(), Math.random(), Math.random(), 1),
            points: [
                Coordinate.transformFromScreen(pos, range, 0.2),
                Coordinate.transformFromScreen([sx + width, sy], range, 0.2),
                Coordinate.transformFromScreen([sx + width, sy + height], range, 0.2),
                Coordinate.transformFromScreen([sx, sy + height], range, 0.2)
            ]
        });

        let squart3 = new Polygon({
            color: new Rgba(Math.random(), Math.random(), Math.random(), 1),
            points: [
                Coordinate.transformFromScreen(pos, range, 0.4),
                Coordinate.transformFromScreen([sx + width, sy], range, 0.4),
                Coordinate.transformFromScreen([sx + width, sy + height], range, 0.4),
                Coordinate.transformFromScreen([sx, sy + height], range, 0.4)
            ]
        });

        scene.add([squart1, squart2, squart3]);

        let renderer = new Renderer({
            domId: 'stage-3d'
        });

        let scrolling = renderer.animation.createMotion();
        scrolling.animate(squart1)
            .begin()
            .spent(3000).rotate(360, [0, 0, 1])
            .end()

        renderer.render(scene).then(() => renderer.animation.play());

        this.view.on('play', (e) => renderer.animation.play());
    }
}

export default Action;

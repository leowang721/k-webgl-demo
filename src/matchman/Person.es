/**
 * @file Person
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import Rgba from 'k-webgl/helper/Rgba';
import BaseShape from 'k-webgl/shape/Base';
import Cube from 'k-webgl/shape/Cube';
import Motion from 'k-webgl/animation/Motion';

export default class Person {

    shapeMap = new Map();
    shapes = new Set();

    constructor(options = {}) {
        this.color = options.color || Rgba.BLACK;
        this.height = options.height || 1;
        this.initialize();
    }

    initialize() {
        this.initParts();
    }

    addPart(part) {
        if (part instanceof BaseShape) {
            if (!this.shapeMap.get(part.id)) {
                this.shapes.add(part.id);
                this.shapeMap.set(part.id, part);
                // 遍历
                if (part.children) {
                    part.children.forEach(c => {
                        this.addPart(c);
                    });
                }
            }
        }
    }

    getShapes() {
        return [...this.shapes].map(v => this.shapeMap.get(v));
    }

    initParts() {
        // this.head = new Ball({
        //     color: this.color,
        //     r: 0.06 * this.height,
        //     position: [0, 0.86 * this.height, 0]
        // });
        let unitHeight = this.height / 4.4;
        this.chest = new Cube({
            color: this.color,
            length: unitHeight,
            width: 0.4 * unitHeight,
            height: unitHeight,
            position: [0, 3.5 * unitHeight, 0]
        });
        this.head = new Cube({
            color: this.color,
            length: 0.5 * unitHeight,
            width: 0.5 * unitHeight,
            height: 0.5 * unitHeight,
            position: [0, 0.5 * unitHeight, 0],
            rotatePos: 'cba',
            parent: this.chest
        });
        this.abdomen = new Cube({
            color: this.color,
            length: unitHeight,
            width: 0.4 * unitHeight,
            height: unitHeight,
            position: [0, -0.5 * unitHeight, 0],
            rotatePos: 'cta',
            parent: this.chest
        });
        this.leftArmTop = new Cube({
            color: this.color,
            // color: Rgba.RED,
            length: 0.4 * unitHeight,
            width: 0.4 * unitHeight,
            height: unitHeight,
            rotatePos: 'cta',
            position: [0.7 * unitHeight, 0.5 * unitHeight, 0],
            parent: this.chest
        });
        this.leftArmBottom = new Cube({
            color: this.color,
            // color: Rgba.RED,
            length: 0.4 * unitHeight,
            width: 0.4 * unitHeight,
            height: unitHeight,
            position: [0, -unitHeight, 0],
            rotatePos: 'cta',
            parent: this.leftArmTop
        });
        this.rightArmTop = new Cube({
            color: this.color,
            // color: Rgba.RED,
            length: 0.4 * unitHeight,
            width: 0.4 * unitHeight,
            height: unitHeight,
            rotatePos: 'cta',
            position: [-0.7 * unitHeight, 0.5 * unitHeight, 0],
            parent: this.chest
        });
        this.rightArmBottom = new Cube({
            color: this.color,
            // color: Rgba.RED,
            length: 0.4 * unitHeight,
            width: 0.4 * unitHeight,
            height: unitHeight,
            position: [0, -unitHeight, 0],
            rotatePos: 'cta',
            parent: this.rightArmTop
        });
        this.leftLegTop = new Cube({
            color: this.color,
            // color: Rgba.GREEN,
            length: 0.4 * unitHeight,
            width: 0.4 * unitHeight,
            height: unitHeight,
            position: [0.3 * unitHeight, -unitHeight, 0],
            rotatePos: 'cta',
            parent: this.abdomen
        });
        this.leftLegBottom = new Cube({
            color: this.color,
            // color: Rgba.GREEN,
            length: 0.4 * unitHeight,
            width: 0.4 * unitHeight,
            height: unitHeight,
            position: [0, -unitHeight, 0],
            rotatePos: 'cta',
            parent: this.leftLegTop
        });
        this.rightLegTop = new Cube({
            color: this.color,
            // color: Rgba.GREEN,
            length: 0.4 * unitHeight,
            width: 0.4 * unitHeight,
            height: unitHeight,
            position: [-0.3 * unitHeight, -unitHeight, 0],
            rotatePos: 'cta',
            parent: this.abdomen
        });
        this.rightLegBottom = new Cube({
            color: this.color,
            // color: Rgba.GREEN,
            length: 0.4 * unitHeight,
            width: 0.4 * unitHeight,
            height: unitHeight,
            position: [0, -unitHeight, 0],
            rotatePos: 'cta',
            parent: this.rightLegTop
        });

        this.addPart(this.chest);
    }

    walk() {
        let unitSpent = 700;
        let walk = {
            arm: {
                left: {
                    top: new Motion({
                        id: 'walk-arm-left-top',
                        target: this.leftArmTop
                    }),
                    bottom: new Motion({
                        id: 'walk-arm-left-bottom',
                        target: this.leftArmBottom
                    })
                },
                right: {
                    top: new Motion({
                        id: 'walk-arm-right-top',
                        target: this.rightArmTop
                    }),
                    bottom: new Motion({
                        id: 'walk-arm-right-bottom',
                        target: this.rightArmBottom
                    })
                }
            },
            leg: {
                left: {
                    top: new Motion({
                        id: 'walk-leg-left-top',
                        target: this.leftLegTop
                    }),
                    bottom: new Motion({
                        id: 'walk-leg-left-bottom',
                        target: this.leftLegBottom
                    })
                },
                right: {
                    top: new Motion({
                        id: 'walk-leg-right-top',
                        target: this.rightLegTop
                    }),
                    bottom: new Motion({
                        id: 'walk-leg-right-bottom',
                        target: this.rightLegBottom
                    })
                }
            }
        };
        // 定制动画
        walk.leg.left.top.begin()
            .spent(unitSpent).rotateX(-30)
            .then().spent(unitSpent).rotateX(30)
            .end();
        walk.leg.left.bottom.begin()
            .spent(unitSpent).rotateX(30)
            .then().spent(unitSpent).rotateX(-30)
            .end();

        walk.leg.right.top.wait(unitSpent * 2).begin()
            .spent(unitSpent).rotateX(-30)
            .then().spent(unitSpent).rotateX(30)
            .end();
        walk.leg.right.bottom.wait(unitSpent * 2).begin()
            .spent(unitSpent).rotateX(30)
            .then().spent(unitSpent).rotateX(-30)
            .end();

        walk.arm.left.top.begin()
            .spent(unitSpent).rotateX(15)
            .then().spent(unitSpent).rotateX(-15)
            .then().spent(unitSpent).rotateX(-15)
            .then().spent(unitSpent).rotateX(15)
            .end();
        walk.arm.left.bottom.begin()
            .spent(unitSpent).rotate(-20, [1, 0, 0])
            .then().spent(unitSpent).rotate(10, [1, 0, 0])
            .then().spent(unitSpent).rotate(-20, [1, 0, 0])
            .then().spent(unitSpent).rotate(30, [1, 0, 0])
            .end();
        walk.arm.right.top.begin()
            .spent(unitSpent).rotateX(-15)
            .then().spent(unitSpent).rotateX(15)
            .then().spent(unitSpent).rotateX(15)
            .then().spent(unitSpent).rotateX(-15)
            .end();
        walk.arm.right.bottom.begin()
            .spent(unitSpent).rotate(-30, [1, 1, 0])
            .then().spent(unitSpent).rotate(20, [1, 1, 0])
            .then().spent(unitSpent).rotate(-10, [1, 1, 0])
            .then().spent(unitSpent).rotate(20, [1, 1, 0])
            .end();

        return [
            walk.arm.left.top,
            walk.arm.left.bottom,
            walk.arm.right.top,
            walk.arm.right.bottom,
            walk.leg.left.top,
            walk.leg.left.bottom,
            walk.leg.right.top,
            walk.leg.right.bottom
        ];
    }
}

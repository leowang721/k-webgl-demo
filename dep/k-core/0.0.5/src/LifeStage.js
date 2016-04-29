/**
 * @file A simple life stage transfer helper Class
 * @author Leo Wang(wangkemiao@baidu.com)
 */

import EventTarget from 'mini-event/EventTarget';

/**
 * DEFAULT_STAGES
 * @private
 * @type {Array}
 */

const DEFAULT_STAGES = [
    'NEW', 'INITED', 'RENDERED', 'REPAINTED', 'DISPOSED'
];

function getLifeStageHandler(lifeStages) {
    lifeStages = lifeStages || DEFAULT_STAGES;

    let keyMapper = {};
    let valueMapper = {};
    lifeStages.forEach(function (eachStage, index) {
        let value = 1 << index;
        keyMapper[eachStage] = value;
        valueMapper[value] = eachStage;
    });

    let current = 1;

    return {
        next() {
            let target = current << 1;
            if (valueMapper[target]) {
                current = target;
            }
        },
        switchTo(targetKey) {
            let targetValue = keyMapper[targetKey];
            if (targetValue) {
                current = targetValue;
            }
        },
        current() {
            return valueMapper[current];
        },
        is(key) {
            return current === keyMapper[key];
        }
    };
}

export default class LifeStage extends EventTarget {

    /**
     * A simple life stage transfer helper Class
     * with defined stages: ['NEW', 'INITED', 'RENDERED', 'REPAINTED', 'DISPOSED']
     *
     * LifeStage should be bound to another Class which I call Host Class, it can not be used independently.
     * When a stage transfer occurred, will trigger a custom event which has the same name as the target stage but lowercased.
     * if a on[Event] method exsits in Host Class, it will be called.
     *
     * use method next to transfer stage.
     * use method switchTo to transfer stage.
     * use method current to get current stage.
     * use method is to check whether current stage is some key.
     *
     * @class LifeStage
     * @constructor
     * @param {Object=} options options
     * @param {Array=} options.stages custom life stages
     */
    constructor(options) {

        super(options);

        options = options || {};

        let me = this;

        let handlers = getLifeStageHandler(options.stages);
        let determintToTriggerEvent = function (data) {
            let currentStage = handlers.current();
            if (data.from !== currentStage) {
                me.fire('transfer', Object.assign({}, data, {to: handlers.current()}));
                me.fire(currentStage.toLowerCase(), data);
                if (me.host) {
                    let methodName = 'on' + currentStage.charAt(0).toUpperCase() + currentStage.substring(1);
                    if (typeof me.host[methodName] === 'function') {
                        me.host[methodName](data);
                    }
                }
            }
        };

        me.next = function () {
            let data = {
                from: handlers.current()
            };

            handlers.next();
            determintToTriggerEvent(data);
        };

        me.switchTo = function (target) {
            let data = {
                from: handlers.current()
            };
            handlers.switchTo(target);
            determintToTriggerEvent(data);
        };

        me.current = handlers.current;
        me.is = handlers.is;
    }

    setHost(target) {
        this.host = target;
    }
}

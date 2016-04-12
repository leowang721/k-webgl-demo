/**
 * @file fc-core
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import Promise from 'promise';
import EventTarget from 'mini-event/EventTarget';

import LifeStage from './LifeStage';
import eventBus from './eventBus';
import setImmediate from './setImmediate';
import util from './util';

export default {
    Promise,
    LifeStage,
    eventBus,
    EventTarget,
    setImmediate,
    util
};

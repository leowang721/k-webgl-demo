/**
 * @file 事件总线
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import EventTarget from 'mini-event/EventTarget';

class EventBus extends EventTarget {
    constructor(...props) {
        super(props);
    }
}

export default new EventBus();

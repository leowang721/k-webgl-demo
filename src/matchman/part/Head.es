/**
 * @file head
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import Ball from 'k-webgl/shape/ball';

export default class Head extends Ball {
    initOptions() {
        super.initOptions();
        this.r = 1;
    }
}

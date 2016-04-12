/**
 * @file 导航
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import 'css!./my-navigator.less';

import Action from 'k-component/Action';
import $ from 'k-component/lib/zepto';


export default class MyNavigator extends Action {

    initialize() {
        this.current = this.el.attr('current');
    }

    bindEvents() {
        if (this.current) {
            this.$(`[data-path="${this.current}"]`).addClass('activated').click(() => false);
        }
    }
}

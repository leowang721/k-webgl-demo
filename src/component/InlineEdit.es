/**
 * @file 行内编辑
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import _ from 'lodash';
import Action from 'k-component/Action';
import $ from 'k-component/lib/zepto';
import 'k-component/component!k-component-element/mark-commandable';

export default class InlineEdit extends Action {

    initialize() {
        this.data.set('msgid', this.el.attr('data-msgid'));
        let value = this.content.text();
        if (value) {
            this.data.set('value', value);
        }
        else {
            this.content.html('<span class="empty-content">暂无翻译</span>');
        }
    }

    bindEvents() {
        this.$('.current').on('click', e => {
            this.toggleEdit();
        });

        this.$('[data-command=save]').on('click', (e, args) => {
            let txtbox = this.$('textarea');
            let newValue = txtbox.val();
            // update
            this.data.set('value', newValue);
            this.toggleEdit();
        });

        this.$('[data-command=cancel]').on('click', (e, args) => {
            let txtbox = this.$('textarea');
            txtbox.val(this.data.get('value'));
            this.toggleEdit();
            e.preventDefault();
        });

        this.data.on('change:value', (e, args) => {
            this.$('.current').html(e.newValue);
            this.trigger('edit', {
                newValue: e.newValue,
                oldValue: e.oldValue,
                data: this.data.get()
            });
        });
    }

    toggleEdit() {
        this.$('textarea').val(this.data.get('value') || '');
        this.$('.current').toggleClass('hide');
        this.$('.editor').toggleClass('hide');
    }
}

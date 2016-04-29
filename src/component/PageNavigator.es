/**
 * @file 就是一个按照规律去找当前页面，并列出来的组件
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import 'css!./page-navigator.less';

import _ from 'lodash';
import Action from 'k-component/Action';
import $ from 'k-component/lib/zepto';
import pages from '../page/action.conf';

export default class PageNavigator extends Action {

    initialize() {
        this.current = location.hash.substring(1);
        this.prefixPath = this.el.attr('path-prefix') || '/';

        // 自动生成 renderer
        this.content.html(
            [
                '<!-- for: ${pageMap} as ${eachPage} -->',
                    '<!-- if: ${eachPage.activated} -->',
                        '<li data-path="${eachPage.path}" class="activated">',
                            '<span>${eachPage.name}</span>',
                        '</li>',
                    '<!-- else: -->',
                        '<li data-path="${eachPage.path}">',
                            '<a href="#${eachPage.path}">${eachPage.name}</a>',
                        '</li>',
                    '<!-- /if -->',
                '<!-- /for -->',
                this.content.html()
            ].join('\n')
        );
    }

    initBehavior() {
        this.data.on('change:pageMap', this.render, this);
        // 准备导航数据，只要第一级的页面，先不搞二级页面了
        let pageMap = [];
        let matchCurrentPath = {};
        _.each(_.flattenDeep(pages), (eachPage) => {
            let prefixPathLen = 0;
            if (this.prefixPath) {
                if (this.prefixPath.charAt(0) !== '/') {
                    this.prefixPath = '/' + this.prefixPath;
                }
                if (this.prefixPath.charAt(this.prefixPath.length - 1) !== '/') {
                    this.prefixPath += '/';
                }
                // 过滤
                if (eachPage.path.indexOf(this.prefixPath) !== 0) {
                    return;
                }
                prefixPathLen = this.prefixPath.split('/').length - 2;  // 首尾各有一个 /
            }

            let paths = eachPage.path.substring(1).split('/');  // 先去除path第一个 /
            if (paths.length == 1 + prefixPathLen) {
                pageMap.push({
                    path: eachPage.path,
                    name: eachPage.args.name,
                    // 检查进来的Page的path是不是match current，前缀匹配就行了
                    activated: this.current.indexOf(eachPage.path) === 0
                });
            }
        });

        this.data.set('pageMap', pageMap);
    }
}

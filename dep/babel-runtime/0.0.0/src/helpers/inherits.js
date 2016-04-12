/**
 * Copyright (c) 2014 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file babel-runtime/helpers/inherits.js
 * @author leeight
 */

define(function (require) {
    var exports = {};

    var dontEnumBug = !(({toString: 1}).propertyIsEnumerable('toString'));

    // 为了可以兼容低版本的IE，不使用 babel 默认的实现
    exports['default'] = function (type, superType) {
        var Empty = function () {};
        Empty.prototype = superType.prototype;
        var proto = new Empty();

        var originalPrototype = type.prototype;
        type.prototype = proto;

        /*eslint-disable*/
        for (var key in originalPrototype) {
            proto[key] = originalPrototype[key];
        }
        /*eslint-enable*/

        if (dontEnumBug) {
            // 其实还有好多其它的，但应该不会撞上吧(╯‵□′)╯︵┻━┻
            if (originalPrototype.hasOwnProperty('toString')) {
                proto.toString = originalPrototype.toString;
            }
            if (originalPrototype.hasOwnProperty('valueOf')) {
                proto.valueOf = originalPrototype.valueOf;
            }
        }
        type.prototype.constructor = type;

        // 为了配合 es5-shim/object 里面的 Object.getPrototypeOf 的实现
        // 给 type.prototype 新增一个 __proto__ 属性
        // 因为 babel 转化代码之后，super 的调用变成了
        // babelHelpersGet(Object.getPrototypeOf(ChildConstructor.prototype), 'constructor', this).call(this, context)
        // 因此 Object.getPrototypeOf(ChildConstructor.prototype) 应该返回 ParentConstructor.prototype
        // 另外，因为 ParentConstructor.prototype.constructor === ParentConstructor)
        // 所以最终调用的结果是 ParentConstructor.call(this, context) 这个才是符合预期的
        if (!('__proto__' in type.prototype)) {
            type.prototype.__proto__ = superType.prototype;
        }

        return type;
    };

    return exports;
});










/* vim: set ts=4 sw=4 sts=4 tw=120: */

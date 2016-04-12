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
 * @file babel-runtime/helpers/create-class.js
 * @author leeight
 */

define(function (require) {
    var exports = {};

    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            /*
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
            */
            var decorators = descriptor.decorators;
            var key = descriptor.key;
            delete descriptor.key;
            delete descriptor.decorators;

            if (decorators) {
                for (var j = 0; j < decorators.length; j++) {
                    var decorator = decorators[j];
                    if (typeof decorator === 'function') {
                        descriptor = decorator(target, key, descriptor) || descriptor;
                    }
                    else {
                        throw new TypeError('The decorator for method ' + key
                            + ' is of the invalid type ' + typeof decorator);
                    }
                }
            }

            if (typeof descriptor.get === 'function') {
                target[key] = descriptor.get();
            }
            else if (typeof descriptor.value === 'function') {
                target[key] = descriptor.value;
            }
        }
    }

    exports['default'] = function (Constructor, protoProps, staticProps) {
        if (protoProps) {
            defineProperties(Constructor.prototype, protoProps);
        }

        if (staticProps) {
            defineProperties(Constructor, staticProps);
        }

        return Constructor;
    };

    return exports;
});










/* vim: set ts=4 sw=4 sts=4 tw=120: */

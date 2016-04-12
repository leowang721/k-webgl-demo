/**
 * @file server start index
 * @author Leo Wang(wangkemiao@baidu.com)
 */

'use strict';

let webserver = require('edp-webserver');
let config = require('../../edp-webserver-config');

webserver.start(config);

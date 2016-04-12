/**
 * @file main entrance
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import u from 'lodash';
import er from 'er';
import erConfig from 'er/config';
import erController from 'er/controller';
import erEvents from 'er/events';

import actions from './action.conf';

// do sth that really matters

// default configuration, this part is for er
let config = {
    indexUrl: '/index',
    systemName: '我的站点',
    noAuthorityLocation: '/error/403',
    notFoundLocation: '/error/404'
};
Object.assign(erConfig, config);

// 注册 er Actions
erController.registerAction(u.flattenDeep(actions));

er.start();

erEvents.on('error', (e) => {
    console.error(e && e.error ? e.error : e);
});

export default {};

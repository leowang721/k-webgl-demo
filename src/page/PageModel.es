/**
 * @file page的公共Model
 *
 * @author Leo Wang(leowang721@gmail.com)
 */

import ErModel from 'er/Model';
import _ from 'lodash';

class Model extends ErModel {

    /**
     * model 的 datasource
     * @return {Object} datasource
     */
    getDatasource() {
        let url = this.get('url');
        let paths = ('page' + url.getPath()).split('/');
        return {
            page: _.constant({
                key: paths.join('-'),
                path: paths.join('/')
            })
        };
    }
}

export default Model;

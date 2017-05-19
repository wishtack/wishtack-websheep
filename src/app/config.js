/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

class Config {

    shouldShowSolution() {
        return process.env['SHOW_SOLUTION'] === 'true';
    }

}

module.exports = {
    config: new Config()
};

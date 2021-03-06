/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

module.exports = {
    isAuthenticatedGuard: require('./is-authenticated-guard'),
    isAuthenticatedWithVerificationGuard: require('./is-authenticated-with-verification-guard'),
    isAuthenticatedWithRsaVerificationGuard: require('./is-authenticated-with-rsa-verification-guard'),
    isOwnerGuard: require('./is-owner-guard')
};

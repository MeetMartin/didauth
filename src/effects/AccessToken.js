// @ts-check

import { isNothing, AsyncEffect } from '@7urtle/lambda';
import axios from 'axios';

import { formatError } from './utils';

/**
* @typedef {object} RequestAccessTokenPayload
* @property {string} clientId
* @property {string} clientSecret
*/

/**
 * @param {RequestAccessTokenPayload} payload
 * @returns {AsyncEffect}
 */
const requestAccessToken = payload =>
    AsyncEffect
    // @ts-ignore
    .of(reject => resolve =>
        (isNothing(payload) && reject('requestAccessToken payload is Nothing.')) ||
        (isNothing(payload.clientId) && reject('requestAccessToken payload.clientId is Nothing.')) ||
        (isNothing(payload.clientSecret) && reject('requestAccessToken payload.clientSecret is Nothing.')) ||
        axios
        .post(
            'https://auth.mattr.global/oauth/token',
            {
                "client_id": payload.clientId,
                "client_secret": payload.clientSecret,
                "audience": "https://vii.mattr.global",
                "grant_type": "client_credentials"
            }
        )
        .then(resolve)
        .catch(error => reject(`Requesting MATTR Acccess Token: ${formatError(error)}`))
    );
    
export {
    requestAccessToken
};
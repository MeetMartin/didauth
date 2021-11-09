// @ts-check

import { isNothing, AsyncEffect } from '@7urtle/lambda';
import axios from 'axios';

import { formatError } from '../utils';

/**
 * @typedef {object} ReadDIDPayload
 * @property {string} tenant
 * @property {string} did
 * @property {string} accessToken
 */

/**
 * 
 * @pure
 * @param {ReadDIDPayload} payload
 * @returns {AsyncEffect}
 */
const readDID = payload =>
    AsyncEffect
    .of(reject => resolve =>
        (isNothing(payload) && reject('readDID payload is Nothing.')) ||
        (isNothing(payload.tenant) && reject('readDID payload.tenant is Nothing.')) ||
        (isNothing(payload.did) && reject('readDID payload.did is Nothing.')) ||
        (isNothing(payload.accessToken) && reject('readDID payload.accessToken is Nothing.')) ||
        axios.get(
            `https://${payload.tenant}/v1/dids/${payload.did}`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${payload.accessToken}`
                }
            }
        )
        .then(resolve)
        .catch(error => reject(`Reading DID: ${formatError(error)}`))
    );

export {
    readDID
};
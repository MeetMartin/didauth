// @ts-check

import { isNothing, AsyncEffect } from '@7urtle/lambda';
import axios from 'axios';

import { formatError } from '../utils';

/**
 * @typedef {object} CreateJWSPayload
 * @property {string} tenant MATTR tenant
 * @property {string} accessToken MATTR platform access token string
 * @property {string} didUrl authentication key value from DID document
 * @property {object} request message to be signed
 */

/**
 * createJWS creates a signed message in the form of a JWS (JSON Web Signature) using the specific
 * Key from the DID (Decentralized Identifier) supplied in the request.
 * 
 * Uses MATTR platform /v1/messaging/sign.
 * 
 * @pure
 * @HindleyMilner createJWS :: CreateJWSPayload -> AsyncEffect
 * @param {CreateJWSPayload} payload 
 * @returns {AsyncEffect}
 */
const createJWS = payload =>
    AsyncEffect
    .of(reject => resolve =>
        (isNothing(payload) && reject('createJWS payload is Nothing.')) ||
        (isNothing(payload.tenant) && reject('createJWS payload.tenant is Nothing.')) ||
        (isNothing(payload.accessToken) && reject('createJWS payload.accessToken is Nothing.')) ||
        (isNothing(payload.didUrl) && reject('createJWS payload.didUrl is Nothing.')) ||
        (isNothing(payload.request) && reject('createJWS payload.request is Nothing.')) ||
        axios.post(
            `https://${payload.tenant}/v1/messaging/sign`,
            {
                "didUrl": payload.didUrl,
                "payload": payload.request
            },
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${payload.accessToken}`
                }
            }
        )
        .then(resolve)
        .catch(error => reject(`Creating JWS: ${formatError(error)}`))
    );

export {
    createJWS
};
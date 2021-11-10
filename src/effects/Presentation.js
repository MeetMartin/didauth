// @ts-check

import { isNothing, AsyncEffect } from '@7urtle/lambda';
import axios from 'axios';

import { formatError } from '../utils';

/**
 * @typedef {object} CreatePresentationRequestPayload
 * @property {string} tenant MATTR tenant
 * @property {string} accessToken MATTR platform access token string
 * @property {string} requestId Request ID used by your app to tie together the request and the callback response
 * @property {string} did verifier DID
 * @property {string} templateId presentation template ID
 * @property {string} callbackURL callback URL that MATTR platform will call with the request result
 */

/**
 * createPresentationRequest creates a short lived Presentation Request.
 * 
 * Uses MATTR platform /v1/presentations/requests.
 * 
 * @pure
 * @HindleyMilner createPresentationRequest :: CreatePresentationRequestPayload -> AsyncEffect
 * @param {CreatePresentationRequestPayload} payload 
 * @returns {AsyncEffect}
 */
const createPresentationRequest = payload =>
    AsyncEffect
    .of(reject => resolve =>
        (isNothing(payload) && reject('createPresentationRequest payload is Nothing.')) ||
        (isNothing(payload.tenant) && reject('createPresentationRequest payload.tenant is Nothing.')) ||
        (isNothing(payload.accessToken) && reject('createPresentationRequest payload.accessToken is Nothing.')) ||
        (isNothing(payload.requestId) && reject('createPresentationRequest payload.requestId is Nothing.')) ||
        (isNothing(payload.did) && reject('createPresentationRequest payload.did is Nothing.')) ||
        (isNothing(payload.templateId) && reject('createPresentationRequest payload.templateId is Nothing.')) ||
        (isNothing(payload.callbackURL) && reject('createPresentationRequest payload.callbackURL is Nothing.')) ||
        axios.post(
            `https://${payload.tenant}/v1/presentations/requests`,
            {
                "challenge": payload.requestId,
                "did": payload.did,
                "templateId": payload.templateId,
                "expiresTime": 1638836401000,
                "callbackUrl": payload.callbackURL
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
        .catch(error => reject(`Creating Presentation Request: ${formatError(error)}`))
    );

export {
    createPresentationRequest
};
// @ts-check

import { isNothing, AsyncEffect } from '@7urtle/lambda';
import axios from 'axios';

import { formatError } from '../utils';

/**
 * @typedef {object} CreatePresentationRequestPayload
 * @property {string} tenant
 * @property {string} accessToken
 * @property {string} requestId
 * @property {string} did
 * @property {string} templateId
 * @property {string} presentationCallbackURL
 */

/**
 * 
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
        (isNothing(payload.presentationCallbackURL) && reject('createPresentationRequest payload.presentationCallbackURL is Nothing.')) ||
        axios.post(
            `https://${payload.tenant}/v1/presentations/requests`,
            {
                "challenge": payload.requestId,
                "did": payload.did,
                "templateId": payload.templateId,
                "expiresTime": 1638836401000,
                "callbackUrl": payload.presentationCallbackURL
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
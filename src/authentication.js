// @ts-check

import { map, flatMap, compose, mergeEithers, eitherToAsyncEffect, mergeAsyncEffects, AsyncEffect, Either } from '@7urtle/lambda';

import { requestAccessToken } from './effects/AccessToken';
import { readDID } from './effects/DID';
import { createPresentationRequest } from './effects/Presentation';
import { validatePayloadKey } from './utils';

/**
 * @typedef {object} AuthenticationPayload
 * @property {string} clientId
 * @property {string} clientSecret
 * @property {string} tenant
 * @property {string} did
 * @property {string} requestId
 * @property {string} templateId
 * @property {string} presentationCallbackURL
 */

/**
 * @pure
 * @param {AuthenticationPayload} payload 
 * @returns {any} 
 */
const validatePayload = payload =>
    (validate =>
        mergeEithers(
            validate('clientId'),
            validate('clientSecret'),
            validate('tenant'),
            validate('did'),
            validate('requestId'),
            validate('templateId'),
            validate('presentationCallbackURL'),
        )
    )(validatePayloadKey(payload));

/**
 * @typedef {object} PresentationRequestAndDIDPayload
 * @property {string} tenant
 * @property {string} accessToken
 * @property {string} did
 * @property {string} requestId
 * @property {string} templateId
 * @property {string} presentationCallbackURL
 */

/**
 * @pure
 * @param {PresentationRequestAndDIDPayload} payload 
 * @returns {any}
 */
const getPresentationRequestAndDID = payload =>
    mergeAsyncEffects(
        createPresentationRequest(payload),
        readDID(payload)
    );

/**
 * @pure
 * @param {AuthenticationPayload} payload 
 * @returns {any}
 */
const authentication = payload =>
    compose(
        map(responses => ({request: responses[0].data?.request, didUrl: responses[1].data?.didDocument?.authentication[0]})),
        flatMap(accessToken => getPresentationRequestAndDID({
            ...payload,
            accessToken: accessToken
        })),
        map(response => response.data.access_token),
        flatMap(requestAccessToken),
        eitherToAsyncEffect,
        validatePayload
    )(payload);

export {
    authentication,
    validatePayload,
    getPresentationRequestAndDID
};
// @ts-check

import { map, flatMap, compose, mergeEithers, eitherToAsyncEffect, mergeAsyncEffects } from '@7urtle/lambda';

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
 * @typedef {object} FullAuthenticationRequest
 * @property {string} tenant
 * @property {string} accessToken
 * @property {string} did
 * @property {string} requestId
 * @property {string} templateId
 * @property {string} presentationCallbackURL
 */

/**
 * @pure
 * @param {FullAuthenticationRequest} request 
 * @returns {any}
 */
const getPresentationRequestAndDID = request =>
    mergeAsyncEffects(
        createPresentationRequest(request),
        readDID(request)
    );

/**
 * @pure
 * @param {FullAuthenticationRequest} request 
 * @returns {any}
 */
const getJWS = request =>
    compose(
        map(responses => ({request: responses[0].data?.request, didUrl: responses[1].data?.didDocument?.authentication[0]})),
        getPresentationRequestAndDID
    )(request);

/**
 * @pure
 * @param {AuthenticationPayload} payload 
 * @returns {any}
 */
const authentication = payload =>
    compose(
        flatMap(accessToken => getJWS({
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
    getPresentationRequestAndDID,
    getJWS
};
// @ts-check

import { map, flatMap, compose, eitherToAsyncEffect, AsyncEffect } from '@7urtle/lambda';

import { validatePayload, getPresentationRequestAndDID } from './utils';
import { requestAccessToken } from './effects/AccessToken';
import { createJWE, sendMessage } from './effects/Messaging';

/**
 * @typedef {object} PushAuthenticationPayload
 * @property {string} clientId ID provided as part of MATTR platform onboarding
 * @property {string} clientSecret Secret provided as part of MATTR platform onboarding
 * @property {string} tenant Your MATTR tenant
 * @property {string} did Verifier DID representing your application,
 * @property {string} recipientDid User's DID stored by your application
 * @property {string} requestId Request ID used by your app to tie together the request and the callback response
 * @property {string} templateId Authentication presentation template ID
 * @property {string} callbackURL Callback URL that MATTR platform will call with the request result
 */

/**
 * @typedef {object} FullPushAuthenticationPayload
 * @property {string} tenant Your MATTR tenant
 * @property {string} accessToken MATTR platform access token string
 * @property {string} did Verifier DID representing your application,
 * @property {string} recipientDid User's DID stored by your application
 * @property {string} requestId Request ID used by your app to tie together the request and the callback response
 * @property {string} templateId Authentication presentation template ID
 * @property {string} callbackURL Callback URL that MATTR platform will call with the request result
 */

/**
 * createPushRequest creates an authentication that is sent to a digital wallet
 * 
 * @pure
 * @HindleyMilner createPushRequest :: FullPushAuthenticationPayload -> AsyncEffect
 * @param {FullPushAuthenticationPayload} payload 
 * @returns {AsyncEffect}
 */
const createPushRequest = payload =>
    compose(
        flatMap(message => sendMessage({...payload, message: message})),
        map(response => response.data.jwe),
        flatMap(request => createJWE({...payload, ...request, recipientDids: [payload.recipientDid]})),
        map(responses => ({request: responses[0].data?.request, didUrl: responses[1].data?.didDocument?.keyAgreement[0]?.id})),
        getPresentationRequestAndDID
    )(payload);

/**
 * pushAuthentication creates an authentication digital wallet push request for DID Authentication with your MATTR tenant. It uses the recipientDID
 * stored in your system to find the user's digital wallet and ask them for authentication through a push request on their phone.
 * 
 * As a result, MATTR platform calls supplied callback URL with the result that connects to your request by a supplied
 * Request ID.
 * 
 * We return a monad @7urtle/lambda.AsyncEffect as the output of the function: https://www.7urtle.com/documentation-7urtle-lambda#lambda-AsyncEffect
 * 
 * @pure
 * @HindleyMilner pushAuthentication :: PushAuthenticationPayload -> AsyncEffect
 * @param {PushAuthenticationPayload} payload 
 * @returns {AsyncEffect}
 * @example
 * import { pushAuthentication } from 'didauth';
 * 
 * const payload = {
 *     clientId: 'client id',
 *     clientSecret: 'client secret',
 *     tenant: 'your-tenant.vii.mattr.global',
 *     did: 'did:method:code',
 *     recipientDid: 'did:method:code',
 *     requestId: 'your-request-id',
 *     templateId: 'presentation template id',
 *     callbackURL: 'https://your-domain.tld/didauth/callback'
 * };
 * 
 * pushAuthentication(payload)
 * .trigger
 * (errors => console.log(errors) || ({
 *     statusCode: 500,
 *     body: 'Internal Server Error'
 * }))
 * (() => ({
 *     statusCode: 204
 * }));
 */
const pushAuthentication = payload =>
    compose(
        flatMap(accessToken => createPushRequest({
            ...payload,
            accessToken: accessToken
        })),
        map(response => response.data.access_token),
        flatMap(requestAccessToken),
        eitherToAsyncEffect,
        validatePayload(['clientId', 'clientSecret', 'tenant', 'did', 'recipientDid', 'requestId', 'templateId', 'callbackURL'])
    )(payload);

export {
    pushAuthentication,
    createPushRequest
};
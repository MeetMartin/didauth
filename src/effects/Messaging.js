// @ts-check

import { isNothing, AsyncEffect } from '@7urtle/lambda';
import axios from 'axios';

import { formatError } from '../utils.js';

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

/**
 * @typedef {object} CreateJWEPayload
 * @property {string} tenant MATTR tenant
 * @property {string} accessToken MATTR platform access token string
 * @property {string} didUrl authentication key value from DID document
 * @property {[string]} recipientDids array of recipient DID strings
 * @property {object} request message to be signed
 */

/**
 * createJWE encrypts a payload using a JWM format.
 * 
 * Uses MATTR platform /v1/messaging/encrypt.
 * 
 * @pure
 * @HindleyMilner createJWE :: CreateJWEPayload -> AsyncEffect
 * @param {CreateJWEPayload} payload 
 * @returns {AsyncEffect}
 */
const createJWE = payload =>
    AsyncEffect
    .of(reject => resolve =>
        (isNothing(payload) && reject('createJWE payload is Nothing.')) ||
        (isNothing(payload.tenant) && reject('createJWE payload.tenant is Nothing.')) ||
        (isNothing(payload.accessToken) && reject('createJWE payload.accessToken is Nothing.')) ||
        (isNothing(payload.didUrl) && reject('createJWE payload.didUrl is Nothing.')) ||
        (isNothing(payload.recipientDids) && reject('createJWE payload.recipientDids is Nothing.')) ||
        (isNothing(payload.request) && reject('createJWE payload.request is Nothing.')) ||
        axios.post(
            `https://${payload.tenant}/v1/messaging/encrypt`,
            {
                "senderDidUrl": payload.didUrl,
                "recipientDidUrls": payload.recipientDids,
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
        .catch(error => reject(`Creating JWE: ${formatError(error)}`))
    );

/**
 * @typedef {object} SendMessagePayload
 * @property {string} tenant MATTR tenant
 * @property {string} accessToken MATTR platform access token string
 * @property {string} recipientDid message recipient DID
 * @property {object} message JWE message to be sent
 */

/**
 * sendMessage sends an encrypted JWM format DIDComm message to a DID service endpoint.
 * 
 * Uses MATTR platform /v1/messaging/send.
 * 
 * @pure
 * @HindleyMilner sendMessage :: SendMessagePayload -> AsyncEffect
 * @param {SendMessagePayload} payload 
 * @returns {AsyncEffect}
 */
const sendMessage = payload =>
    AsyncEffect
    .of(reject => resolve =>
        (isNothing(payload) && reject('sendMessage payload is Nothing.')) ||
        (isNothing(payload.tenant) && reject('sendMessage payload.tenant is Nothing.')) ||
        (isNothing(payload.accessToken) && reject('sendMessage payload.accessToken is Nothing.')) ||
        (isNothing(payload.recipientDid) && reject('sendMessage payload.recipientDid is Nothing.')) ||
        (isNothing(payload.message) && reject('sendMessage payload.message is Nothing.')) ||
        axios.post(
            `https://${payload.tenant}/v1/messaging/send`,
            {
                "to": payload.recipientDid,
                "message": payload.message
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
        .catch(error => reject(`Sending Message: ${formatError(error)}`))
    );

export {
    createJWE,
    createJWS,
    sendMessage
};
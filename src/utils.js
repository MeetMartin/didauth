// @ts-check

import { deepInspect, isNothing, isNotString, Failure, Success, Either, compose, map, mergeEithers, AsyncEffect, mergeAsyncEffects } from '@7urtle/lambda';

import { createPresentationRequest } from './effects/Presentation';
import { readDID } from './effects/DID';

/**
* @typedef {object} MATTRError
* @property {{data: {message: string, details: string}}} response
*/

/**
 * formatError tkaes MATTRError returned by the MATTR platform and formats it
 * into an error string.
 * 
 * @pure
 * @HindleyMilner formatError :: MATTRError -> string
 * @param {MATTRError} error 
 * @returns {string}
 */
const formatError = error =>
    `${error}.` +
    `${error && error.response && error.response.data && error.response.data.message ? ` ${error.response.data.message}.` : ''}` +
    `${error && error.response && error.response.data && error.response.data.details ? ` ${deepInspect(error.response.data.details)}.` : ''}`;

/**
 * validatePayloadKey validates that key withing a payload is a string that is not Nothing.
 * 
 * On success it returns Success with the original payload.
 * 
 * On failure it returns Failure with an error message.
 * 
 * @pure
 * @HindleyMilner validatePayloadKey :: object -> string -> Either
 * @param {object} payload 
 * @returns {function(string): Either}
 * @example
 * validatePayloadKey({key: 'string'})('key');
 * // => Success({key: 'string'})
 * 
 * validatePayloadKey({key: 'string'})('fake');
 * // => Failure('payload.fake is Nothing or not a string')
 */
const validatePayloadKey = payload => key =>
    isNothing(payload[key]) || isNotString(payload[key])
    ? Failure(`payload.${key} is Nothing or not a string.`)
    : Success(payload);

/**
 * validatePayload validates payload required keys to ensure their values are strings that are not Nothing. It returns
 * a Failure with an array of validation error messages or a Success with the original payload.
 * 
 * @pure
 * @HindleyMilner validatePayload :: Array.<string> -> object -> Either
 * @param {Array.<string>} keys
 * @returns {function(object): Either} 
 */
 const validatePayload = keys => payload => 
    compose(
        map(values => values[0]),
        validate => mergeEithers(
            ...map(key => validate(key))(keys)
        )
    )
    (validatePayloadKey(payload));

/**
 * @typedef {object} PresentationRequestAndDIDPayload
 * @property {string} tenant Your MATTR tenant
 * @property {string} accessToken MATTR platform access token string
 * @property {string} did Verifier DID representing your application
 * @property {string} challengeId Challenge ID used by your app to tie together the request and the callback response
 * @property {string} templateId Authentication presentation template ID
 * @property {string} callbackURL Callback URL that MATTR platform will call with the request result
 */

/**
 * getPresentationRequestAndDID creates merged AsyncEffect that can create a presentation request
 * and read DID in parallel.
 * 
 * @pure
 * @HindleyMilner getPresentationRequestAndDID :: FullPushAuthenticationPayload -> AsyncEffect
 * @param {PresentationRequestAndDIDPayload} payload 
 * @returns {AsyncEffect}
 */
 const getPresentationRequestAndDID = payload =>
    mergeAsyncEffects(
        createPresentationRequest(payload),
        readDID(payload)
    );

export {
    formatError,
    validatePayloadKey,
    validatePayload,
    getPresentationRequestAndDID
};

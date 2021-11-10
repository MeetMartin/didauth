// @ts-check

import { deepInspect, isNothing, isNotString, Failure, Success, Either } from '@7urtle/lambda';

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
    `${error?.response?.data?.message ? ` ${error.response.data.message}.` : ''}` +
    `${error?.response?.data?.details ? ` ${deepInspect(error.response.data.details)}.` : ''}`;

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

export {
    formatError,
    validatePayloadKey
};

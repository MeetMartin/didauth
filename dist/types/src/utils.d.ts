export type MATTRError = {
    response: {
        data: {
            message: string;
            details: string;
        };
    };
};
export type PresentationRequestAndDIDPayload = {
    /**
     * Your MATTR tenant
     */
    tenant: string;
    /**
     * MATTR platform access token string
     */
    accessToken: string;
    /**
     * Verifier DID representing your application
     */
    did: string;
    /**
     * Challenge ID used by your app to tie together the request and the callback response
     */
    challengeId: string;
    /**
     * Authentication presentation template ID
     */
    templateId: string;
    /**
     * Callback URL that MATTR platform will call with the request result
     */
    callbackURL: string;
};
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
export function formatError(error: MATTRError): string;
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
export function validatePayloadKey(payload: object): (arg0: string) => any;
/**
 * validatePayload validates payload required keys to ensure their values are strings that are not Nothing. It returns
 * a Failure with an array of validation error messages or a Success with the original payload.
 *
 * @pure
 * @HindleyMilner validatePayload :: Array.<string> -> object -> Either
 * @param {Array.<string>} keys
 * @returns {function(object): Either}
 */
export function validatePayload(keys: Array<string>): (arg0: object) => any;
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
export function getPresentationRequestAndDID(payload: PresentationRequestAndDIDPayload): any;

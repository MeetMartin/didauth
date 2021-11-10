export type MATTRError = {
    response: {
        data: {
            message: string;
            details: string;
        };
    };
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

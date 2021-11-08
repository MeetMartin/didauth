// @ts-check

import { deepInspect } from '@7urtle/lambda';

/**
* @typedef {object} MATTRError
* @property {{data: {message: string, details: string}}} response
*/

/**
 * 
 * @pure
 * @param {MATTRError} error 
 * @returns {string}
 */
const formatError = error =>
    `${error}.` +
    `${error?.response?.data?.message ? ` ${error.response.data.message}.` : ''}` +
    `${error?.response?.data?.details ? ` ${deepInspect(error.response.data.details)}.` : ''}`;

export {
    formatError
};

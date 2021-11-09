export type RequestAccessTokenPayload = {
    clientId: string;
    clientSecret: string;
};
/**
 * @typedef {object} RequestAccessTokenPayload
 * @property {string} clientId
 * @property {string} clientSecret
 */
/**
 *
 * @pure
 * @param {RequestAccessTokenPayload} payload
 * @returns {AsyncEffect}
 */
export function requestAccessToken(payload: RequestAccessTokenPayload): any;

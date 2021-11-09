export type ReadDIDPayload = {
    tenant: string;
    did: string;
    accessToken: string;
};
/**
 * @typedef {object} ReadDIDPayload
 * @property {string} tenant
 * @property {string} did
 * @property {string} accessToken
 */
/**
 *
 * @pure
 * @param {ReadDIDPayload} payload
 * @returns {AsyncEffect}
 */
export function readDID(payload: ReadDIDPayload): any;

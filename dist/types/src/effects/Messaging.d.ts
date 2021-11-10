export type CreateJWSPayload = {
    /**
     * MATTR tenant
     */
    tenant: string;
    /**
     * MATTR platform access token string
     */
    accessToken: string;
    /**
     * authentication key value from DID document
     */
    didUrl: string;
    /**
     * message to be signed
     */
    request: object;
};
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
export function createJWS(payload: CreateJWSPayload): any;

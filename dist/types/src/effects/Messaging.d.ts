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
export type CreateJWEPayload = {
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
     * array of recipient DID strings
     */
    recipientDids: [string];
    /**
     * message to be signed
     */
    request: object;
};
export type SendMessagePayload = {
    /**
     * MATTR tenant
     */
    tenant: string;
    /**
     * MATTR platform access token string
     */
    accessToken: string;
    /**
     * message recipient DID
     */
    recipientDid: string;
    /**
     * JWE message to be sent
     */
    message: object;
};
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
export function createJWE(payload: CreateJWEPayload): any;
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
export function sendMessage(payload: SendMessagePayload): any;

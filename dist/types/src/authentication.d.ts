export type AuthenticationPayload = {
    clientId: string;
    clientSecret: string;
    tenant: string;
    did: string;
    requestId: string;
    templateId: string;
    presentationCallbackURL: string;
};
export type FullAuthenticationRequest = {
    tenant: string;
    accessToken: string;
    did: string;
    requestId: string;
    templateId: string;
    presentationCallbackURL: string;
};
/**
 * @pure
 * @param {AuthenticationPayload} payload
 * @returns {AsyncEffect}
 */
export function authentication(payload: AuthenticationPayload): any;
/**
 * @typedef {object} AuthenticationPayload
 * @property {string} clientId
 * @property {string} clientSecret
 * @property {string} tenant
 * @property {string} did
 * @property {string} requestId
 * @property {string} templateId
 * @property {string} presentationCallbackURL
 */
/**
 * @pure
 * @param {AuthenticationPayload} payload
 * @returns {Either}
 */
export function validatePayload(payload: AuthenticationPayload): any;
/**
 * @typedef {object} FullAuthenticationRequest
 * @property {string} tenant
 * @property {string} accessToken
 * @property {string} did
 * @property {string} requestId
 * @property {string} templateId
 * @property {string} presentationCallbackURL
 */
/**
 * @pure
 * @param {FullAuthenticationRequest} request
 * @returns {AsyncEffect}
 */
export function getPresentationRequestAndDID(request: FullAuthenticationRequest): any;
/**
 * @pure
 * @param {FullAuthenticationRequest} request
 * @returns {AsyncEffect}
 */
export function getJWS(request: FullAuthenticationRequest): any;

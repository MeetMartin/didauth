export type CreatePresentationRequestPayload = {
    /**
     * MATTR tenant
     */
    tenant: string;
    /**
     * MATTR platform access token string
     */
    accessToken: string;
    /**
     * Request ID used by your app to tie together the request and the callback response
     */
    requestId: string;
    /**
     * verifier DID
     */
    did: string;
    /**
     * presentation template ID
     */
    templateId: string;
    /**
     * callback URL that MATTR platform will call with the request result
     */
    callbackURL: string;
};
/**
 * @typedef {object} CreatePresentationRequestPayload
 * @property {string} tenant MATTR tenant
 * @property {string} accessToken MATTR platform access token string
 * @property {string} requestId Request ID used by your app to tie together the request and the callback response
 * @property {string} did verifier DID
 * @property {string} templateId presentation template ID
 * @property {string} callbackURL callback URL that MATTR platform will call with the request result
 */
/**
 * createPresentationRequest creates a short lived Presentation Request.
 *
 * Uses MATTR platform /v1/presentations/requests.
 *
 * @pure
 * @HindleyMilner createPresentationRequest :: CreatePresentationRequestPayload -> AsyncEffect
 * @param {CreatePresentationRequestPayload} payload
 * @returns {AsyncEffect}
 */
export function createPresentationRequest(payload: CreatePresentationRequestPayload): any;

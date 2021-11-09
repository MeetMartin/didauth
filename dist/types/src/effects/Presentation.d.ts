export type CreatePresentationRequestPayload = {
    tenant: string;
    accessToken: string;
    requestId: string;
    did: string;
    templateId: string;
    presentationCallbackURL: string;
};
/**
 * @typedef {object} CreatePresentationRequestPayload
 * @property {string} tenant
 * @property {string} accessToken
 * @property {string} requestId
 * @property {string} did
 * @property {string} templateId
 * @property {string} presentationCallbackURL
 */
/**
 *
 * @param {CreatePresentationRequestPayload} payload
 * @returns {AsyncEffect}
 */
export function createPresentationRequest(payload: CreatePresentationRequestPayload): any;

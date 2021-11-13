export type CreatePresentationTemplatePayload = {
    /**
     * MATTR tenant
     */
    tenant: string;
    /**
     * MATTR platform access token string
     */
    accessToken: string;
    /**
     * convenience attribute for quickly determining the intended purpose of a created template
     */
    name?: string | undefined;
    /**
     * the domain of the tenant being used
     */
    domain?: string | undefined;
    /**
     * type of presentation: DIDAuth, QueryByExample, QueryByFrame
     */
    query?: [any] | undefined;
};
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
    /**
     * Unix timestamp in ms after which the request will be expired, 5 minutes default
     */
    expiresTime?: number | undefined;
};
/**
 * @typedef {object} CreatePresentationTemplatePayload
 * @property {string} tenant MATTR tenant
 * @property {string} accessToken MATTR platform access token string
 * @property {string} [name] convenience attribute for quickly determining the intended purpose of a created template
 * @property {string} [domain] the domain of the tenant being used
 * @property {[object]} [query] type of presentation: DIDAuth, QueryByExample, QueryByFrame
 */
/**
 * createPresentationTemplate creates a Presentation Request Template that defines which credentials are required for presentation.
 * This is used to create the actual Presentation Request, which is used by the Mobile Wallet to select which credential it should
 * display to the Holder, asking for confirmation to be used in the Presentation to be sent.
 *
 * The domain value must always match the domain of the tenant being used. In MATTR Platform you may customize your domain
 * to represent you when you request is displayed in the Mobile Wallet app.
 *
 * Uses MATTR platform /v1/presentations/templates.
 *
 * @pure
 * @HindleyMilner createPresentationTemplate :: CreatePresentationTemplatePayload -> AsyncEffect
 * @param {CreatePresentationTemplatePayload} payload
 * @returns {AsyncEffect}
 */
export function createPresentationTemplate(payload: CreatePresentationTemplatePayload): any;
/**
 * @typedef {object} CreatePresentationRequestPayload
 * @property {string} tenant MATTR tenant
 * @property {string} accessToken MATTR platform access token string
 * @property {string} requestId Request ID used by your app to tie together the request and the callback response
 * @property {string} did verifier DID
 * @property {string} templateId presentation template ID
 * @property {string} callbackURL callback URL that MATTR platform will call with the request result
 * @property {number} [expiresTime] Unix timestamp in ms after which the request will be expired, 5 minutes default
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

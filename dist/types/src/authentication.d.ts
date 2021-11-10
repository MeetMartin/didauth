export type AuthenticationPayload = {
    /**
     * ID provided as part of MATTR platform onboarding
     */
    clientId: string;
    /**
     * Secret provided as part of MATTR platform onboarding
     */
    clientSecret: string;
    /**
     * Your MATTR tenant
     */
    tenant: string;
    /**
     * Verifier DID representing your application
     */
    did: string;
    /**
     * Request ID used by your app to tie together the request and the callback response
     */
    requestId: string;
    /**
     * Authentication presentation template ID
     */
    templateId: string;
    /**
     * Callback URL that MATTR platform will call with the request result
     */
    callbackURL: string;
};
export type FullAuthenticationRequest = {
    /**
     * Your MATTR tenant
     */
    tenant: string;
    /**
     * MATTR platform access token string
     */
    accessToken: string;
    /**
     * Verifier DID representing your application
     */
    did: string;
    /**
     * Request ID used by your app to tie together the request and the callback response
     */
    requestId: string;
    /**
     * Authentication presentation template ID
     */
    templateId: string;
    /**
     * Callback URL that MATTR platform will call with the request result
     */
    callbackURL: string;
};
/**
 * authentication creates an authentication request URL for DID Authentication with your MATTR tenant. The resulting
 * URL is intended to be used to redirect the user.
 *
 * As a result, MATTR platform calls supplied callback URL with the result that connects to your request by a supplied
 * Request ID.
 *
 * We return a monad @7urtle/lambda.AsyncEffect as the output of the function: https://www.7urtle.com/documentation-7urtle-lambda#lambda-AsyncEffect
 *
 * @pure
 * @HindleyMilner authentication :: AuthenticationPayload -> AsyncEffect
 * @param {AuthenticationPayload} payload
 * @returns {AsyncEffect}
 * @example
 * import { authentication } from 'didauth';
 *
 * const payload = {
 *     clientId: 'client id',
 *     clientSecret: 'client secret',
 *     tenant: 'your-tenant.vii.mattr.global',
 *     did: 'did:method:code',
 *     requestId: 'your-request-id',
 *     templateId: 'presentation template id',
 *     callbackURL: 'https://your-domain.tld/didauth/callback'
 * };
 *
 * authentication(payload)
 * .trigger
 * (errors => console.log(errors) || ({
 *     statusCode: 500,
 *     body: 'Internal Server Error'
 * }))
 * (JWSURL => ({
 *     statusCode: 301,
 *     headers: {
 *         locations: JWSURL
 *     }
 * }));
 */
export function authentication(payload: AuthenticationPayload): any;
/**
 * @typedef {object} AuthenticationPayload
 * @property {string} clientId ID provided as part of MATTR platform onboarding
 * @property {string} clientSecret Secret provided as part of MATTR platform onboarding
 * @property {string} tenant Your MATTR tenant
 * @property {string} did Verifier DID representing your application
 * @property {string} requestId Request ID used by your app to tie together the request and the callback response
 * @property {string} templateId Authentication presentation template ID
 * @property {string} callbackURL Callback URL that MATTR platform will call with the request result
 */
/**
 * validatePayload validates payload required for the authentication function. It returns
 * a Failure with an array of validation error messages or a Success with the original payload.
 *
 * @pure
 * @HindleyMilner validatePayload :: AuthenticationPayload -> Either
 * @param {AuthenticationPayload} payload
 * @returns {Either}
 */
export function validatePayload(payload: AuthenticationPayload): any;
/**
 * @typedef {object} FullAuthenticationRequest
 * @property {string} tenant Your MATTR tenant
 * @property {string} accessToken MATTR platform access token string
 * @property {string} did Verifier DID representing your application
 * @property {string} requestId Request ID used by your app to tie together the request and the callback response
 * @property {string} templateId Authentication presentation template ID
 * @property {string} callbackURL Callback URL that MATTR platform will call with the request result
 */
/**
 * getPresentationRequestAndDID creates merged AsyncEffect that can create a presentation request
 * and read DID in parallel.
 *
 * @pure
 * @HindleyMilner getPresentationRequestAndDID :: FullAuthenticationRequest -> AsyncEffect
 * @param {FullAuthenticationRequest} request
 * @returns {AsyncEffect}
 */
export function getPresentationRequestAndDID(request: FullAuthenticationRequest): any;
/**
 * getJWS creates a JWS URL by signing authentication presentation request for a verifier DID.
 *
 * @pure
 * @HindleyMilner getJWSURL :: FullAuthenticationRequest -> AsyncEffect
 * @param {FullAuthenticationRequest} request
 * @returns {AsyncEffect}
 */
export function getJWS(request: FullAuthenticationRequest): any;
/**
 * getJWSURL creates JWS url from JWS
 *
 * @pure
 * @HindleyMilner getJWSURL :: {tenant: string, jws: string} -> string
 * @param {{tenant: string, jws: string}} payload
 * @returns {string}
 */
export function getJWSURL(payload: {
    tenant: string;
    jws: string;
}): string;

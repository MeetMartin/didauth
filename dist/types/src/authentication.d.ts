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
     * Challenge ID used by your app to tie together the request and the callback response
     */
    challengeId: string;
    /**
     * Authentication presentation template ID
     */
    templateId: string;
    /**
     * Callback URL that MATTR platform will call with the request result
     */
    callbackURL: string;
};
export type FullAuthenticationPayload = {
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
     * Challenge ID used by your app to tie together the request and the callback response
     */
    challengeId: string;
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
 * Challenge ID.
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
 *     challengeId: 'your-challenge-id',
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
 * getJWS creates a JWS URL by signing authentication presentation request for a verifier DID.
 *
 * @pure
 * @HindleyMilner getJWSURL :: FullAuthenticationPayload -> AsyncEffect
 * @param {FullAuthenticationPayload} payload
 * @returns {AsyncEffect}
 */
export function getJWS(payload: FullAuthenticationPayload): any;
/**
 * @typedef {object} AuthenticationPayload
 * @property {string} clientId ID provided as part of MATTR platform onboarding
 * @property {string} clientSecret Secret provided as part of MATTR platform onboarding
 * @property {string} tenant Your MATTR tenant
 * @property {string} did Verifier DID representing your application
 * @property {string} challengeId Challenge ID used by your app to tie together the request and the callback response
 * @property {string} templateId Authentication presentation template ID
 * @property {string} callbackURL Callback URL that MATTR platform will call with the request result
 */
/**
 * @typedef {object} FullAuthenticationPayload
 * @property {string} tenant Your MATTR tenant
 * @property {string} accessToken MATTR platform access token string
 * @property {string} did Verifier DID representing your application
 * @property {string} challengeId Challenge ID used by your app to tie together the request and the callback response
 * @property {string} templateId Authentication presentation template ID
 * @property {string} callbackURL Callback URL that MATTR platform will call with the request result
 */
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

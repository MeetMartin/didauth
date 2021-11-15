export type PushAuthenticationPayload = {
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
     * Verifier DID representing your application,
     */
    did: string;
    /**
     * User's DID stored by your application
     */
    recipientDid: string;
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
export type FullPushAuthenticationPayload = {
    /**
     * Your MATTR tenant
     */
    tenant: string;
    /**
     * MATTR platform access token string
     */
    accessToken: string;
    /**
     * Verifier DID representing your application,
     */
    did: string;
    /**
     * User's DID stored by your application
     */
    recipientDid: string;
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
 * pushAuthentication creates an authentication digital wallet push request for DID Authentication with your MATTR tenant. It uses the recipientDID
 * stored in your system to find the user's digital wallet and ask them for authentication through a push request on their phone.
 *
 * As a result, MATTR platform calls supplied callback URL with the result that connects to your request by a supplied
 * Challenge ID.
 *
 * We return a monad @7urtle/lambda.AsyncEffect as the output of the function: https://www.7urtle.com/documentation-7urtle-lambda#lambda-AsyncEffect
 *
 * @pure
 * @HindleyMilner pushAuthentication :: PushAuthenticationPayload -> AsyncEffect
 * @param {PushAuthenticationPayload} payload
 * @returns {AsyncEffect}
 * @example
 * import { pushAuthentication } from 'didauth';
 *
 * const payload = {
 *     clientId: 'client id',
 *     clientSecret: 'client secret',
 *     tenant: 'your-tenant.vii.mattr.global',
 *     did: 'did:method:code',
 *     recipientDid: 'did:method:code',
 *     challengeId: 'your-challenge-id',
 *     templateId: 'presentation template id',
 *     callbackURL: 'https://your-domain.tld/didauth/callback'
 * };
 *
 * pushAuthentication(payload)
 * .trigger
 * (errors => console.log(errors) || ({
 *     statusCode: 500,
 *     body: 'Internal Server Error'
 * }))
 * (() => ({
 *     statusCode: 204
 * }));
 */
export function pushAuthentication(payload: PushAuthenticationPayload): any;
/**
 * @typedef {object} PushAuthenticationPayload
 * @property {string} clientId ID provided as part of MATTR platform onboarding
 * @property {string} clientSecret Secret provided as part of MATTR platform onboarding
 * @property {string} tenant Your MATTR tenant
 * @property {string} did Verifier DID representing your application,
 * @property {string} recipientDid User's DID stored by your application
 * @property {string} challengeId Challenge ID used by your app to tie together the request and the callback response
 * @property {string} templateId Authentication presentation template ID
 * @property {string} callbackURL Callback URL that MATTR platform will call with the request result
 */
/**
 * @typedef {object} FullPushAuthenticationPayload
 * @property {string} tenant Your MATTR tenant
 * @property {string} accessToken MATTR platform access token string
 * @property {string} did Verifier DID representing your application,
 * @property {string} recipientDid User's DID stored by your application
 * @property {string} challengeId Challenge ID used by your app to tie together the request and the callback response
 * @property {string} templateId Authentication presentation template ID
 * @property {string} callbackURL Callback URL that MATTR platform will call with the request result
 */
/**
 * createPushRequest creates an authentication that is sent to a digital wallet
 *
 * @pure
 * @HindleyMilner createPushRequest :: FullPushAuthenticationPayload -> AsyncEffect
 * @param {FullPushAuthenticationPayload} payload
 * @returns {AsyncEffect}
 */
export function createPushRequest(payload: FullPushAuthenticationPayload): any;

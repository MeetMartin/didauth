export type RequestAccessTokenPayload = {
    /**
     * ID provided as part of MATTR platform onboarding
     */
    clientId: string;
    /**
     * Secret provided as part of MATTR platform onboarding
     */
    clientSecret: string;
};
/**
 * @typedef {object} RequestAccessTokenPayload
 * @property {string} clientId ID provided as part of MATTR platform onboarding
 * @property {string} clientSecret Secret provided as part of MATTR platform onboarding
 */
/**
 * requestAccessToken calls a MATTR uthorization endpoint for gaining token used for API requests requiring bearerAuth.
 *
 * Uses https://auth.mattr.global/oauth/token.
 *
 * @pure
 * @HindleyMilner requestAccessToken :: RequestAccessTokenPayload -> AsyncEffect
 * @param {RequestAccessTokenPayload} payload
 * @returns {AsyncEffect}
 */
export function requestAccessToken(payload: RequestAccessTokenPayload): any;

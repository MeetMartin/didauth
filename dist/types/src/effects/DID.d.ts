export type ReadDIDPayload = {
    /**
     * MATTR tenant
     */
    tenant: string;
    /**
     * MATTR platform access token string
     */
    accessToken: string;
    /**
     * Decentralized Identifier under W3C standard
     */
    did: string;
};
/**
 * @typedef {object} ReadDIDPayload
 * @property {string} tenant MATTR tenant
 * @property {string} accessToken MATTR platform access token string
 * @property {string} did Decentralized Identifier under W3C standard
 */
/**
 * readDID resolves a DID. When the DID is retrieved by the DID provided in the request, the DID Document is also attempted
 * to be resolved by using the DID method and method identifier.
 *
 * Uses /v1/dids/{did}.
 *
 * @pure
 * @HindleyMilner readDID :: ReadDIDPayload -> AsyncEffect
 * @param {ReadDIDPayload} payload
 * @returns {AsyncEffect}
 */
export function readDID(payload: ReadDIDPayload): any;

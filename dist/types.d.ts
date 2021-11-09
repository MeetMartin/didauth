declare type AuthenticationPayload = {
    clientId: string;
    clientSecret: string;
    tenant: string;
    did: string;
    accessToken: string;
};

declare function validatePayload(payload: any, payload: any): void;

declare function authentication(payload: AuthenticationPayload): AsyncEffect;

declare type RequestAccessTokenPayload = {
    clientId: string;
    clientSecret: string;
};

declare function requestAccessToken(payload: RequestAccessTokenPayload): AsyncEffect;

declare type ReadDIDPayload = {
    tenant: string;
    did: string;
    accessToken: string;
};

declare function readDID(payload: ReadDIDPayload): AsyncEffect;

declare type MATTRError = {
    response: any;
};

/**
 * formatError tkaes MATTRError returned by the MATTR platform and formats it
into an error string.
 */
declare function formatError(error: MATTRError): string;

/**
 * validatePayloadKey validates that key withing a payload is a string that is not Nothing.

On success it returns Success with the original payload.

On failure it returns Failure with an error message.
 * @example
 * validatePayloadKey({key: 'string'})('key');
// => Success({key: 'string'})

validatePayloadKey({key: 'string'})('fake');
// => Failure('payload.fake is Nothing or not a string')
 */
declare function validatePayloadKey(payload: any): (...params: any[]) => any;


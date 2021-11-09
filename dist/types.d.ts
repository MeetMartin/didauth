declare type AuthenticationPayload = {
    clientId: string;
    clientSecret: string;
    tenant: string;
    did: string;
    requestId: string;
    templateId: string;
    presentationCallbackURL: string;
};

declare function validatePayload(payload: AuthenticationPayload): any;

declare type FullAuthenticationRequest = {
    tenant: string;
    accessToken: string;
    did: string;
    requestId: string;
    templateId: string;
    presentationCallbackURL: string;
};

declare function getPresentationRequestAndDID(request: FullAuthenticationRequest): any;

declare function getJWS(request: FullAuthenticationRequest): any;

declare function authentication(payload: AuthenticationPayload): any;

declare type RequestAccessTokenPayload = {
    clientId: string;
    clientSecret: string;
};

declare function requestAccessToken(payload: RequestAccessTokenPayload): any;

declare type ReadDIDPayload = {
    tenant: string;
    did: string;
    accessToken: string;
};

declare function readDID(payload: ReadDIDPayload): any;

declare type CreatePresentationRequestPayload = {
    tenant: string;
    accessToken: string;
    requestId: string;
    did: string;
    templateId: string;
    presentationCallbackURL: string;
};

declare function createPresentationRequest(payload: CreatePresentationRequestPayload): any;

declare type MATTRError = {
    response: any;
};

/**
 * formatError tkaes MATTRError returned by the MATTR platform and formats it
into an error string.
 */
declare function formatError(error: MATTRError): string;

declare type validatePayloadKeyHOF = (key: string) => any;

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
declare function validatePayloadKey(payload: any): validatePayloadKeyHOF;


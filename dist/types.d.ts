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

declare function formatError(error: MATTRError): string;


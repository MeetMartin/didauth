declare type AccessTokenRequest = {
    clientId: string;
    clientSecret: string;
};

declare function requestAccessToken(payload: AccessTokenRequest): AsyncEffect;

declare type MATTRError = {
    response: any;
};

declare function formatError(error: MATTRError): string;


// @ts-check

// @ts-ignore
import { isJust, isString, compose, map, flatMap } from '@7urtle/lambda';

import { requestAccessToken } from '../../src/effects/AccessToken';
import { createJWS, createJWE, sendMessage } from '../../src/effects/Messaging';

const helpCreateJWS = payload =>
    compose(
        flatMap(token => createJWS({
            tenant: payload.tenant,
            accessToken: token,
            didUrl: payload.didUrl,
            request: payload.request
        })),
        map(response => response.data.access_token),
        () => requestAccessToken({
            clientId: process.env.MATTR_CLIENT_ID,
            clientSecret: process.env.MATTR_CLIENT_SECRET
        })
    )();

const helpCreateJWE = payload =>
    compose(
        flatMap(token => createJWE({
            tenant: payload.tenant,
            accessToken: token,
            didUrl: payload.didUrl,
            recipientDids: payload.recipientDids,
            request: payload.request
        })),
        map(response => response.data.access_token),
        () => requestAccessToken({
            clientId: process.env.MATTR_CLIENT_ID,
            clientSecret: process.env.MATTR_CLIENT_SECRET
        })
    )();

const helpSendMessage = payload =>
    compose(
        flatMap(token => sendMessage({
            tenant: payload.tenant,
            accessToken: token,
            recipientDid: payload.recipientDid,
            message: payload.message
        })),
        map(response => response.data.access_token),
        () => requestAccessToken({
            clientId: process.env.MATTR_CLIENT_ID,
            clientSecret: process.env.MATTR_CLIENT_SECRET
        })
    )();

const helpCreateJWEAndSendMessage = () =>
    compose(
        flatMap(token =>
            compose(
                flatMap(jwe => sendMessage({
                    tenant: process.env.MATTR_TENANT,
                    accessToken: token,
                    recipientDid: process.env.RECIPIENT_DID,
                    message: jwe
                })),
                map(response => response.data.jwe),
                token => createJWE({
                    tenant: process.env.MATTR_TENANT,
                    accessToken: token,
                    didUrl: process.env.VERIFIER_DID_JWE_URL,
                    recipientDids: [ process.env.RECIPIENT_DID ],
                    request: { msg: 'this is a message' }
                })
            )(token)
        ),
        map(response => response.data.access_token),
        () => requestAccessToken({
            clientId: process.env.MATTR_CLIENT_ID,
            clientSecret: process.env.MATTR_CLIENT_SECRET
        })
    )();

test('createJWS with invalid tenant fails with getaddrinfo error.', async () => {
    await createJWS({
        tenant: 'tenant',
        accessToken: 'token',
        didUrl: 'fake',
        request: { fake: 'fake' }
    })
    .trigger
    (error => {
        expect(error).toBe('Creating JWS: Error: getaddrinfo ENOTFOUND tenant.');
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('createJWS with invalid token fails with 401 error.', async () => {
    await createJWS({
        tenant: process.env.MATTR_TENANT,
        accessToken: 'token',
        didUrl: 'fake',
        request: { fake: 'fake' }
    })
    .trigger
    (error => {
        expect(error).toBe('Creating JWS: Error: Request failed with status code 401.');
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('createJWS with invalid inputs fails with 400 error.', async () => {
    await helpCreateJWS({
        tenant: process.env.MATTR_TENANT,
        didUrl: 'fake',
        request: { fake: 'fake' }
    })
    .trigger
    (error => {
        expect(error).toBe("Creating JWS: Error: Request failed with status code 400. Validation Error. [{value: 'fake', msg: 'must be a valid DID url', param: 'didUrl', location: 'body'}].");
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('createJWS with valid inputs returns presentation request.', async () => {
    await helpCreateJWS({
        tenant: process.env.MATTR_TENANT,
        didUrl: process.env.VERIFIER_DID_JWS_URL,
        request: { msg: 'this is a message' }
    })
    .trigger
    (error => {
        throw new Error(error);
    })
    (response => {
        const request = response.data;
        expect(isJust(request) && isString(request)).toBe(true);
        return response;
    });
});
    
test('createJWE with invalid tenant fails with getaddrinfo error.', async () => {
    await createJWE({
        tenant: 'tenant',
        accessToken: 'token',
        didUrl: 'fake',
        recipientDids: ['fake'],
        request: { fake: 'fake' }
    })
    .trigger
    (error => {
        expect(error).toBe('Creating JWE: Error: getaddrinfo ENOTFOUND tenant.');
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('createJWE with invalid token fails with 401 error.', async () => {
    await createJWE({
        tenant: process.env.MATTR_TENANT,
        accessToken: 'token',
        didUrl: 'fake',
        recipientDids: ['fake'],
        request: { fake: 'fake' }
    })
    .trigger
    (error => {
        expect(error).toBe('Creating JWE: Error: Request failed with status code 401.');
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('createJWE with invalid inputs fails with 400 error.', async () => {
    await helpCreateJWE({
        tenant: process.env.MATTR_TENANT,
        didUrl: 'fake',
        recipientDids: ['fake'],
        request: { fake: 'fake' }
    })
    .trigger
    (error => {
        expect(error).toBe("Creating JWE: Error: Request failed with status code 400. Validation Error. [{value: 'fake', msg: 'must be a valid DID url', param: 'senderDidUrl', location: 'body'}, {value: 'fake', msg: 'must be a valid DID or DID url', param: 'recipientDidUrls[0]', location: 'body'}].");
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('createJWE with valid inputs returns presentation request.', async () => {
    await helpCreateJWE({
        tenant: process.env.MATTR_TENANT,
        didUrl: process.env.VERIFIER_DID_JWE_URL,
        recipientDids: [ process.env.RECIPIENT_DID ],
        request: { msg: 'this is a message' }
    })
    .trigger
    (error => {
        throw new Error(error);
    })
    (response => {
        const JWE = response.data?.jwe?.protected;
        expect(isJust(JWE) && isString(JWE)).toBe(true);
        return response;
    });
});

test('sendMessage with invalid tenant fails with getaddrinfo error.', async () => {
    await sendMessage({
        tenant: 'tenant',
        accessToken: 'token',
        recipientDid: 'fake',
        message: { fake: 'fake' }
    })
    .trigger
    (error => {
        expect(error).toBe('Sending Message: Error: getaddrinfo ENOTFOUND tenant.');
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('sendMessage with invalid token fails with 401 error.', async () => {
    await sendMessage({
        tenant: process.env.MATTR_TENANT,
        accessToken: 'token',
        recipientDid: 'fake',
        message: { fake: 'fake' }
    })
    .trigger
    (error => {
        expect(error).toBe('Sending Message: Error: Request failed with status code 401.');
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('sendMessage with invalid inputs fails with 400 error.', async () => {
    await helpSendMessage({
        tenant: process.env.MATTR_TENANT,
        recipientDid: 'fake',
        message: { fake: 'fake' }
    })
    .trigger
    (error => {
        expect(error).toBe("Sending Message: Error: Request failed with status code 400. Validation Error. [{value: 'fake', msg: 'Invalid value', param: 'to', location: 'body'}, {value: {fake: 'fake'}, msg: 'Not a valid JWE', param: 'message', location: 'body'}].");
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('sendMessage with valid inputs submits a message.', async () => {
    await helpCreateJWEAndSendMessage()
    .trigger
    (error => {
        throw new Error(error);
    })
    (response => {
        expect(response.status).toBe(200);
        return response;
    });
});
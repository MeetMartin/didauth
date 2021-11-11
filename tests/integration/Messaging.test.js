// @ts-check

// @ts-ignore
import { isJust, isString, compose, map, flatMap } from '@7urtle/lambda';

import { requestAccessToken } from '../../src/effects/AccessToken';
import { createJWS, createJWE } from '../../src/effects/Messaging';

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
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
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
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
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
        tenant: process.env.TENANT,
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
        tenant: process.env.TENANT,
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
        tenant: process.env.TENANT,
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
        tenant: process.env.TENANT,
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
        tenant: process.env.TENANT,
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
        tenant: process.env.TENANT,
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
// @ts-check

// @ts-ignore
import { isJust, isString, compose, map, flatMap } from '@7urtle/lambda';

import { requestAccessToken } from '../../src/effects/AccessToken';
import { createDID, readDID } from '../../src/effects/DID';

const helpCreateDID = payload =>
    compose(
        flatMap(token => createDID({
            tenant: payload.tenant,
            accessToken: token,
            method: payload.method,
            options: payload.options
        })),
        map(response => response.data.access_token),
        () => requestAccessToken({
            clientId: process.env.MATTR_CLIENT_ID,
            clientSecret: process.env.MATTR_CLIENT_SECRET
        })
    )();

const helpReadDID = tenant => did =>
    compose(
        flatMap(token => readDID({
            tenant: tenant,
            did: did,
            accessToken: token
        })),
        map(response => response.data.access_token),
        () => requestAccessToken({
            clientId: process.env.MATTR_CLIENT_ID,
            clientSecret: process.env.MATTR_CLIENT_SECRET
        })
    )();

test('createDID with invalid tenant fails with getaddrinfo error.', async () => {
    await createDID({
        tenant: 'tenant',
        accessToken: 'token'
    })
    .trigger
    (error => {
        expect(error).toBe('Creating DID: Error: getaddrinfo ENOTFOUND tenant.');
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('createDID with invalid token fails with 401 error.', async () => {
    await createDID({
        tenant: process.env.MATTR_TENANT,
        accessToken: 'token'
    })
    .trigger
    (error => {
        expect(error).toBe('Creating DID: Error: Request failed with status code 401.');
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('createDID with valid input returns DID key document.', async () => {
    await helpCreateDID({tenant: process.env.MATTR_TENANT})
    .trigger
    (error => {
        throw new Error(error);
    })
    (response => {
        const did = response.data?.did;
        expect(did.startsWith('did:key')).toBe(true);
        return response;
    });
});

test('createDID with valid input including method and options returns DID document.', async () => {
    await helpCreateDID({
        tenant: process.env.MATTR_TENANT,
        method: 'key',
        options: {
            keyType: 'ed25519'
        }
    })
    .trigger
    (error => {
        throw new Error(error);
    })
    (response => {
        const did = response.data?.did;
        expect(did.startsWith('did:key')).toBe(true);
        return response;
    });
});

test('readDID with invalid tenant fails with getaddrinfo error.', async () => {
    await readDID({
        tenant: 'tenant',
        did: 'did',
        accessToken: 'token'
    })
    .trigger
    (error => {
        expect(error).toBe('Reading DID: Error: getaddrinfo ENOTFOUND tenant.');
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('readDID with invalid token fails with 401 error.', async () => {
    await readDID({
        tenant: process.env.MATTR_TENANT,
        did: 'did',
        accessToken: 'token'
    })
    .trigger
    (error => {
        expect(error).toBe('Reading DID: Error: Request failed with status code 401.');
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('readDID with invalid did fails with 404 error.', async () => {
    await helpReadDID(process.env.MATTR_TENANT)('did:key:code')
    .trigger
    (error => {
        expect(error).toBe('Reading DID: Error: Request failed with status code 404. Resource Not Found.');
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('readDID with valid credentials returns access token.', async () => {
    await helpReadDID(process.env.MATTR_TENANT)(process.env.VERIFIER_DID)
    .trigger
    (error => {
        throw new Error(error);
    })
    (response => {
        const didUrl = response.data?.didDocument?.authentication[0];
        expect(isJust(didUrl) && isString(didUrl)).toBe(true);
        return response;
    });
});
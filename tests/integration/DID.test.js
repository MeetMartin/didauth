// @ts-check

// @ts-ignore
import { isJust, isString, compose, map, flatMap } from '@7urtle/lambda';

import { requestAccessToken } from '../../src/effects/AccessToken';
import { readDID } from '../../src/effects/DID';

const helpReadDID = tenant => did =>
    compose(
        flatMap(token => readDID({
            tenant: tenant,
            did: did,
            accessToken: token
        })),
        map(response => response.data.access_token),
        () => requestAccessToken({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        })
    )();

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
        tenant: process.env.TENANT,
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
    await helpReadDID(process.env.TENANT)('did:key:code')
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
    await helpReadDID(process.env.TENANT)(process.env.VERIFIER_DID)
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
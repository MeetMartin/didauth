// @ts-check

// @ts-ignore
import { isJust, isObject, compose, map, flatMap } from '@7urtle/lambda';
import { v4 as uuidv4 } from 'uuid';

import { requestAccessToken } from '../../src/effects/AccessToken';
import { createPresentationRequest } from '../../src/effects/Presentation';

const helpCreatePresentationRequest = payload =>
    compose(
        flatMap(token => createPresentationRequest({
            tenant: payload.tenant,
            accessToken: token,
            requestId: payload.requestId,
            did: payload.did,
            templateId: payload.templateId,
            callbackURL: payload.callbackURL
        })),
        map(response => response.data.access_token),
        () => requestAccessToken({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        })
    )();

test('createPresentationRequest with invalid tenant fails with getaddrinfo error.', async () => {
    await createPresentationRequest({
        tenant: 'tenant',
        accessToken: 'token',
        requestId: 'id',
        did: 'did:key:code',
        templateId: 'id',
        callbackURL: 'url'
    })
    .trigger
    (error => {
        expect(error).toBe('Creating Presentation Request: Error: getaddrinfo ENOTFOUND tenant.');
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('createPresentationRequest with invalid token fails with 401 error.', async () => {
    await createPresentationRequest({
        tenant: process.env.TENANT,
        accessToken: 'token',
        requestId: 'id',
        did: 'fake',
        templateId: 'id',
        callbackURL: 'url'
    })
    .trigger
    (error => {
        expect(error).toBe('Creating Presentation Request: Error: Request failed with status code 401.');
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('createPresentationRequest with invalid inputs fails with 400 error.', async () => {
    await helpCreatePresentationRequest({
        tenant: process.env.TENANT,
        requestId: uuidv4(),
        did: 'fake',
        templateId: 'fake',
        callbackURL: 'fake'
    })
    .trigger
    (error => {
        expect(error).toBe("Creating Presentation Request: Error: Request failed with status code 400. Validation Error. [{value: 'fake', msg: 'Invalid value', param: 'templateId', location: 'body'}, {value: 'fake', msg: 'Not a valid DID', param: 'did', location: 'body'}, {value: 'fake', msg: 'Invalid value', param: 'callbackUrl', location: 'body'}].");
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('createPresentationRequest with valid inputs returns presentation request.', async () => {
    await helpCreatePresentationRequest({
        tenant: process.env.TENANT,
        requestId: uuidv4(),
        did: process.env.VERIFIER_DID,
        templateId: process.env.TEMPLATE_ID,
        callbackURL: process.env.CALLBACK_URL
    })
    .trigger
    (error => {
        throw new Error(error);
    })
    (response => {
        const request = response.data?.request;
        expect(isJust(request) && isObject(request)).toBe(true);
        return response;
    });
});
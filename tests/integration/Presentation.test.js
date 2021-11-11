// @ts-check

// @ts-ignore
import { isJust, isObject, isString, compose, map, flatMap } from '@7urtle/lambda';
import { v4 as uuidv4 } from 'uuid';

import { requestAccessToken } from '../../src/effects/AccessToken';
import { createPresentationTemplate, createPresentationRequest } from '../../src/effects/Presentation';

const helpCreatePresentationTemplate = payload =>
    compose(
        flatMap(token => createPresentationTemplate({
            tenant: payload.tenant,
            accessToken: token,
            name: payload.name,
            domain: payload.domain,
            query: payload.query
        })),
        map(response => response.data.access_token),
        () => requestAccessToken({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        })
    )();

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

test('createPresentationTemplate with invalid tenant fails with getaddrinfo error.', async () => {
    await createPresentationTemplate({
        tenant: 'tenant',
        accessToken: 'token'
    })
    .trigger
    (error => {
        expect(error).toBe('Creating Presentation Template: Error: getaddrinfo ENOTFOUND tenant.');
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('createPresentationTemplate with invalid token fails with 401 error.', async () => {
    await createPresentationTemplate({
        tenant: process.env.TENANT,
        accessToken: 'token'
    })
    .trigger
    (error => {
        expect(error).toBe('Creating Presentation Template: Error: Request failed with status code 401.');
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('createPresentationTemplate with valid inputs returns presentation template.', async () => {
    await helpCreatePresentationTemplate({
        tenant: process.env.TENANT,
        domain: process.env.DOMAIN
    })
    .trigger
    (error => {
        throw new Error(error);
    })
    (response => {
        const templateId = response.data?.id;
        expect(isJust(templateId) && isString(templateId)).toBe(true);
        return response;
    });
});

test('createPresentationTemplate with valid optional inputs returns presentation template.', async () => {
    await helpCreatePresentationTemplate({
        tenant: process.env.TENANT,
        domain: process.env.DOMAIN,
        name: uuidv4(),
        query: [{type: 'DIDAuth'}]
    })
    .trigger
    (error => {
        throw new Error(error);
    })
    (response => {
        const templateId = response.data?.id;
        expect(isJust(templateId) && isString(templateId)).toBe(true);
        return response;
    });
});

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

test('createPresentationRequest with valid optional inputs returns presentation request.', async () => {
    await helpCreatePresentationRequest({
        tenant: process.env.TENANT,
        requestId: uuidv4(),
        did: process.env.VERIFIER_DID,
        templateId: process.env.TEMPLATE_ID,
        callbackURL: process.env.CALLBACK_URL,
        expiresTime: Math.round((new Date()).getTime()) + 600000
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
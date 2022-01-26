// @ts-check

import { createPresentationTemplate, createPresentationRequest } from '../../src/effects/Presentation.js';

test('createPresentationTemplate returns AsyncEffect', async () => {
    expect(
        await createPresentationTemplate({
            tenant: 'tenant',
            accessToken: 'token'
        }).inspect().startsWith('AsyncEffect')
    )
    .toBe(true);
});

test('createPresentationTemplate called with no input returns error', async () => {
    // @ts-ignore
    await createPresentationTemplate()
    .trigger
    (error => {
        expect(error).toBe('createPresentationTemplate payload is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});

test('createPresentationTemplate called with payload without tenant returns error', async () => {
    // @ts-ignore
    await createPresentationTemplate({
        accessToken: 'token'
    })
    .trigger
    (error => {
        expect(error).toBe('createPresentationTemplate payload.tenant is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});

test('createPresentationTemplate called with payload without accessToken returns error', async () => {
    // @ts-ignore
    await createPresentationTemplate({
        tenant: 'tenant'
    })
    .trigger
    (error => {
        expect(error).toBe('createPresentationTemplate payload.accessToken is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});

test('createPresentationRequest returns AsyncEffect', async () => {
    expect(
        await createPresentationRequest({
            tenant: 'tenant',
            accessToken: 'token',
            challengeId: 'id',
            did: 'did:key:code',
            templateId: 'id',
            callbackURL: 'url'
        }).inspect().startsWith('AsyncEffect')
    )
    .toBe(true);
});

test('createPresentationRequest called with no input returns error', async () => {
    // @ts-ignore
    await createPresentationRequest()
    .trigger
    (error => {
        expect(error).toBe('createPresentationRequest payload is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});

test('createPresentationRequest called with payload without tenant returns error', async () => {
    // @ts-ignore
    await createPresentationRequest({
        accessToken: 'token',
        challengeId: 'id',
        did: 'did:key:code',
        templateId: 'id',
        callbackURL: 'url'
    })
    .trigger
    (error => {
        expect(error).toBe('createPresentationRequest payload.tenant is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});

test('createPresentationRequest called with payload without accessToken returns error', async () => {
    // @ts-ignore
    await createPresentationRequest({
        tenant: 'tenant',
        challengeId: 'id',
        did: 'did:key:code',
        templateId: 'id',
        callbackURL: 'url'
    })
    .trigger
    (error => {
        expect(error).toBe('createPresentationRequest payload.accessToken is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});

test('createPresentationRequest called with payload without challengeId returns error', async () => {
    // @ts-ignore
    await createPresentationRequest({
        tenant: 'tenant',
        accessToken: 'token',
        did: 'did:key:code',
        templateId: 'id',
        callbackURL: 'url'
    })
    .trigger
    (error => {
        expect(error).toBe('createPresentationRequest payload.challengeId is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});

test('createPresentationRequest called with payload without did returns error', async () => {
    // @ts-ignore
    await createPresentationRequest({
        tenant: 'tenant',
        accessToken: 'token',
        challengeId: 'id',
        templateId: 'id',
        callbackURL: 'url'
    })
    .trigger
    (error => {
        expect(error).toBe('createPresentationRequest payload.did is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});

test('createPresentationRequest called with payload without templateId returns error', async () => {
    // @ts-ignore
    await createPresentationRequest({
        tenant: 'tenant',
        accessToken: 'token',
        challengeId: 'id',
        did: 'did:key:code',
        callbackURL: 'url'
    })
    .trigger
    (error => {
        expect(error).toBe('createPresentationRequest payload.templateId is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});

test('createPresentationRequest called with payload without callbackURL returns error', async () => {
    // @ts-ignore
    await createPresentationRequest({
        tenant: 'tenant',
        accessToken: 'token',
        challengeId: 'id',
        did: 'did:key:code',
        templateId: 'id'
    })
    .trigger
    (error => {
        expect(error).toBe('createPresentationRequest payload.callbackURL is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});
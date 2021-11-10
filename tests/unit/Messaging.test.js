// @ts-check

import { createJWS } from '../../src/effects/Messaging';

test('createJWS returns AsyncEffect', async () => {
    expect(
        await createJWS({
            tenant: 'tenant',
            accessToken: 'token',
            didUrl: 'fake',
            request: { fake: 'fake' }
        }).inspect().startsWith('AsyncEffect')
    )
    .toBe(true);
});

test('createJWS called with no input returns error', async () => {
    // @ts-ignore
    await createJWS()
    .trigger
    (error => {
        expect(error).toBe('createJWS payload is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});

test('createJWS called with payload without tenant returns error', async () => {
    // @ts-ignore
    await createJWS({
        accessToken: 'token',
        didUrl: 'fake',
        request: { fake: 'fake' }
    })
    .trigger
    (error => {
        expect(error).toBe('createJWS payload.tenant is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});

test('createJWS called with payload without accessToken returns error', async () => {
    // @ts-ignore
    await createJWS({
        tenant: 'tenant',
        didUrl: 'fake',
        request: { fake: 'fake' }
    })
    .trigger
    (error => {
        expect(error).toBe('createJWS payload.accessToken is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});

test('createJWS called with payload without didUrl returns error', async () => {
    // @ts-ignore
    await createJWS({
        tenant: 'tenant',
        accessToken: 'token',
        request: { fake: 'fake' }
    })
    .trigger
    (error => {
        expect(error).toBe('createJWS payload.didUrl is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});

test('createJWS called with payload without request returns error', async () => {
    // @ts-ignore
    await createJWS({
        tenant: 'tenant',
        accessToken: 'token',
        didUrl: 'fake'
    })
    .trigger
    (error => {
        expect(error).toBe('createJWS payload.request is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});
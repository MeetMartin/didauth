// @ts-check

import { requestAccessToken } from '../../src/effects/AccessToken'

test('requestAccessToken returns AsyncEffect', () => {
    expect(requestAccessToken({clientId: 'id', clientSecret: 'secret'}).inspect().startsWith('AsyncEffect')).toBe(true);
});

test('requestAccessToken called with no input returns error', async () => {
    // @ts-ignore
    await requestAccessToken()
    .trigger
    (error => {
        expect(error).toBe('requestAccessToken payload is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});

test('requestAccessToken called with payload without clientId returns error', async () => {
    // @ts-ignore
    await requestAccessToken({clientSecret: 'secret'})
    .trigger
    (error => {
        expect(error).toBe('requestAccessToken payload.clientId is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});


test('requestAccessToken called with payload without clientSecret returns error', async () => {
    // @ts-ignore
    await requestAccessToken({clientId: 'id'})
    .trigger
    (error => {
        expect(error).toBe('requestAccessToken payload.clientSecret is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});
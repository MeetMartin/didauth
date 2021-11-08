// @ts-check

import { requestAccessToken } from '../../src/effects/AccessToken'

test('requestAccessToken returns AsyncEffect', () => {
    expect(requestAccessToken({clientId: 'id', clientSecret: 'secret'}).inspect().startsWith('AsyncEffect')).toBe(true);
});

test('requestAccessToken called with no input returns error', done => {
    // @ts-ignore
    requestAccessToken()
    .trigger
    (error => {
        expect(error).toBe('requestAccessToken payload is Nothing.');
        done();
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});

test('requestAccessToken called with payload without clientId returns error', done => {
    // @ts-ignore
    requestAccessToken({clientSecret: 'secret'})
    .trigger
    (error => {
        expect(error).toBe('requestAccessToken payload.clientId is Nothing.');
        done();
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});


test('requestAccessToken called with payload without clientSecret returns error', done => {
    // @ts-ignore
    requestAccessToken({clientId: 'id'})
    .trigger
    (error => {
        expect(error).toBe('requestAccessToken payload.clientSecret is Nothing.');
        done();
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});
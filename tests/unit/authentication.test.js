// @ts-check

import { authentication, getJWS, getJWSURL } from '../../src/authentication';

test('authentication returns AsyncEffect.', async () => {
    expect(
        await authentication({
            clientId: 'client id',
            clientSecret: 'client secret',
            tenant: 'your-tenant.vii.mattr.global',
            did: 'did:method:code',
            challengeId: 'your-challenge-id',
            templateId: 'presentation template id',
            callbackURL: 'https://your-domain.tld/didauth/callback'
        }).inspect().startsWith('AsyncEffect')
    )
    .toBe(true);
});

test('getJWS returns AsyncEffect.', () => {
    expect(getJWS({
        tenant: 'your-tenant.vii.mattr.global',
        accessToken: 'token',
        did: 'did:method:code',
        challengeId: 'your-challenge-id',
        templateId: 'presentation template id',
        callbackURL: 'https://your-domain.tld/didauth/callback'
    }).inspect().startsWith('AsyncEffect'))
    .toBe(true);
});

test('getJWSURL returns AsyncEffect.', () => {
    expect(getJWSURL({
        tenant: 'your-tenant.vii.mattr.global',
        jws: 'jws'
    }))
    .toBe('https://your-tenant.vii.mattr.global/?request=jws');
});
// @ts-check

import { authentication, pushAuthentication } from '../../src/index';

test('authentication returns AsyncEffect.', async () => {
    expect(
        await authentication({
            clientId: 'client id',
            clientSecret: 'client secret',
            tenant: 'your-tenant.vii.mattr.global',
            did: 'did:method:code',
            requestId: 'your-request-id',
            templateId: 'presentation template id',
            callbackURL: 'https://your-domain.tld/didauth/callback'
        }).inspect().startsWith('AsyncEffect')
    )
    .toBe(true);
});

test('pushAuthentication returns AsyncEffect.', async () => {
    expect(
        await pushAuthentication({
            clientId: 'client id',
            clientSecret: 'client secret',
            tenant: 'your-tenant.vii.mattr.global',
            did: 'did:method:code',
            recipientDid: 'did:method:code',
            requestId: 'your-request-id',
            templateId: 'presentation template id',
            callbackURL: 'https://your-domain.tld/didauth/callback'
        }).inspect().startsWith('AsyncEffect')
    )
    .toBe(true);
});
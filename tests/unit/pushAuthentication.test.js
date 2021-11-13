// @ts-check

import { pushAuthentication, createPushRequest } from '../../src/pushAuthentication';

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

test('createPushRequest returns AsyncEffect.', () => {
    expect(createPushRequest({
        tenant: 'your-tenant.vii.mattr.global',
        accessToken: 'token',
        did: 'did:method:code',
        requestId: 'your-request-id',
        recipientDid: 'did:method:code',
        templateId: 'presentation template id',
        callbackURL: 'https://your-domain.tld/didauth/callback'
    }).inspect().startsWith('AsyncEffect'))
    .toBe(true);
});
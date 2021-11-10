// @ts-check

import { v4 as uuidv4 } from 'uuid';

import { authentication } from '../../src/authentication';

test('authentication returns JWS url when triggered.', async () => {
    await authentication({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        tenant: process.env.TENANT,
        did: process.env.VERIFIER_DID,
        requestId: uuidv4(),
        templateId: process.env.TEMPLATE_ID,
        callbackURL: process.env.CALLBACK_URL
    })
    .trigger
    (error => {
        throw new Error(error);
    })
    (JWSURL => {
        expect(
            JWSURL.startsWith(`https://${process.env.TENANT}/?request=`) &&
            JWSURL.length > (`https://${process.env.TENANT}/?request=`.length + 1)
        ).toBe(true)
    })
});
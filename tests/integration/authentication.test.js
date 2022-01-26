// @ts-check

import { v4 as uuidv4 } from 'uuid';

import { authentication } from '../../src/authentication.js';

test('authentication returns JWS url when triggered.', async () => {
    await authentication({
        clientId: process.env.MATTR_CLIENT_ID,
        clientSecret: process.env.MATTR_CLIENT_SECRET,
        tenant: process.env.MATTR_TENANT,
        did: process.env.VERIFIER_DID,
        challengeId: uuidv4(),
        templateId: process.env.PRESENTATION_TEMPLATE_ID,
        callbackURL: process.env.DIDAUTH_CALLBACK_URL
    })
    .trigger
    (error => {
        throw new Error(error);
    })
    (JWSURL => {
        expect(
            JWSURL.startsWith(`https://${process.env.MATTR_TENANT}/?request=`) &&
            JWSURL.length > (`https://${process.env.MATTR_TENANT}/?request=`.length + 1)
        ).toBe(true)
    })
});

test('authentication with ivalid payload triggers validation error.', async () => {
    // @ts-ignore
    await authentication({ fake: 'fake' })
    .trigger
    (error => {
        expect(error).toEqual(["payload.clientId is Nothing or not a string.", "payload.clientSecret is Nothing or not a string.", "payload.tenant is Nothing or not a string.", "payload.did is Nothing or not a string.", "payload.challengeId is Nothing or not a string.", "payload.templateId is Nothing or not a string.", "payload.callbackURL is Nothing or not a string."]);
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    })
});
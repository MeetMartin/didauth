// @ts-check

import { v4 as uuidv4 } from 'uuid';

import { authentication } from '../../src/authentication';

test('authentication returns JWS url when triggered.', async () => {
    await authentication({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        tenant: process.env.TENANT,
        did: process.env.VERIFIER_DID,
        challengeId: uuidv4(),
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
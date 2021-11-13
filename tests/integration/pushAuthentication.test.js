// @ts-check

import { v4 as uuidv4 } from 'uuid';

import { pushAuthentication } from '../../src/pushAuthentication';

test('pushAuthentication returns 200 when triggered.', async () => {
    await pushAuthentication({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        tenant: process.env.TENANT,
        did: process.env.VERIFIER_DID,
        recipientDid: process.env.RECIPIENT_DID,
        requestId: uuidv4(),
        templateId: process.env.TEMPLATE_ID,
        callbackURL: process.env.CALLBACK_URL
    })
    .trigger
    (error => {
        throw new Error(error);
    })
    (response => {
        expect(response.status).toBe(200);
        return response;
    })
});

test('pushAuthentication with ivalid payload triggers validation error.', async () => {
    // @ts-ignore
    await pushAuthentication({ fake: 'fake' })
    .trigger
    (error => {
        expect(error).toEqual(["payload.clientId is Nothing or not a string.", "payload.clientSecret is Nothing or not a string.", "payload.tenant is Nothing or not a string.", "payload.did is Nothing or not a string.", "payload.recipientDid is Nothing or not a string.", "payload.requestId is Nothing or not a string.", "payload.templateId is Nothing or not a string.", "payload.callbackURL is Nothing or not a string."]);
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    })
});
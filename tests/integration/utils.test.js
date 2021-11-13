// @ts-check

// @ts-ignore
import { compose, map, flatMap, isObject, isString, isJust } from '@7urtle/lambda';
import { v4 as uuidv4 } from 'uuid';

import { requestAccessToken } from '../../src/effects/AccessToken';
import { getPresentationRequestAndDID } from '../../src/utils';

const helpGetPresentationRequestAndDID = () =>
    compose(
        map(responses => ({request: responses[0].data?.request, didUrl: responses[1].data?.didDocument?.keyAgreement[0]?.id})),
        flatMap(token => getPresentationRequestAndDID({
            tenant: process.env.TENANT,
            accessToken: token,
            did: process.env.VERIFIER_DID,
            requestId: uuidv4(),
            templateId: process.env.TEMPLATE_ID,
            callbackURL: process.env.CALLBACK_URL
        })),
        map(response => response.data.access_token),
        () => requestAccessToken({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        })
    )();

test('getPresentationRequestAndDID returns presentation request and verifier DID.', async () => {
    await helpGetPresentationRequestAndDID()
    .trigger
    (error => {
        throw new Error(error);
    })
    (result => {
        expect(
            isJust(result.request) && isObject(result.request) &&
            isJust(result.didUrl) && isString(result.didUrl)
        ).toBe(true);
        return result;
    })
});
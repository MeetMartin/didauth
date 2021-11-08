// @ts-check

// @ts-ignore
import { isJust, isString } from '@7urtle/lambda';

import { requestAccessToken } from '../../src/effects/AccessToken'

test('requestAccessToken with invalid credentials fails with error.', async () => {
    await requestAccessToken({
        clientId: 'fake id',
        clientSecret: 'fake secret'}
    )
    .trigger
    (error => {
        expect(error).toBe('Requesting MATTR Acccess Token: Error: Request failed with status code 401.');
        return error;
    })
    (response => {
        throw new Error(`I should not succeed with response: "${response}"`);
    });
});

test('requestAccessToken with valid credentials returns access token.', async () => {
    await requestAccessToken({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET}
    )
    .trigger
    (error => {
        throw new Error(error);
    })
    (response => {
        const token = response.data?.access_token;
        expect(isJust(token) && isString(token)).toBe(true);
        return response;
    });
});
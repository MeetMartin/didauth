// @ts-check

import { readDID } from '../../src/effects/DID'

test('requestAccessToken returns AsyncEffect', async () => {
    expect(await readDID({tenant: 'tenant', did: 'did:key:code', accessToken: 'token'}).inspect().startsWith('AsyncEffect')).toBe(true);
});

test('readDID called with no input returns error', async () => {
    // @ts-ignore
    await readDID()
    .trigger
    (error => {
        expect(error).toBe('readDID payload is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});

test('readDID called with payload without tenant returns error', async () => {
    // @ts-ignore
    await readDID({did: 'did:key:code', accessToken: 'token'})
    .trigger
    (error => {
        expect(error).toBe('readDID payload.tenant is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});


test('readDID called with payload without did returns error', async () => {
    // @ts-ignore
    await readDID({tenant: 'tenant', accessToken: 'token'})
    .trigger
    (error => {
        expect(error).toBe('readDID payload.did is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});

test('readDID called with payload without accessToken returns error', async () => {
    // @ts-ignore
    await readDID({tenant: 'tenant', did: 'did:key:code'})
    .trigger
    (error => {
        expect(error).toBe('readDID payload.accessToken is Nothing.');
        return true;
    })
    (result => fail(`This should not resolve with result ${result}`))
});
// @ts-check

import { formatError, validatePayloadKey } from '../../src/utils';

test('formatError takes MATTR error object and returns an error string.', () => {
    expect(formatError({response: {data: {message: 'Error occured', details: 'some details'}}})).toBe('[object Object]. Error occured. \'some details\'.');
});

test('validatePayloadKey takes payload object and a key within it to return Either dependent on whether the key exists and whether it is a string.', () => {
    const payload = {
        key1: 'string',
        key2: '',
        key3: null,
        key4: 4
    }
    expect(validatePayloadKey(payload)('fake').inspect()).toBe('Failure(\'payload.fake is Nothing or not a string.\')');
    expect(validatePayloadKey(payload)('key4').inspect()).toBe('Failure(\'payload.key4 is Nothing or not a string.\')');
    expect(validatePayloadKey(payload)('key3').inspect()).toBe('Failure(\'payload.key3 is Nothing or not a string.\')');
    expect(validatePayloadKey(payload)('key2').inspect()).toBe('Failure(\'payload.key2 is Nothing or not a string.\')');
    expect(validatePayloadKey(payload)('key1').value).toEqual(payload);
});
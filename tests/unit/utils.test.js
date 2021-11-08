// @ts-check

import { formatError } from '../../src/effects/utils';

test('formatError', () => {
    expect(formatError({response: {data: {message: 'Error occured', details: 'some details'}}})).toBe('[object Object]. Error occured. \'some details\'.');
});
  
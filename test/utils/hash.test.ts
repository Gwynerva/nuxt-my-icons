import { fnv1a64 } from '~/src/utils/hash';

test('Same hash for same text', () => {
    const text = 'Hello World!';
    for (let i = 0; i < 10; i++)
        expect(fnv1a64(text)).toBe(fnv1a64(text));
});
import { indent, removeCarriageReturns } from '~/src/runtime/utils/str';

test('Remove Carriage Returns', () => {
    expect(removeCarriageReturns('\r\n\r\n')).toBe('\n\n');
    expect(removeCarriageReturns('\r')).toBe('');
    expect(removeCarriageReturns('\n\n')).toBe('\n\n');
});

describe('Indent', () => {
    test('Single line', () => {
        expect(indent('')).toBe('');
        expect(indent('Line')).toBe('    Line');
    });

    test('Multiple lines', () => {
        expect(indent('First line\nSecond line\nThird line')).toBe(
            '    First line\n    Second line\n    Third line',
        );
    });

    test('Text with empty lines and space symbols', () => {
        expect(
            indent('\n   \n\nFirst line\n  \n\nSecond line\nThird line\n'),
        ).toBe(
            '\n   \n\n    First line\n  \n\n    Second line\n    Third line\n',
        );
    });

    test('Different indent sizes', () => {
        expect(indent('a', 0)).toBe('a');
        expect(indent('a', 1)).toBe(' a');
        expect(indent('a', 5)).toBe('     a');
    });
});

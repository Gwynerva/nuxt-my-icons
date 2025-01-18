import { createSvgSymbol, parseSvg } from '~/src/runtime/utils/svg';

describe('Parse SVG', () => {
    test('Normal SVG', () => {

        expect(parseSvg(`

            <!-- Sample comment -->
            <svg id="bar" xmlns="http://www.w3.org/2000/svg" width="100" height="100%" data-baz qux="sample">
                <path d="M1,5 L9,5"/>
            </svg>

        `)).toEqual({
            attributes: [
                'data-baz',
                'qux="sample"',
            ],
            template: `

            <!-- Sample comment -->
            <symbol{{ attributes }}>
                <path d="M1,5 L9,5"/>
            </symbol>

        `});

        expect(parseSvg(`

            <svg><path d="M1,5 L9,5"/></svg>

        `)).toEqual({
            attributes: [],
            template: `

            <symbol{{ attributes }}><path d="M1,5 L9,5"/></symbol>

        `});
    });

    test('SVG with unusual format', () => {

        expect(parseSvg(`

            <!--
               Multi
               Line
               Comment
            -->
            <svg
                id="bar"
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100%"
                data-baz
                qux="sample"
            >
                <path d="M1,5 L9,5"/>
            </svg>

        `)).toEqual({
            attributes: [
                'data-baz',
                'qux="sample"',
            ],
            template: `

            <!--
               Multi
               Line
               Comment
            -->
            <symbol{{ attributes }}>
                <path d="M1,5 L9,5"/>
            </symbol>

        `});

    });
});

test('Create SVG symbol', () => {
    expect(createSvgSymbol({
        attributes: [
            'data-baz',
            'qux="sample"',
        ],
        template: `

        <!--
            Multi
            Line
            Comment
        -->
        <symbol{{ attributes }}>
            <path d="M1,5 L9,5"/>
        </symbol>

    `}, 'symbol-id')).toBe(`

        <!--
            Multi
            Line
            Comment
        -->
        <symbol id="symbol-id" data-baz qux="sample">
            <path d="M1,5 L9,5"/>
        </symbol>

    `);

    expect(createSvgSymbol({
        attributes: [],
        template: `

        <symbol{{ attributes }}><path d="M1,5 L9,5"/></symbol>

    `})).toBe(`

        <symbol><path d="M1,5 L9,5"/></symbol>

    `);
});
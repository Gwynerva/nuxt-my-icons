import { fnv1a64 } from './hash';

export interface ParsedSvg
{
    attributes: string[];
    template: string;
}

export function parseSvg(svg: string): ParsedSvg
{
    const svgTagRegex = /<svg((?=\s)(?!(?:[^>"\']|"[^"]*"|\'[^\']*\')*?(?<=\s)(?:term|range)\s*=)(?!\s*\/?>)\s+(?:".*?"|\'.*?\'|[^>]*?)+|\s*)>/;
    const match = svg.match(svgTagRegex);

    if (!match)
        throw new Error('Invalid SVG: No <svg> tag found!');

    const attributesToDrop = [
        'id',
        'version',
        'xmlns',
        'width',
        'height',
    ];

    const attributes = match[1]
        .split(/\s+/)
        .filter(attribute => {
            if (!attribute.trim())
                return false;

            for (const attributeToDrop of attributesToDrop)
                if (attribute.startsWith(attributeToDrop))
                    return false;

            return true;
        });

    const template = svg.replace(svgTagRegex, `<symbol{{ attributes }}>`).replace(/<\/svg>/, '</symbol>');

    return {
        attributes,
        template,
    }
}

export function createSvgSymbol(parsedSvg: ParsedSvg, id?: string): string
{
    const attributes = [
        ...(id ? [`id="${ id }"`] : []),
        ...parsedSvg.attributes,
    ];

    const attributesString = attributes.length ? ' ' + attributes.join(' ') : '';
    return parsedSvg.template.replace('{{ attributes }}', attributesString);
}

export function getSvgHash(parsedSvg: ParsedSvg): string
{
    return fnv1a64(createSvgSymbol(parsedSvg));
}
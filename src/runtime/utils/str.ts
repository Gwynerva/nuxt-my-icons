export function removeCarriageReturns(text: string): string
{
    return text?.replace(/\r/gm, '');
}

export function indent(text: string, indentSize = 4): string
{
    return text.replace(/^(.+)$/gm, (match) => {
        return match.trim() ? ' '.repeat(indentSize) + match : match;
    });
}
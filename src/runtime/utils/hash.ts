// Praise the Chat-GPT!
export function fnv1a64(text: string) {
    const FNV_PRIME_LOW = 0x93;         // Lower 32 bits of FNV prime (1099511628211)
    const FNV_PRIME_HIGH = 0x100000;    // Higher 32 bits of FNV prime
    let hashLow = 0x811c9dc5;           // Lower 32 bits of FNV offset basis
    let hashHigh = 0x362f;              // Higher 32 bits of FNV offset basis

    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);

        // XOR the character code with the low 32 bits
        hashLow ^= charCode;

        // Multiply by the 64-bit FNV prime (manually split into 32-bit parts)
        const low = hashLow * FNV_PRIME_LOW;
        const carry = (low / 0x100000000) | 0; // Overflow from low to high
        hashLow = low >>> 0;

        hashHigh = (hashHigh * FNV_PRIME_LOW + carry + hashLow * FNV_PRIME_HIGH) >>> 0;
    }

    // Combine high and low 32-bit parts into a single hexadecimal string
    const hashHex = (hashHigh >>> 0).toString(16).padStart(8, '0') +
        (hashLow >>> 0).toString(16).padStart(8, '0');

    return hashHex;
}
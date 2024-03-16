// i should probably be able to check for bigInt, but for now, I won't because there is no use yet.

export function parseToTimeString(ms: number): string {
    return `${Math.trunc(ms / 86_400_000)} days, ${Math.trunc(ms / 3_600_000 % 24)} hours, ${Math.trunc(ms / 60_000 % 60)} minutes, and ${Math.trunc(ms / 6_000 % 60)} seconds.`;
}

export function sleep(ms: number): Promise<unknown> {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
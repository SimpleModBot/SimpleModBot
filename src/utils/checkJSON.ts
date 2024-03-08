export default function checkJSON(input: string): boolean {
    // I really hate to use try-catch but EMCA regex engine sucks :/
    // (this only works for json strings!!)
    try {
        return !!(JSON.parse(input) && !!input);
    } catch(e) {
        return false;
    }
}
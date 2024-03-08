export default function sleep(length: number) {
    return new Promise(resolve => {
        setTimeout(resolve, length);
    });
}
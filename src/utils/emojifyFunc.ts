const rI = 'regional_indicator_'; // Prefix for regional indicators, just to save on space.

const fallBackEmoji = ':joker:'; // Wildcard, baby :)

const zWJ = '\u200D'; // This is required to stop emoji from making little emoji babies. Otherwise :regional_indicator_c::regional_indicator_a: would become 🇨🇦

const singleCharacterSub: { [key: string]: Array<string> } = {
    // Letters
    'a': [
        `:${rI}a:`,
        '🅰️',
    ],
    'b': [
        `:${rI}b:`,
        '🅱️',
    ],
    'c': [
        `:${rI}c:`,
        '©️',
    ],
    'd': [ `:${rI}d:` ],
    'e': [
        `:${rI}e:`,
        '📧',
    ],
    'f': [ `:${rI}f:` ],
    'g': [ `:${rI}g:` ],
    'h': [ `:${rI}h:` ],
    'i': [ `:${rI}i:` ],
    'j': [ `:${rI}j:` ],
    'k': [ `:${rI}k:` ],
    'l': [ `:${rI}l:` ],
    'm': [
        `:${rI}m:`,
        'Ⓜ️',
        '〽️',
    ],
    'n': [ `:${rI}n:` ],
    'o': [
        `:${rI}o:`,
        '🅾️',
        '🛟',
        '💿',
        '📀',
        '⚾',
        '🏐',
        '🛞',
        '⭕',
    ],
    'p': [
        `:${rI}p:`,
        '🅿️',
    ],
    'q': [ `:${rI}q:` ],
    'r': [
        `:${rI}r:`,
        '®️',
    ],
    's': [ `:${rI}s:` ],
    't': [ `:${rI}t:` ],
    'u': [ `:${rI}u:` ],
    'v': [ `:${rI}v:` ],
    'w': [ `:${rI}w:` ],
    'x': [
        `:${rI}x:`,
        '✖️',
        '❌',
        '❎',
    ],
    'y': [ `:${rI}y:` ],
    'z': [
        `:${rI}z:`,
        '💤',
    ],

    // Numbers
    '0': [ '0️⃣' ],
    '1': [ '1️⃣' ],
    '2': [ '2️⃣' ],
    '3': [ '3️⃣' ],
    '4': [ '4️⃣' ],
    '5': [ '5️⃣' ],
    '6': [ '6️⃣' ],
    '7': [ '7️⃣' ],
    '8': [
        '8️⃣',
        '🎱',
    ],
    '9': [ '9️⃣' ],

    // Symbols
    '+': [ '➕' ],
    '-': [ '➖' ],
    '/': [ '➗' ],
    '=': [ '🟰' ],

    '!!': [ '‼️' ],
    '?!': [ '⁉️' ],
    '!': [
        '❗',
        '❕',
    ],
    '?': [
        '❓',
        '❔',
    ],

    '@': [ '🍥'],
    '$': [
        '💲',
        '💸',
        '💵',
        '💴',
        '💶',
        '💷',
        '🪙',
        '💰',
        '💳',
    ],
    '*': [
        '*️⃣',
        '✖️',
        '✳️',
        '❇️',
    ],

    // Non emoji characters
    ' ': [ ' ' ],
    '.': [ '.' ],
    ',': [ ',' ],
    ':': [ ':' ],
    ';': [ ';' ],
    '\'': [ '\'' ],
    '"': [ '"' ],
    '(': [ '(' ],
    ')': [ ')' ],
    '[': [ '[' ],
    ']': [ ']' ],
    '{': [ '{' ],
    '}': [ '}' ],
    '<': [ '<' ],
    '>': [ '>' ],
    '|': [ '|' ],
    '\\': [ '\\' ],
    '_': [ '_' ],
};

// Separate to make the comparison a little cheaper.
const doubleCharacterSub: { [key: string]: Array<string> } = {
    // Alphabetic
    'tm': [ '™️' ],
    'wc': [ '🚾' ],
    'ng': [ '🆖' ],
    'ok': [ '🆗' ],
    'up': [ '🆙' ],
    'vs': [ '🆚' ],
    'ab': [ '🆎' ],
    'cl': [ '🆑' ],

    // Numbers
    '10': [ '🔟' ],
    '18': [ '🔞' ],
    '17': [
        '📆',
        '📅',
    ],

    // Emoticons
    ':)': [ '🙂' ],
    ':|': [ '😐' ],
    ':/': [ '🫤' ],
    ':\\': [ '🫤' ],
    ':P': [ '😛' ],
    'XS': [ '😖' ],
    'XO': [ '😵' ],
    'X(': [ '😣' ],
    'DX': [ '😫' ],
    'D:': [ '😧' ],
    ':(': [
        '🙁',
        '😦',
        '☹️',
    ],
    ':D': [
        '😄',
        '😃',
        '😀',
    ],
    ':O': [
        '😲',
        '😮',
    ],
    'XD': [
        '😂',
        '😆',
        '🤣',
    ],
};

// I'm not making it check for triple characters due to how few there are.
// Here are some ones that would've been cool tho
// 💯 🆘 🏧 🎰


function getSingleEmojiSub(char: string): string {
    return singleCharacterSub[char] ? singleCharacterSub[char][Math.round(Math.random() * (singleCharacterSub[char].length - 1))] : fallBackEmoji;
};

function getDoubleEmojiSub(char: string): string | null {
    return doubleCharacterSub[char] ? doubleCharacterSub[char][Math.round(Math.random() * (doubleCharacterSub[char].length - 1))] : null;
}

function emojifyString(text: string): string {
    let result = '';
    text = text.toLowerCase();
    text.concat(zWJ); // This is so we don't need to check if the next character exists each time, making the loop a little faster.

    for (let i = 0; i < text.length - 1; i++) {
        const char = text[i];
        const doubleChar = text[i] + text[i + 1];

        var emoji = getDoubleEmojiSub(doubleChar);
        
        if (emoji) {
            result += emoji;
            i++;
        } else {
            result += getSingleEmojiSub(char);
        }
    }

    return result;
}

export default emojifyString;
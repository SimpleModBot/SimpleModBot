const rI = 'regional_indicator_'; // Prefix for regional indicators, just to save on space.

const fallBackEmoji = ':joker:'; // Wildcard, baby :)

const zWJ = '\u200D'; // This is required to stop emoji from making little emoji babies. Otherwise :regional_indicator_c::regional_indicator_a: would become 🇨🇦

const characterSub: { [key: string]: Array<string> } = {
    'a': [ `:${rI}a:` ],
    'b': [
        `:${rI}b:`,
        ':b:',
    ],
    'c': [
        `:${rI}c:`,
        ':copyright:',
    ],
    'd': [ `:${rI}d:` ],
    'e': [ `:${rI}e:` ],
    'f': [ `:${rI}f:` ],
    'g': [ `:${rI}g:` ],
    'h': [ `:${rI}h:` ],
    'i': [ `:${rI}i:` ],
    'j': [ `:${rI}j:` ],
    'k': [ `:${rI}k:` ],
    'l': [ `:${rI}l:` ],
    'm': [
        `:${rI}m:`,
        ':circled_m:',
        ':part_alternation_mark:',
],
    'n': [ `:${rI}n:` ],
    'o': [
        `:${rI}o:`,
        ':ring_buoy:',
        ':cd:',
        ':dvd:',
        ':baseball:',
        ':volleyball:',
        ':wheel:',
        ':o:',
],
    'p': [
        `:${rI}p:`,
        ':parking:',
    ],
    'q': [ `:${rI}q:` ],
    'r': [
        `:${rI}r:`,
        ':registered:',
    ],
    's': [ `:${rI}s:` ],
    't': [ `:${rI}t:` ],
    'u': [ `:${rI}u:` ],
    'v': [ `:${rI}v:` ],
    'w': [ `:${rI}w:` ],
    'x': [
        `:${rI}x:`,
        ':heavy_multiplication_x:',
        ':cross_mark:',
        ':negative_squared_cross_mark:',
    ],
    'y': [ `:${rI}y:` ],
    'z': [
        `:${rI}z:`,
        ':zzz:',
],
    
    'tm': [ ':tm:' ],
    'wc': [ ':water_closet:' ],
    'ng': [ ':ng:' ],
    'ok': [ ':ok:' ],
    'up': [ ':up:' ],

    '0': [ ':zero:' ],
    '1': [ ':one:' ],
    '2': [ ':two:' ],
    '3': [ ':three:' ],
    '4': [ ':four:' ],
    '5': [ ':five:' ],
    '6': [ ':six:' ],
    '7': [ ':seven:' ],
    '8': [
        ':eight:',
        ':8ball:',
    ],
    '9': [ ':nine:' ],
    '10': [ ':keycap_ten:' ],
    // '100': [ ':100:' ],

    '$': [
        ':heavy_dollar_sign:',
        ':money_with_wings:',
        ':dollar:',
        ':yen::euro:',
        ':pound:',
        ':coin:',
        ':moneybag:',
        ':credit_card:',
    ],
    '*': [
        ':asterisk:',
        ':heavy_multiplication_x:',
        ':eight_spoked_asterisk:',
        ':sparkle:',
    ],
    '+': [ ':heavy_plus_sign:' ],
    '-': [ ':heavy_minus_sign:' ],
    '/': [ ':heavy_division_sign:' ],
    '=': [ ':heavy_equals_sign:' ],

    '!': [
        ':exclamation:',
        ':grey_exclamation:',
    ],
    '?': [
        ':question:',
        ':grey_question:',
    ],
    '!!': [ ':bangbang:' ],
    '?!': [ ':interrobang:' ],

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

function getEmojiSub(char: string): string {
    return characterSub[char] ? characterSub[char][Math.round(Math.random() * (characterSub[char].length - 1))] : fallBackEmoji;
};

function emojifyString(str: string): string {
    return str.split('').map(char => getEmojiSub(char.toLowerCase())).join(zWJ);
}

export default emojifyString;
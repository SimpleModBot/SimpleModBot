// original code is from https://github.com/zuzak/owo
// i am just rewriting this because the npm module doesn't properly work with ts

const prefixes = [
    '<3 ',
    '0w0 ',
    'H-hewwo?? ',
    'HIIII! ',
    'Haiiii! ',
    'Huohhhh. ',
    'OWO ',
    'OwO ',
    'UwU '
];

const suffixes = [
    ' ( ´•̥̥̥ω•̥̥̥` )',
    ' ( ˘ ³˘)♥',
    ' ( ͡° ᴥ ͡°)',
    ' (^³^)',
    ' (´・ω・｀)',
    ' (ʘᗩʘ\')',
    ' (இωஇ )',
    ' (๑•́ ₃ •̀๑)',
    ' (• o •)',
    ' (•́︿•̀)',
    ' (⁎˃ᆺ˂)',
    ' (╯﹏╰）',
    ' (●´ω｀●)',
    ' (◠‿◠✿)',
    ' (✿ ♡‿♡)',
    ' (❁´◡`❁)',
    ' (　\'◟ \')',
    ' (人◕ω◕)',
    ' (；ω；)',
    ' (｀へ´)',
    ' ._.',
    ' :3',
    ' :3c',
    ' :D',
    ' :O',
    ' :P',
    ' ;-;',
    ' ;3',
    ' ;_;',
    ' <{^v^}>',
    ' >_<',
    ' >_>',
    ' UwU',
    ' XDDD',
    ' \\°○°/',
    ' ^-^',
    ' ^_^',
    ' ^•ﻌ•^',
    ' x3',
    ' x3',
    ' xD',
    ' ÙωÙ',
    ' ʕʘ‿ʘʔ',
    ' ʕ•ᴥ•ʔ',
    ' ミ(．．)ミ',
    ' ㅇㅅㅇ',
    ', fwendo',
    '（＾ｖ＾）',
];

const substitutions = {
    'r': 'w',
    'l': 'w',
    'R': 'W',
    'L': 'W',
    'no': 'nu',
    'has': 'haz',
    'have': 'haz',
    'says': 'sez',
    'you': 'uu',
    'the': 'da',
    'The': 'Da',
    'THE': 'DA'
};

// now that everything has been listed
// we replace the replacements, then add the prefixes and suffixes if a different function has been called
function translate(string: string): string {
    let str: string = string;

    Object.keys(substitutions).forEach(key => {
        str = str.replaceAll(key, substitutions[key]);
    });  

    return str;
};

// and then add the affixes
function addAffixes(string: string): string {
  // we use an rng to choose them
  const rng1 = Math.round((Math.random() * prefixes.length));
  const rng2 = Math.round((Math.random() * suffixes.length));

  // then return the affixed string
  return prefixes[rng1] + string + suffixes[rng2];
}

function owo(string: string): string {
  return addAffixes(translate(string));
}

// get everything together for exporting
const OwO = {
  translate: translate,
  owo: owo
};

export default OwO;

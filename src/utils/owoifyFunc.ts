class OwO {
    private readonly prefixes: Array<string> = [
        "<3 ",
        "0w0 ",
        "H-hewwo?? ",
        "HIIII! ",
        "Haiiii! ",
        "Huohhhh. ",
        "OWO ",
        "OwO ",
        "UwU "
    ];
    private readonly suffixes: Array<string> = [
        " ( ´•̥̥̥ω•̥̥̥` )",
        " ( ˘ ³˘)♥",
        " ( ͡° ᴥ ͡°)",
        " (^³^)",
        " (´・ω・｀)",
        " (ʘᗩʘ\")",
        " (இωஇ )",
        " (๑•́ ₃ •̀๑)",
        " (• o •)",
        " (•́︿•̀)",
        " (⁎˃ᆺ˂)",
        " (╯﹏╰）",
        " (●´ω｀●)",
        " (◠‿◠✿)",
        " (✿ ♡‿♡)",
        " (❁´◡`❁)",
        " (　\"◟ \")",
        " (人◕ω◕)",
        " (；ω；)",
        " (｀へ´)",
        " ._.",
        " :3",
        " :3c",
        " :D",
        " :O",
        " :P",
        " ;-;",
        " ;3",
        " ;_;",
        " <{^v^}>",
        " >_<",
        " >_>",
        " UwU",
        " XDDD",
        " \\°○°/",
        " ^-^",
        " ^_^",
        " ^•ﻌ•^",
        " x3",
        " x3",
        " xD",
        " ÙωÙ",
        " ʕʘ‿ʘʔ",
        " ʕ•ᴥ•ʔ",
        " ミ(．．)ミ",
        " ㅇㅅㅇ",
        ", fwendo",
        "（＾ｖ＾）",
    ];
    private readonly replacementMap = {
        r: "w",
        R: "W",
        l: "w",
        L: "W",
        no: "nu",
        has: "haz",
        have: "haz",
        says: "sez",
        you: "uu",
        the: "da"
    };

    public translateText(str: string): string {
        return str.replace(/\b(?:r|R|l|L|no|has|have|says|you|the)/gi, matched => this.replacementMap[matched]);
    };

    public owo(str: string): string {
        return `${this.prefixes[~(Math.random() * (this.prefixes.length - 1))]} ${this.translateText(str)} ${this.suffixes[~(Math.random() * (this.suffixes.length - 1))]}`;
    }
}
  
export default OwO;
const Discord = require('discord.js');

module.exports = {
    name: "texttobinary",
    description: "Converts english words to binary.",
    aliases: ["ttb"],
    cooldown: 5,
    async execute(message, args, data, client) {
        //made by dood
        
        if (args[0] == 'ENA') return message.channel.send("Please provide text to convert!");
        const text = args.join(" ");
        const split = text.split("");
        let a = [];

        for (const i in split) {
            switch (i) {
                case "a":
                    a.push("01100001");
                    break;
                case "b":
                    a.push("01100010");
                    break;
                case "c":
                    a.push("01100011");
                    break;
                case "d":
                    a.push("01100100");
                    break;
                case "e":
                    a.push("01100101");
                    break;
                case "f":
                    a.push("01100110");
                    break;
                case "g":
                    a.push("01100111");
                    break;
                case "h":
                    a.push("01101000");
                    break;
                case "i":
                    a.push("01101001");
                    break;
                case "j":
                    a.push("01101010");
                    break;
                case "k":
                    a.push("01101011");
                    break;
                case "l":
                    a.push("01101100");
                    break;
                case "m":
                    a.push("01101101");
                    break;
                case "n":
                    a.push("01101110");
                    break;
                case "o":
                    a.push("01101111");
                    break;
                case "p":
                    a.push("01110000");
                    break;
                case "q":
                    a.push("01110001");
                    break;
                case "r":
                    a.push("01110010");
                    break;
                case "s":
                    a.push("01110011");
                    break;
                case "t":
                    a.push("01110100");
                    break;
                case "u":
                    a.push("01110101");
                    break;
                case "v":
                    a.push("01110110");
                    break;
                case "w":
                    a.push("01110111");
                    break;
                case "x":
                    a.push("01111000");
                    break;
                case "y":
                    a.push("01111001");
                    break;
                case "z":
                    a.push("01111010");
                    break;
                ///////////////
                case "A":
                    a.push("01000001");
                    break;
                case "B":
                    a.push("01000010");
                    break;
                case "C":
                    a.push("01000011");
                    break;
                case "D":
                    a.push("01000100");
                    break;
                case "E":
                    a.push("01000101");
                    break;
                case "F":
                    a.push("01000110");
                    break;
                case "G":
                    a.push("01000111");
                    break;
                case "H":
                    a.push("01001000");
                    break;
                case "I":
                    a.push("01001001");
                    break;
                case "J":
                    a.push("01001010");
                    break;
                case "K":
                    a.push("01001011");
                    break;
                case "L":
                    a.push("01001100");
                    break;
                case "M":
                    a.push("01001101");
                    break;
                case "N":
                    a.push("01001110");
                    break;
                case "O":
                    a.push("01001111");
                    break;
                case "P":
                    a.push("01010000");
                    break;
                case "Q":
                    a.push("01010001");
                    break;
                case "R":
                    a.push("01010010");
                    break;
                case "S":
                    a.push("01010011");
                    break;
                case "T":
                    a.push("01010100");
                    break;
                case "U":
                    a.push("01010101");
                    break;
                case "V":
                    a.push("01010110");
                    break;
                case "W":
                    a.push("01010111");
                    break;
                case "X":
                    a.push("01011000");
                    break;
                case "Y":
                    a.push("01011001");
                    break;
                case "Z":
                    a.push("01011010");
                    break;
                ///////////////
                case "0":
                    a.push("00110000");
                    break;
                case "1":
                    a.push("00110001");
                    break;
                case "2":
                    a.push("00110010");
                    break;
                case "3":
                    a.push("00110011");
                    break;
                case "4":
                    a.push("00110100");
                    break;
                case "5":
                    a.push("00110101");
                    break;
                case "6":
                    a.push("00110110");
                    break;
                case "7":
                    a.push("00110111");
                    break;
                case "8":
                    a.push("00111000");
                    break;
                case "9":
                    a.push("00111001");
                    break;
                ///////////////
                case "`":
                    a.push("01100000");
                    break;
                case "~":
                    a.push("01111110");
                    break;
                case "!":
                    a.push("00100001");
                    break;
                case "@":
                    a.push("01000000");
                    break;
                case "#":
                    a.push("00100011");
                    break;
                case "$":
                    a.push("00100100");
                    break;
                case "%":
                    a.push("00100101");
                    break;
                case "^":
                    a.push("01011110");
                    break;
                case "&":
                    a.push("00100110");
                    break;
                case "*":
                    a.push("00101010");
                    break;
                case "(":
                    a.push("00101000");
                    break;
                case ")":
                    a.push("00101001");
                    break;
                case "-":
                    a.push("00101101");
                    break;
                case "_":
                    a.push("01011111");
                    break;
                case "=":
                    a.push("00111101");
                    break;
                case "+":
                    a.push("00101011");
                    break;
                case "[":
                    a.push("01011011");
                    break;
                case "{":
                    a.push("01111011");
                    break;
                case "]":
                    a.push("01011101");
                    break;
                case "}":
                    a.push("01111101");
                    break;
                case ";":
                    a.push("00111011");
                    break;
                case ":":
                    a.push("00111010");
                    break;
                case "'":
                    a.push("00100111");
                    break;
                case '"':
                    a.push("00100010");
                    break;
                case "\\":
                    a.push("01011100");
                    break;
                case "|":
                    a.push("01111100");
                    break;
                case ",":
                    a.push("00101100");
                    break;
                case "<":
                    a.push("00111100");
                    break;
                case ".":
                    a.push("00101110");
                    break;
                case ">":
                    a.push("00111110");
                    break;
                case "/":
                    a.push("00101111");
                    break;
                case "?":
                    a.push("00111111");
                    break;
                case " ":
                    a.push("00100000");
                    break;
                default:
                    break;
            }
        }
        message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`${a.join(' ')}\u200b`).setColor('GREY')] });
    },
};
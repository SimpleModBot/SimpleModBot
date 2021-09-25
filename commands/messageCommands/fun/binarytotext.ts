const Discord = require('discord.js');

module.exports = {
    name: "binarytotext",
    description: "Converts binary text to english text.",
    aliases: ["btt"],
    cooldown: 5,
    async execute(message, args, data, client) {
        //made by dood

        if (args[0] == "ENA") return message.channel.send("Please provide valid binary to convert!");
        const text = args.join(" ");
        const split = text.split(" ");
        let a = [];

        for (const i in split) {
            switch (i) {
                case "01100001":
                    a.push("a");
                    break;
                case "01100010":
                    a.push("b");
                    break;
                case "01100011":
                    a.push("c");
                    break;
                case "01100100":
                    a.push("d");
                    break;
                case "01100101":
                    a.push("e");
                    break;
                case "01100110":
                    a.push("f");
                    break;
                case "01100111":
                    a.push("g");
                    break;
                case "01101000":
                    a.push("h");
                    break;
                case "01101001":
                    a.push("i");
                    break;
                case "01101010":
                    a.push("j");
                    break;
                case "01101011":
                    a.push("k");
                    break;
                case "01101100":
                    a.push("l");
                    break;
                case "01101101":
                    a.push("m");
                    break;
                case "01101110":
                    a.push("n");
                    break;
                case "01101111":
                    a.push("o");
                    break;
                case "01110000":
                    a.push("p");
                    break;
                case "01110001":
                    a.push("q");
                    break;
                case "01110010":
                    a.push("r");
                    break;
                case "01110011":
                    a.push("s");
                    break;
                case "01110100":
                    a.push("t");
                    break;
                case "01110101":
                    a.push("u");
                    break;
                case "01110110":
                    a.push("v");
                    break;
                case "01110111":
                    a.push("w");
                    break;
                case "01111000":
                    a.push("x");
                    break;
                case "01111001":
                    a.push("y");
                    break;
                case "01111010":
                    a.push("z");
                    break;
                ////////////////
                case "01000001":
                    a.push("A");
                    break;
                case "01000010":
                    a.push("B");
                    break;
                case "01000011":
                    a.push("C");
                    break;
                case "01000100":
                    a.push("D");
                    break;
                case "01000101":
                    a.push("E");
                    break;
                case "01000110":
                    a.push("F");
                    break;
                case "01000111":
                    a.push("G");
                    break;
                case "01001000":
                    a.push("H");
                    break;
                case "01001001":
                    a.push("I");
                    break;
                case "01001010":
                    a.push("J");
                    break;
                case "01001011":
                    a.push("K");
                    break;
                case "01001100":
                    a.push("L");
                    break;
                case "01001101":
                    a.push("M");
                    break;
                case "01001110":
                    a.push("N");
                    break;
                case "01001111":
                    a.push("O");
                    break;
                case "01010000":
                    a.push("P");
                    break;
                case "01010001":
                    a.push("Q");
                    break;
                case "01010010":
                    a.push("R");
                    break;
                case "01010011":
                    a.push("S");
                    break;
                case "01010100":
                    a.push("T");
                    break;
                case "01010101":
                    a.push("U");
                    break;
                case "01010110":
                    a.push("V");
                    break;
                case "01010111":
                    a.push("W");
                    break;
                case "01011000":
                    a.push("X");
                    break;
                case "01011001":
                    a.push("Y");
                    break;
                case "01011010":
                    a.push("Z");
                    break;
                ////////////////
                case "00110000":
                    a.push("0");
                    break;
                case "00110001":
                    a.push("1");
                    break;
                case "00110010":
                    a.push("2");
                    break;
                case "00110011":
                    a.push("3");
                    break;
                case "00110100":
                    a.push("4");
                    break;
                case "00110101":
                    a.push("5");
                    break;
                case "00110110":
                    a.push("6");
                    break;
                case "00110111":
                    a.push("7");
                    break;
                case "00111000":
                    a.push("8");
                    break;
                case "00111001":
                    a.push("9");
                    break;
                ////////////////
                case "01100000":
                    a.push("`");
                    break;
                case "01111110":
                    a.push("~");
                    break;
                case "00100001":
                    a.push("!");
                    break;
                case "01000000":
                    a.push("@");
                    break;
                case "00100011":
                    a.push("#");
                    break;
                case "00100100":
                    a.push("$");
                    break;
                case "00100101":
                    a.push("%");
                    break;
                case "01011110":
                    a.push("^");
                    break;
                case "00100110":
                    a.push("&");
                    break;
                case "00101010":
                    a.push("*");
                    break;
                case "00101000":
                    a.push("(");
                    break;
                case "00101001":
                    a.push(")");
                    break;
                case "00101101":
                    a.push("-");
                    break;
                case "01011111":
                    a.push("_");
                    break;
                case "00111101":
                    a.push("=");
                    break;
                case "00101011":
                    a.push("+");
                    break;
                case "01011011":
                    a.push("[");
                    break;
                case "01111011":
                    a.push("{");
                    break;
                case "01011101":
                    a.push("]");
                    break;
                case "01111101":
                    a.push("}");
                    break;
                case "00111011":
                    a.push(";");
                    break;
                case "00111010":
                    a.push(":");
                    break;
                case "00100111":
                    a.push("'");
                    break;
                case "00100010":
                    a.push('"');
                    break;
                case "01011100":
                    a.push("\\");
                    break;
                case "01111100":
                    a.push("|");
                    break;
                case "00101100":
                    a.push(",");
                    break;
                case "00111100":
                    a.push("<");
                    break;
                case "00101110":
                    a.push(".");
                    break;
                case "00111110":
                    a.push(">");
                    break;
                case "00101111":
                    a.push("/");
                    break;
                case "00111111":
                    a.push("?");
                    break;
                case "00100000":
                    a.push(" ");
                    break;
                default:
                    break;
            }
        }
        message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`${a.join(' ')}\u200b`).setColor('GREY')] });
    },
};
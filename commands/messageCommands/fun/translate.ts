const Discord = require('discord.js');

module.exports = {
    name: 'translate',
    description: 'Translates your text into a language.',
    async execute(message, args, data, client) {
        if (args[0] == 'ENA') return message.channel.send({ embeds: [new Discord.MessageEmbed().setTitle('Invalid usage!').setDescription('Usage: `translate <lang> <text>`\n\nLanguages:\n`minecraft` Translates to enchanting table or standard galactic alphabet').setTimestamp().setColor('GREY')] });
        let msg = 'nothin';

        if (args[0] == 'minecraft') {
            msg = await args.slice(1).join(' ').replace('a', 'ᔑ').replace('b', 'ʖ').replace('c', 'ᓵ').replace('d', '↸').replace('e', 'ᒷ').replace('f', '⎓').replace('g', '⊣').replace('h', '⍑').replace('i', '╎').replace('j', '⋮').replace('k', 'ꖌ').replace('l', 'ꖎ').replace('m', 'ᒲ').replace('n', 'リ').replace('o', '𝙹').replace('p', '!¡').replace('q', 'ᑑ').replace('r', '∷').replace('s', 'ᓭ').replace('t', 'ℸ ̣').replace('u', '⚍').replace('v', ' ̣').replace('w', '∴').replace('x', '/').replace('y', '||').replace('z', '⨅');
            message.reply(msg + '\u200b');
        };
    },
};
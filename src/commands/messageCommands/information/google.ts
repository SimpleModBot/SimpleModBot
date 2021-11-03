const Discord = require('discord.js');
const request = require('node-superfetch');

module.exports = {
    name: "google",
    aliases: ["search"],
    async execute(message, args, data, client) {
        let key = "AIzaSyAyGGUJvip1tNAr-QYNA3X89VIZW6AiL8w";
        let csx = "e326af2435b868fea";
        let query = args.join(" ");
        if (!query) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Please provide something to search for. Example: \`${client.prefix}google youtube\``).setColor('GREY')] });

        async function search(query) {
            const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
                key: key, cx: csx, safe: "off", q: query
            });

            if (!body.items) return null;
            return body.items[0];
        }

        let href = await search(query);
        if (!href) return message.reply(`Couldn't search for **${query}**`)

        const embed = new Discord.MessageEmbed()
            .setTitle(href.title)
            .setDescription(href.snippet)
            .setImage(href.pagemap ? href.pagemap.cse_thumbnail[0].src : null)
            .setURL(href.link)
            .setColor(message.guild.me.displayHexColor)
            .setFooter(`Search requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
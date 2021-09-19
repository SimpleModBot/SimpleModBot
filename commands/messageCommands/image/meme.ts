const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: 'meme',
    description: 'Sends a meme from r/meirl, r/memes, or r/dankmemes',
    async execute(message, args, data, client) {
        fetch("https://meme-api.herokuapp.com/gimme").then((res) => res.json()).then(async (json) => {
            const memeEmbed = new Discord.MessageEmbed()
                .setTitle(json.title)
                .setImage(json.url)
                .setFooter(`${json.subreddit}`);

            let msg = await message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("Fetching you a meme...").setColor('GREY')] });
            msg.edit({ embeds: [memeEmbed] });
        });

        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};
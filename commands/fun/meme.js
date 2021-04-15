const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: 'meme',
    cooldown: 5,
    description: 'Sends a meme from r/meirl, r/memes, or r/dankmemes',
    async execute(message, args, client) {

        fetch("https://meme-api.herokuapp.com/gimme").then((res) => res.json()).then(async (json) => {
            const memeEmbed = new Discord.MessageEmbed()
                .setTitle(json.title)
                .setImage(json.url)
                .setFooter(`${json.subreddit}`);

            let msg = await message.channel.send("Fetching you a meme...");
            msg.edit(memeEmbed);
        });
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};
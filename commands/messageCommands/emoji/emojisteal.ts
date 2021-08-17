const Discord = require("discord.js");

module.exports = {
    name: "emojisteal",
    cooldown: 10,
    async execute(message, args, data, client) {
        if (!message.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS") && message.author.id !== client.ownerID) return message.reply("You do not have permission to create emojis!");
        if (!message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) return message.channel.send("I do not have permission to create emojis!");
        if (args[0] == "ENA") return message.reply("Please put some emojis in your message!");

        for (const rawEmoji of args) {
            const parsedEmoji = Discord.Util.parseEmoji(rawEmoji);

            if (parsedEmoji.id) {
                const extension = parsedEmoji.animated ? ".gif" : ".png";
                const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
                message.guild.emojis.create(url, parsedEmoji.name).then((emoji) => message.channel.send(`Added ${emoji} successfully!`));
            };
        };
    },
};
const Discord = require("discord.js");
const Guild = require('../../database/models/guildSchema');

module.exports = {
    name: 'unban',
    async execute(message, args, client) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to use this command!");
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have permission to ban users.");

        let reason = args.slice(1).join(" ");
        let userID = args[0];

        if (!reason) reason = "No reason given.";
        if (!args[0]) return message.channel.send("You must mention a user to unban.");
        if (isNaN(args[0])) return message.channel.send("The ID mentioned is not valid");

        message.guild.fetchBans().then(async (bans) => {
            if (bans.size == 0) return message.channel.send("This server does not have anyone banned");
            let bUser = bans.find((b) => b.user.id == userID);
            if (!bUser) return message.channel.send("The user ID mentioned is not banned.");
            await message.guild.members.unban(bUser.user, reason).catch((err) => {
                console.log(err);
                return message.channel.send("Something went wrong unbanning the ID.");
            }).then(() => {
                message.channel.send(`Succesfully Unbanned ${args[0]}`);
            });
            const guild = await Guild.findOne({ guildID: message.guild.id });
            const modlogChannel = client.channels.cache.get(guild.modlogChannelID);
            if (modlogChannel) {
                const modlogEmbed = new Discord.MessageEmbed()
                    .setTitle(`unban command was used.`)
                    .setDescription(`${args[0]} was unbanned for **${reason}** by ${message.author.tag}`)
                    .setTimestamp()
                    .setColor("RED");
                modlogChannel.send(modlogEmbed);

                if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                    message.delete();
                }
            } else {
                if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                    message.delete();
                }
            }
        });
    },
};
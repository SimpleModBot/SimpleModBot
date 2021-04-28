const Discord = require("discord.js");
const Guild = require('../../database/models/guildSchema');

module.exports = {
    name: 'ban',
    description: 'Bans a user from the server.',
    async execute(message, args, client) {

        if (!message.member.hasPermission("BAN_MEMBERS"))
            return message.channel.send(
                "You do not have permission to use this command!"
            );
        if (!message.guild.me.hasPermission("BAN_MEMBERS"))
            return message.channel.send("My role does not have permission to ban.");

        let reason = args.slice(1).join(" ");
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!args[0]) return message.channel.send("You need to mention a user to ban.");
        if (!mentionedMember) return message.channel.send("The mentioned user is not in this server.");
        if (!mentionedMember.bannable) return message.channel.send("I cannot ban this user.");
        if (mentionedMember.id == '750880076555354185') return message.channel.send("I cannot ban this user.");

        if (!reason) reason = "No reason given.";
        if (!args[0]) return message.channel.send("You must mention a user to ban.");
        
        await mentionedMember.ban({
                days: 7,
                reason: reason,
            })
            .catch((err) => console.log(err))
            .then(() => message.channel.send("Succesfully banned " + mentionedMember.user.tag));
        
        const guild = await Guild.findOne({ guildID: message.guild.id });
        const modlogChannel = client.channels.cache.get(guild.modlogChannelID);
        if (modlogChannel == "undefined") return;
        if (modlogChannel) {
            const modlogEmbed = new Discord.MessageEmbed()
                .setTitle(`ban command was used.`)
                .setDescription(`${mentionedMember} was banned for ${reason} by ${message.author.tag}`)
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
    },
};
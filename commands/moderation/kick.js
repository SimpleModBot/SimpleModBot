const Discord = require("discord.js");
const Guild = require('../../database/models/guildSchema');

module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server.',
    async execute(message, args, client) {
        if (!message.member.hasPermission("KICK_MEMBERS"))
            return message.channel.send("You cannot use this command.");
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!args[0]) return message.channel.send("You need to mention a user to kick.");
        if (!mentionedMember) return message.channel.send("The member mentioned is not in the server.");
        if (!mentionedMember.kickable) return message.channel.send("I cannot kick this user.");
        if (mentionedMember.id == '750880076555354185') return message.channel.send("I cannot kick this user.");

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason given";

        if (!args[0]) return message.channel.send("You need to state a user to kick.");
        try {
            await mentionedMember.kick(reason);
        } catch (err) {
            console.log(err);
        }
        
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
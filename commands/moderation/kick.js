const Discord = require("discord.js");

module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server.',
    async execute(message, args, client) {

        if (!message.member.hasPermission("KICK_MEMBERS"))
            return message.channel.send("You cannot use this command.");
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason given";

        const kickEmbed = new Discord.MessageEmbed()
            .setTitle(`You were kicked from ${message.guild.name}`)
            .setDescription(`Reason: ${reason}`)
            .setColor("#5708ab")
            .setTimestamp()
            .setFooter(client.user.tag, client.user.displayAvatarURL);

        if (!args[0]) return message.channel.send("You need to state a user to kick.");
        if (!mentionedMember) return message.channel.send("The member mentioned is not in the server.");
        if (!mentionedMember.kickable) return message.channel.send("I cannot kick this user.");
        try {
            await mentionedMember.send(kickEmbed);
        } catch (err) {
            console.log(err);
            message.channel.send("I was unable to message the member.");
        }

        try {
            await mentionedMember.kick(reason);
        } catch (err) {
            console.log(err);
            return message.channel.send("I was unable to kick the member mentioned.");
        }
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};
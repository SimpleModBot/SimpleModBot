const Discord = require("discord.js");

module.exports = {
    name: 'unmute',
    description: 'Unmutes the mentioned user if they are muted.',
    async execute(message, args, client) {

        if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have permission to use this command.");
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have permission to MANAGE_ROLES.");

        let reason = args.slice(1).join(" ");

        const muteRole = message.guild.roles.cache.find((r) => r.name.toLowerCase() == "muted");
        const memberRole = message.guild.roles.cache.find((r) => r.name.toLowerCase() == "member");
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const unmuteEmbed = new Discord.MessageEmbed()
            .setTitle(`You have been unmuted in ${message.guild.name}`)
            .setDescription(`Reason for being unmuted: ${reason}`)
            .setColor("#5708ab")
            .setTimestamp();

        if (!args[0]) return message.channel.send(`\`//unmute ID reason\``);
        if (!mentionedMember) return message.channel.send("The user mentioned is not in this server.");
        if (mentionedMember.user.id == message.author.id) return message.channel.send("If you are muted how would you be talking right now?");
        if (mentionedMember.user.id == client.user.id) return message.channel.send("It is impossible for me to be muted. Try it without adding the role yourself.");
        if (!reason) reason = "No reason given.";
        if (mentionedMember.roles.cache.has(memberRole)) return message.channel.send("This member is already unmuted.");
        if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send("You cannot unmute someone with a higher ranked role than yourself.");

        await mentionedMember.send(unmuteEmbed).catch((err) => console.log(err));
        await mentionedMember.roles.add(memberRole)
            .catch((err) => console.log(err).then(message.channel.send("there was an error giving the user member role.")));
        await mentionedMember.roles.remove(muteRole)
            .catch((err) => console.log(err)
                .then(message.channel.send("there was an error removing the users muted role.")));
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};
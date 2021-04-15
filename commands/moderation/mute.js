const Discord = require("discord.js");

module.exports = {
    name: 'mute',
    cooldown: 5,
    description: 'Mutes a member in the server.',
    async execute(message, args, client) {

        if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("You do not have permission to use this command.");
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have permission to MANAGE_ROLES.");

        let reason = args.slice(1).join(" ");

        const muteRole = message.guild.roles.cache.find((r) => r.name.toLowerCase() == "muted"
        );
        if (!muteRole) message.guild.roles.create({
            data: {
                name: "Muted",
                color: "RED",
                deny: "SEND_MESSAGES",
            },
            reason: "for muted people",
        });
        
        const memberRole = message.guild.roles.cache.find((r) => r.name.toLowerCase() == "member");
        if (!memberRole) message.guild.roles.create({
            data: {
                name: "Member",
                color: "BLUE",
            },
            reason: "for members of the server",
        });

        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const muteEmbed = new Discord.MessageEmbed()
            .setTitle(`You have been muted in ${message.guild.name}`)
            .setDescription(`Reason for being muted: ${reason}`)
            .setColor("#5708ab")
            .setTimestamp();

        if (!args[0]) return message.channel.send(`\`//mute ID reason\``);
        if (!mentionedMember) return message.channel.send("The user mentioned is not in this server.");
        if (mentionedMember.user.id == message.author.id) return message.channel.send("You cannot mute yourself, why would you want that?");
        if (mentionedMember.user.id == client.user.id) return message.channel.send("You cannot mute me with my own command lol.");
        if (!reason) reason = "No reason given.";
        if (mentionedMember.roles.cache.has(muteRole)) return message.channel.send("This member is already muted.");
        if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send("You cannot mute someone with a higher ranked role than yourself.");

        await mentionedMember.send(muteEmbed).catch((err) => console.log(err));
        await mentionedMember.roles.add(muteRole)
            .catch((err) => console.log(err)
                .then(message.channel.send("there was an error giving the user the mute role.")));
        await mentionedMember.roles.remove(memberRole).catch((err) => console.log(err).then(message.channel.send("there was an error removing the users member role.")));
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) { message.delete(); }
    },
};
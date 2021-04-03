const Discord = require("discord.js");

module.exports = {
    name: 'warn',
    description: 'Warns the user and gives them a role.',
    async execute(message, args, client) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission to use this command.");
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I do not have permission to `MANAGE_ROLES`");

        const warnRole1 = message.guild.roles.cache.find((role) => role.name == "[Warning: 1]");
        const warnRole2 = message.guild.roles.cache.find((role) => role.name == "[Warning: 2]");
        const warnRole3 = message.guild.roles.cache.find((role) => role.name == "[Warning: 3]");
        const mentionedMember = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
        let punishment = 1;
        let reason = args.slice(2).join(" ");

        if (!warnRole1) await message.guild.roles.create({
            data: {
                name: "[Warning: 1]",
                color: "GREY",
            },
        }).catch((err) => console.log(err));
        if (!warnRole2)
            await message.guild.roles.create({
                data: {
                    name: "[Warning: 2]",
                    color: "GREY",
                },
            }).catch((err) => console.log(err));
        if (!warnRole3)
            await message.guild.roles.create({
                data: {
                    name: "[Warning: 3]",
                    color: "GREY",
                },
            }).catch((err) => console.log(err));

        if (!args[0]) return message.channel.send("You need to say a member to warn.");
        if (!mentionedMember) return message.channel.send("The member you said is not in this guild.");
        if (!reason) reason = 'No reason given.';

        if (mentionedMember.roles.cache.has(warnRole1.id)) punishment = 2;
        if (mentionedMember.roles.cache.has(warnRole2.id)) punishment = 3;
        if (mentionedMember.roles.cache.has(warnRole3.id)) punishment = 4;

        if (!["add", "remove"].includes(args[1])) {
            if (punishment == 2) {
                return message.channel.send(`${mentionedMember.user.tag} has 1 warning.`);
            } else if (punishment == 3) {
                return message.channel.send(`${mentionedMember.user.tag} has 2 warnings.`);
            } else if (punishment == 4) {
                return message.channel.send(`${mentionedMember.user.tag} has 3 warnings.`);
            }
        } else {
            if (args[1] == "add") {
                if (punishment == 2) {
                    await mentionedMember.roles.add(warnRole1.Id).catch(err => console.log(err));
                    return message.channel.send(`${mentionedMember}, you have been warned for: ${reason}.`);
                } else if (punishment == 3) {
                    await mentionedMember.roles.add(warnRole2.Id).catch(err => console.log(err));
                    await mentionedMember.roles.remove(warnRole1.Id).catch(err => console.log(err));
                    return message.channel.send(`${mentionedMember}, you have been warned for: ${reason}.`);
                } else if (punishment == 4) {
                    await mentionedMember.roles.add(warnRole3.Id).catch(err => console.log(err));
                    await mentionedMember.roles.remove(warnRole2.Id).catch(err => console.log(err));
                    return message.channel.send(`${mentionedMember}, you have been warned for: ${reason}.`);
                }
            } else if (args[1] == "remove") {
                if (punishment == 1) {
                    return message.channel.send(`${mentionedMember.user.tag} has no warnings to remove.`);
                } else if (punishment == 2) {
                    await mentionedMember.roles.remove(warnRole1.Id).catch(err => console.log(err));
                    return message.channel.send(`I removed all warnings from ${mentionedMember.user.tag}.`);
                } else if (punishment == 3) {
                    await mentionedMember.roles.remove(warnRole2.Id).catch(err => console.log(err));
                    return message.channel.send(`I removed all warnings from ${mentionedMember.user.tag}.`);
                } else if (punishment == 4) {
                    await mentionedMember.roles.remove(warnRole3.Id).catch(err => console.log(err));
                    return message.channel.send(`I removed all warnings from ${mentionedMember.user.tag}.`);
                }
            }
        }
    },
};
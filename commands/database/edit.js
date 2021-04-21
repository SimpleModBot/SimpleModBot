const Levels = require('discord-xp');

module.exports = {
    name: 'edit',
    description: 'Edits the users xp or level.',
    async execute(message, args, client) {
        let usage = '//edit @member [xp, level] [add, set, remove] <number>'
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send(`You need to give more arguments: \`${usage}\`.`);
        if (!mentionedMember) return message.channel.send('The member stated is not in the server.');
        if (!args[1]) return message.channel.send(`You need to say if you want to edit the level or xp: \`${usage}\`.`);
        if (!['xp', 'level'].includes(args[1])) return message.channel.send('Your second argument is not xp or level. ' + usage);
        if (args[1] == 'xp') {
            if (!['add', 'set', 'remove'].includes(args[2])) return message.channel.send('You need to say if you are adding, removing, or setting the xp: ' + usage)
            const value = Number(args[3]);
            const levelUser = await Levels.fetch(mentionedMember.user.id, message.guild.id);
            if (!levelUser) return message.channel.send('The stated user does not have a database profile yet.');
            if (args[2] == 'add') {
                if (!value) return message.channel.send('The number stated is not valid.');
                try {
                    await Levels.appendXp(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Added: ${value} xp to ${mentionedMember.user.tag}`);
                } catch (err) {
                    const errorChannel = await client.channels.cache.get("832744410998767666");
                    const errorMessage = new Discord.MessageEmbed()
                        .setTitle("An error has occured!")
                        .setDescription(err)
                        .setTimestamp()
                        .setColor("#ff0a0a");
                    errorChannel.send(errorMessage);
                }
            } else if (args[2] == 'remove') {
                if (!value) return message.channel.send('The number stated is not valid.');
                try {
                    await Levels.subtractXp(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Removed: ${value} xp from ${mentionedMember.user.tag}`);
                } catch (err) {
                    const errorChannel = await client.channels.cache.get("832744410998767666");
                    const errorMessage = new Discord.MessageEmbed()
                        .setTitle("An error has occured!")
                        .setDescription(err)
                        .setTimestamp()
                        .setColor("#ff0a0a");
                    errorChannel.send(errorMessage);
                }
            } else if (args[2] == 'set') {
                if (!value) return message.channel.send('The number stated is not valid.');
                try {
                    await Levels.setXp(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Set: ${mentionedMember.user.tag}'s xp to ${value}`);
                } catch (err) {
                    const errorChannel = await client.channels.cache.get("832744410998767666");
                    const errorMessage = new Discord.MessageEmbed()
                        .setTitle("An error has occured!")
                        .setDescription(err)
                        .setTimestamp()
                        .setColor("#ff0a0a");
                    errorChannel.send(errorMessage);
                }
            }
        } else if (args[1] == 'level') {
            if (!['add', 'set', 'remove'].includes(args[2])) return message.channel.send('You need to say if you are adding, removing, or setting the level: ' + usage)
            const value = Number(args[3]);
            const levelUser = await Levels.fetch(mentionedMember.user.id, message.guild.id);
            if (!levelUser) return message.channel.send('The stated user does not have a database profile yet.');
            if (args[2] == 'add') {
                if (!value) return message.channel.send('The number stated is not valid.');
                try {
                    await Levels.appendLevel(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Added: ${value} levels to ${mentionedMember.user.tag}`);
                } catch (err) {
                    const errorChannel = await client.channels.cache.get("832744410998767666");
                    const errorMessage = new Discord.MessageEmbed()
                        .setTitle("An error has occured!")
                        .setDescription(err)
                        .setTimestamp()
                        .setColor("#ff0a0a");
                    errorChannel.send(errorMessage);
                }
            } else if (args[2] == 'remove') {
                if (!value) return message.channel.send('The number stated is not valid.');
                try {
                    await Levels.subtractLevel(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Removed: ${value} levels from ${mentionedMember.user.tag}`);
                } catch (err) {
                    const errorChannel = await client.channels.cache.get("832744410998767666");
                    const errorMessage = new Discord.MessageEmbed()
                        .setTitle("An error has occured!")
                        .setDescription(err)
                        .setTimestamp()
                        .setColor("#ff0a0a");
                    errorChannel.send(errorMessage);
                }
            } else if (args[2] == 'set') {
                if (!value) return message.channel.send('The number stated is not valid.');
                try {
                    await Levels.setLevel(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Set: ${mentionedMember.user.tag}'s level to ${value}`);
                } catch (err) {
                    const errorChannel = await client.channels.cache.get("832744410998767666");
                    const errorMessage = new Discord.MessageEmbed()
                        .setTitle("An error has occured!")
                        .setDescription(err)
                        .setTimestamp()
                        .setColor("#ff0a0a");
                    errorChannel.send(errorMessage);
                }
            }
        }
    },
};
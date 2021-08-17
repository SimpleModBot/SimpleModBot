const Levels = require('discord-xp');

module.exports = {
    name: 'edit',
    description: 'Edits the users xp or level.',
    async execute(message, args, data, client) {
        let usage = '//edit @member [xp, level] [add, set, remove] <number>'
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.channel.send({ content: `You need to give more arguments: \`${usage}\`.` });
        if (!mentionedMember) return message.channel.send({ content: 'The member stated is not in the server.' });
        if (args[1] == "ENA") return message.channel.send({ content: `You need to say if you want to edit the level or xp: \`${usage}\`.` });

        if (!['xp', 'level'].includes(args[1])) return message.channel.send({ content: 'Your second argument is not xp or level. ' + usage });
        if (args[1] == 'xp') {
            if (!['add', 'set', 'remove'].includes(args[2])) return message.channel.send({ content: 'You need to say if you are adding, removing, or setting the xp: ' + usage })

            const value = parseInt(args[3]);
            const levelUser = await Levels.fetch(mentionedMember.user.id, message.guild.id);

            if (!levelUser) return message.channel.send({ content: 'The stated user does not have a database profile yet.' });
            if (args[2] == 'add') {
                if (!value) return message.channel.send({ content: 'The number stated is not valid.' });
                try {
                    await Levels.appendXp(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send({ content: `Added: ${value} xp to ${mentionedMember.user.tag}` });
                } catch (err) {
                    Promise.reject(new err);
                }
            } else if (args[2] == 'remove') {
                if (!value) return message.channel.send({ content: 'The number stated is not valid.' });

                try {
                    await Levels.subtractXp(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send({ content: `Removed: ${value} xp from ${mentionedMember.user.tag}` });
                } catch (err) {
                    Promise.reject(new err);
                }
            } else if (args[2] == 'set') {
                if (!value) return message.channel.send({ content: 'The number stated is not valid.' });

                try {
                    await Levels.setXp(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send({ content: `Set: ${mentionedMember.user.tag}'s xp to ${value}` });
                } catch (err) {
                    Promise.reject(new err);
                }
            }
        } else if (args[1] == 'level') {
            if (!['add', 'set', 'remove'].includes(args[2])) return message.channel.send({ content: 'You need to say if you are adding, removing, or setting the level: ' + usage })
            const value = Number(args[3]);
            const levelUser = await Levels.fetch(mentionedMember.user.id, message.guild.id);
            if (!levelUser) return message.channel.send({ content: 'The stated user does not have a database profile yet.' });

            if (args[2] == 'add') {
                if (!value) return message.channel.send({ content: 'The number stated is not valid.' });
                try {
                    await Levels.appendLevel(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send(`Added: ${value} levels to ${mentionedMember.user.tag}`);
                } catch (err) {
                    Promise.reject(new err);
                }
            } else if (args[2] == 'remove') {
                if (!value) return message.channel.send({ content: 'The number stated is not valid.' });

                try {
                    await Levels.subtractLevel(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send({ content: `Removed: ${value} levels from ${mentionedMember.user.tag}` });
                } catch (err) {
                    Promise.reject(new err);
                }
            } else if (args[2] == 'set') {
                if (!value) return message.channel.send({ content: 'The number stated is not valid.' });

                try {
                    await Levels.setLevel(mentionedMember.user.id, message.guild.id, value);
                    message.channel.send({ content: `Set: ${mentionedMember.user.tag}'s level to ${value}` });
                } catch (err) {
                    Promise.reject(new err);
                }
            }
        }
    },
};
const Discord = require('discord.js');

module.exports = {
    name: "mod-nickname",
    description: "Moderate a user nickname.",
    aliases: ["mod-nick"],
    cooldown: 5,
    async execute(message, args, data, client) {
        if (!message.member.permissions.has('MANAGE_NICKNAMES')) return message.reply({ content: 'You do not have the permission \`MANAGE_NICKNAMES\`' });
        if (!message.guild.me.permissions.has("MANAGE_NICKNAMES")) return message.reply({ content: `I do not have the permission \`MANAGE_NICKNAMES\`` });

        let user = message.mentions.members.first();
        if (!user) user = message.guild.members.cache.get(args[0]);
        
        if (!user) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Mention a user to moderate.`).setColor('GREY')], allowedMentions: { repliedUser: false } });

        if (user.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`I cannot moderate a member's nickname that is higher/equal to my role`).setColor('GREY')], allowedMentions: { repliedUser: false } });
        if (user.roles.highest.position >= message.member.roles.highest.position) return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You cannot moderate a member's nickname that is higher/equal to your role`).setColor('GREY')], allowedMentions: { repliedUser: false } });

        function generateRandomString(length) {
            var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*()';
            var random_string = '';
            if (length > 0) {
                for (var i = 0; i < length; i++) {
                    random_string += chars.charAt(Math.floor(Math.random() * chars.length));
                };
            };
            return random_string;
        };

        const random = generateRandomString(6);

        let nickname = `Moderated Nickname ${random}`;

        try {
            await user.setNickname(nickname);
            message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`Moderated Nickname for **${user.user.tag}** to \`${nickname}\``).setColor("GREEN")] });
        } catch (err) {
            message.reply({ content: 'An error occured while trying to moderate the nickname of that user.' });
            console.log(err);
        };
    },
};
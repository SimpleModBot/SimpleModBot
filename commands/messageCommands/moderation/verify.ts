const Discord = require('discord.js');
const { Captcha } = require('captcha-canvas');
const { MessageAttachment } = require('discord.js');
const Guild = require('../../../database/models/guildSchema.ts');
const mongoose = require("mongoose");

module.exports = {
    name: "verify",
    cooldown: 25,
    async execute(message, args, data, client) {
        let guildProfile = await Guild.findOne({ guildID: message.guild.id });
        if (!guildProfile) {
            guildProfile = await new Guild({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id
            });
            await guildProfile.save().catch(err => Promise.reject(new err));
        };

        const memberRole = await message.guild.roles.cache.get(guildProfile.memberRoleID);
        if (memberRole) {
            if (message.member.roles.cache.has(memberRole)) {
                return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You are already verified.").setColor('GREY')] })
            } else {
                const captcha = new Captcha();
                captcha.async = true;
                captcha.addDecoy();
                captcha.drawTrace();
                captcha.drawCaptcha();

                const captchaAttachment = new MessageAttachment(await captcha.png, 'captcha.png');
                const msg = await message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Complete the captcha to verify!`).setImage('attachment://captcha.png').setColor('GREY')], files: [captchaAttachment], allowedMentions: { repliedUser: false } });

                const filter = (mesg) => {
                    if (mesg.author.id !== message.author.id) return;
                    if (mesg.content === captcha.text) return true;
                    else mesg.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Wrong answer!`).setColor('GREY')], allowedMentions: { repliedUser: false } });
                };

                try {
                    const response = await msg.channel.awaitMessages({
                        filter,
                        max: 1,
                        time: 15000,
                        errors: ['time']
                    });

                    if (response) {
                        message.member.roles.add(memberRole);
                        message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You have succesfully been verified in the server!").setColor('GREY')] });
                    };
                } catch (err) {
                    message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`You have not verified properly, please retry.`).setColor('GREY')], allowedMentions: { repliedUser: false } });
                };
            };
        } else {
            message.reply({ embeds: [new Discord.MessageEmbed().setDescription("This guild has no member role set, please ask the owner to set it with the command `config`").setColor('GREY')] });
        };
    },
};


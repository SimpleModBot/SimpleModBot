const Discord = require('discord.js');
const mongoose = require('mongoose');
const schema = require('../../../database/models/readyatSchema.ts');

module.exports = {
    name: "time",
    aliases: [""],
    cooldown: 3,
    devOnly: true,
    async execute(message, args, data, client) {
        if (args[0] == 'ENA') return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`Did you mean to do something?\nYou can \`reset\`, \`view\`, or \`change\` the time.`).setColor('GREY')], allowedMentions: { repliedUser: false } });

        let ready = await schema.findOne({ timezone: 'PST/Pacific Standard Time' });
        let time = Date.now();

        async function timeString() {
            const schema = require('../../../database/models/readyatSchema.ts');
            let ready = await schema.findOne({ timezone: 'PST/Pacific Standard Time' });
            let time = Date.now() - ready.time;
            let Days = Math.floor(time / 86400000);
            let Hours = Math.floor(time / 3600000) % 24;
            let Minutes = Math.floor(time / 60000) % 60;
            let Seconds = Math.floor(time / 1000) % 60;
            async function RemoveUseless(Duration) {
                return Duration.replace("`0` Day", "").replace("`0` Hour", "").replace("`0` Minute", "");
            };
            return await RemoveUseless(`\`${Days}\` ${Days > 1 ? "Days" : "Day"} \`${Hours}\` ${Hours > 1 ? "Hours" : "Hour"} \`${Minutes}\` ${Minutes > 1 ? "Minutes" : "Minute"} \`${Seconds}\` ${Seconds > 1 ? "Seconds" : "Second"}`);
        };

        if (args[0] == 'reset') {
            ready = await schema.findOne({ timezone: 'PST/Pacific Standard Time' });
            if (ready) {
                ready.time = time;
                ready.readable = await timeString();
                await ready.save();

                message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`I have reset the time!`).setColor('GREY')] });
            } else {
                const tim = new schema({
                    _id: new mongoose.Types.ObjectId,
                    time: time,
                    readable: await timeString(),
                });
                await tim.save();
                
                message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`I have created the time!`).setColor('GREY')] });
            };
        } else if (args[0] == 'view') {
            if (!ready) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`There is no time set!`).setColor('GREY')] });

            message.reply({ embeds: [new Discord.MessageEmbed().setDescription(`${ready.time}\n${await timeString()}`).setColor('GREY')], allowedMentions: { repliedUser: false } });
        } else if (args[0] == 'change') {
            ready = await schema.findOne({ timezone: 'PST/Pacific Standard Time' });
            if (!ready) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`There is no time set!`).setColor('GREY')] });
            if (!args[1]) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`You need to give a new time!`).setColor('GREY')] });

            ready.time = args[1];
            await ready.save();

            message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription(`I have changed the time.`).setColor('GREY')] });
        };
    },
};
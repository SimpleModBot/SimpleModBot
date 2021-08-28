const Discord = require("discord.js");
const { MessageButton } = require('discord.js');

module.exports = {
    name: 'calculator',
    aliases: ['calc'],
    DMU: true,
    cooldown: 45,
    async execute(message, args, data, client) {
        function i(length) {
            var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var result = '';
            for (var i = 0; i < length; i++) {
                result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
            }
            return result
        }

        let str = ' ';
        let stringify = new Discord.MessageEmbed()
            .setTitle("Calculator.")
            .setDescription('```\n' + str + '\n```')
            .setColor("RANDOM")
            .setFooter("Please Don't Spam The Buttons Or It Won't Respond Fast.")
            .setTimestamp();
        let timedout = new Discord.MessageEmbed()
            .setTitle("Calculator.")
            .setDescription('```\n' + str + '\n```')
            .setColor("RED")
            .setFooter("Calculator has timed out.")
            .setTimestamp();

        let calculator_ac = i(20)
        let calculator_e1 = i(20)
        let calculator_e2 = i(20)
        let calculator_uppercase = i(20)
        let calculator_7 = i(20)
        let calculator_8 = i(20)
        let calculator_9 = i(20)
        let calculator_plus = i(20)
        let calculator_minus = i(20)
        let calculator_star = i(20)
        let calculator_devide = i(20)
        let calculator_1 = i(20)
        let calculator_2 = i(20)
        let calculator_3 = i(20)
        let calculator_4 = i(20)
        let calculator_5 = i(20)
        let calculator_0 = i(20)
        let calculator_6 = i(20)
        let calculator_dot = i(20)
        let calculator_equal = i(20)

        let ac = new MessageButton().setLabel('CLR').setCustomId(calculator_ac).setStyle('DANGER')
        let e1 = new MessageButton().setLabel('(').setCustomId(calculator_e1).setStyle('PRIMARY')
        let e2 = new MessageButton().setLabel(')').setCustomId(calculator_e2).setStyle('PRIMARY')
        let uppercase = new MessageButton().setLabel('^').setCustomId(calculator_uppercase).setStyle('PRIMARY')
        let seven = new MessageButton().setLabel('7️').setCustomId(calculator_7).setStyle('SECONDARY')
        let eight = new MessageButton().setLabel('8️').setCustomId(calculator_8).setStyle('SECONDARY')
        let nine = new MessageButton().setLabel('9️').setCustomId(calculator_9).setStyle('SECONDARY')
        let slash = new MessageButton().setLabel('/').setCustomId(calculator_devide).setStyle('PRIMARY')
        let four = new MessageButton().setLabel('4️').setCustomId(calculator_4).setStyle('SECONDARY')
        let five = new MessageButton().setLabel('5️').setCustomId(calculator_5).setStyle('SECONDARY')
        let six = new MessageButton().setLabel('6️').setCustomId(calculator_6).setStyle('SECONDARY')
        let star = new MessageButton().setLabel('*').setCustomId(calculator_star).setStyle('PRIMARY')
        let one = new MessageButton().setLabel('1️').setCustomId(calculator_1).setStyle('SECONDARY')
        let two = new MessageButton().setLabel('2️').setCustomId(calculator_2).setStyle('SECONDARY')
        let three = new MessageButton().setLabel('3️').setCustomId(calculator_3).setStyle('SECONDARY')
        let minus = new MessageButton().setLabel('-').setCustomId(calculator_minus).setStyle('PRIMARY')
        let zero = new MessageButton().setLabel('0️').setCustomId(calculator_0).setStyle('SECONDARY')
        let dot = new MessageButton().setLabel('.').setCustomId(calculator_dot).setStyle('PRIMARY')
        let equal = new MessageButton().setLabel('=').setCustomId(calculator_equal).setStyle('SUCCESS')
        let plus = new MessageButton().setLabel('+').setCustomId(calculator_plus).setStyle('PRIMARY')

        let qac = new MessageButton().setLabel('CLR').setCustomId(calculator_ac).setStyle('DANGER').setDisabled()
        let qe1 = new MessageButton().setLabel('(').setCustomId(calculator_e1).setStyle('PRIMARY').setDisabled()
        let qe2 = new MessageButton().setLabel(')').setCustomId(calculator_e2).setStyle('PRIMARY').setDisabled()
        let quppercase = new MessageButton().setLabel('^').setCustomId(calculator_uppercase).setStyle('PRIMARY').setDisabled()
        let qseven = new MessageButton().setLabel('7️').setCustomId(calculator_7).setStyle('SECONDARY').setDisabled()
        let qeight = new MessageButton().setLabel('8️').setCustomId(calculator_8).setStyle('SECONDARY').setDisabled()
        let qnine = new MessageButton().setLabel('9️').setCustomId(calculator_9).setStyle('SECONDARY').setDisabled()
        let qslash = new MessageButton().setLabel('/').setCustomId(calculator_devide).setStyle('PRIMARY').setDisabled()
        let qfour = new MessageButton().setLabel('4️').setCustomId(calculator_4).setStyle('SECONDARY').setDisabled()
        let qfive = new MessageButton().setLabel('5️').setCustomId(calculator_5).setStyle('SECONDARY').setDisabled()
        let qsix = new MessageButton().setLabel('6️').setCustomId(calculator_6).setStyle('SECONDARY').setDisabled()
        let qstar = new MessageButton().setLabel('*').setCustomId(calculator_star).setStyle('PRIMARY').setDisabled()
        let qone = new MessageButton().setLabel('1️').setCustomId(calculator_1).setStyle('SECONDARY').setDisabled()
        let qtwo = new MessageButton().setLabel('2️').setCustomId(calculator_2).setStyle('SECONDARY').setDisabled()
        let qthree = new MessageButton().setLabel('3️').setCustomId(calculator_3).setStyle('SECONDARY').setDisabled()
        let qminus = new MessageButton().setLabel('-').setCustomId(calculator_minus).setStyle('PRIMARY').setDisabled()
        let qzero = new MessageButton().setLabel('0️').setCustomId(calculator_0).setStyle('SECONDARY').setDisabled()
        let qdot = new MessageButton().setLabel('.').setCustomId(calculator_dot).setStyle('PRIMARY').setDisabled()
        let qequal = new MessageButton().setLabel('=').setCustomId(calculator_equal).setStyle('SUCCESS').setDisabled()
        let qplus = new MessageButton().setLabel('+').setCustomId(calculator_plus).setStyle('PRIMARY').setDisabled()

        const filter = m => m.clicker.user.id == message.author.id;
        message.channel.send({
            components: [
                new Discord.MessageActionRow()
                    .addComponents(ac, e1, e2, uppercase),
                new Discord.MessageActionRow()
                    .addComponents(seven, eight, nine, slash),
                new Discord.MessageActionRow()
                    .addComponents(four, five, six, star),
                new Discord.MessageActionRow()
                    .addComponents(one, two, three, minus),
                new Discord.MessageActionRow()
                    .addComponents(dot, zero, equal, plus)
            ],
            embeds: [stringify],
        }).then(async (msg) => {
            async function edit() {
                msg.edit({
                    components: [
                        new Discord.MessageActionRow()
                            .addComponents(ac, e1, e2, uppercase),
                        new Discord.MessageActionRow()
                            .addComponents(seven, eight, nine, slash),
                        new Discord.MessageActionRow()
                            .addComponents(four, five, six, star),
                        new Discord.MessageActionRow()
                            .addComponents(one, two, three, minus),
                        new Discord.MessageActionRow()
                            .addComponents(dot, zero, equal, plus)
                    ],
                    embeds: [stringify],
                })
            }

            async function lock() {
                msg.edit({
                    components: [
                        new Discord.MessageActionRow()
                            .addComponents(qac, qe1, qe2, quppercase),
                        new Discord.MessageActionRow()
                            .addComponents(qseven, qeight, qnine, qslash),
                        new Discord.MessageActionRow()
                            .addComponents(qfour, qfive, qsix, qstar),
                        new Discord.MessageActionRow()
                            .addComponents(qone, qtwo, qthree, qminus),
                        new Discord.MessageActionRow()
                            .addComponents(qdot, qzero, qequal, qplus)
                    ],
                    embeds: [timedout],
                })
            }
            const calc = msg.componentCollector(filter, { time: 45000 })

            calc.on('collect', async btn => {
                btn.deferUpdate()
                if (btn.id === calculator_1) {
                    str = str + '1'
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_2) {
                    str = str + '2'
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_3) {
                    str = str + '3'
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_4) {
                    str = str + '4'
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_5) {
                    str = str + '5'
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_6) {
                    str = str + '6'
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_7) {
                    str = str + '7'
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_8) {
                    str = str + '8'
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_9) {
                    str = str + '9'
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_0) {
                    str = str + '0'
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_plus) {
                    str = str + '+'
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_minus) {
                    str = str + '-'
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_devide) {
                    str = str + '/'
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_uppercase) {
                    str = str + '^'
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_star) {
                    str = str + '*'
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_dot) {
                    str = str + '.'
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_ac) {
                    str = ' '
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_e1) {
                    str = str + '('
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_e2) {
                    str = str + ')'
                    stringify = new Discord.MessageEmbed()
                        .setTitle("Calculator.")
                        .setDescription('```\n' + str + '\n```')
                        .setColor("RANDOM")
                        .setTimestamp();
                    edit()
                } else if (btn.id === calculator_equal) {
                    try {
                        str = str + ' = ' + require('mathjs').evaluate(str) + ''
                        stringify = new Discord.MessageEmbed()
                            .setTitle("Calculator.")
                            .setDescription('```\n' + str + '\n```')
                            .setColor("RANDOM")
                            .setTimestamp();
                        edit()
                        str = ''
                        stringify = new Discord.MessageEmbed()
                            .setTitle("Calculator.")
                            .setDescription('```\n' + str + '\n```')
                            .setColor("RANDOM")
                            .setTimestamp();
                    } catch (e) {
                        message.channel.send('An invalid equation was entered!').then((m) => m.delete({ timeout: 2000 }))

                        stringify = new Discord.MessageEmbed()
                            .setTitle("Calculator.")
                            .setDescription('```\n' + str + '\n```')
                            .setColor("RANDOM")
                            .setTimestamp();
                    }
                }
            });

            calc.on('end', async btn => {
                lock();
            });
        });
    },
};
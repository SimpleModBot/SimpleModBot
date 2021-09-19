const jobs = require("../../../utils/json/jobs.json");
const Discord = require('discord.js');

module.exports = {
    name: "work",
    cooldown: 9000,
    async execute(message, args, data, client) {
        let userProfile = await client.data.getBalanceDB(message.author.id);
        if (!userProfile) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You have no Bot Wallet, please use the `balance`/`bal` command to create one.").setColor('GREY')] });
        if (!userProfile.job) userProfile.job = "none";
        if (!userProfile.exp) userProfile.exp = 0;
        await userProfile.save();

        let moneys = 0;
        let xps = 0;

        if (userProfile.job == "none") return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You don't have a job. Please get a job from the \`jobs\` command.").setColor('GREY')] });
        else if (userProfile.job == jobs.SMBG_N) {
            moneys = Math.floor(Math.random() * jobs.SMBG_P2) + jobs.SMBG_P2;
            xps = jobs.SMBG_PEXP;
            userProfile.balance = userProfile.balance + moneys;
            userProfile.exp = userProfile.exp + xps;
            message.channel.send({ embeds : [new Discord.MessageEmbed().setDescription(`You gained $${moneys} from working!`).setColor('GREY')] });

        } else if (userProfile.job == jobs.BC_N) {
            moneys = Math.floor(Math.random() * jobs.BC_P2) + jobs.BC_P2;
            xps = jobs.BC_PEXP;
            userProfile.balance = userProfile.balance + moneys;
            userProfile.exp = userProfile.exp + xps;
            message.channel.send({ embeds : [new Discord.MessageEmbed().setDescription(`You gained $${moneys} from working!`).setColor('GREY')] });

        } else if (userProfile.job == jobs.BT_N) {
            moneys = Math.floor(Math.random() * jobs.BT_P2) + jobs.BT_P2;
            xps = jobs.BT_PEXP;
            userProfile.balance = userProfile.balance + moneys;
            userProfile.exp = userProfile.exp + xps;
            message.channel.send({ embeds : [new Discord.MessageEmbed().setDescription(`You gained $${moneys} from working!`).setColor('GREY')] });

        } else if (userProfile.job == jobs.DJ_N) {
            moneys = Math.floor(Math.random() * jobs.DJ_P2) + jobs.DJ_P2;
            xps = jobs.DJ_PEXP;
            userProfile.balance = userProfile.balance + moneys;
            userProfile.exp = userProfile.exp + xps;
            message.channel.send({ embeds : [new Discord.MessageEmbed().setDescription(`You gained $${moneys} from working!`).setColor('GREY')] });

        }
        await userProfile.save();
    },
};
const jobs = require("../../../utils/json/jobs.json");
const Discord = require("discord.js");

module.exports = {
    name: "jobs",
    cooldown: 10,
    async execute(message, args, data, client) {
        let userProfile = await client.data.getBalanceDB(message.author.id);
        if (!userProfile) return message.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("You have no Bot Wallet, please use the `balance`/`bal` command to create one.").setColor('GREY')] });
        if (!userProfile.job) userProfile.job = "none";
        if (!userProfile.exp) userProfile.exp = 0;

        const jobsEmbed = new Discord.MessageEmbed()
            .setTitle("SimpleModBot Job List.")
            .setDescription(`__These are all the available jobs in the current economy.__
            \nYou can get a job by using \`${client.prefix}jobs [jobID]\`.
            If you already have a job, applying for a new one **will** override your current one and won't reset the work cooldown.`)
            .addField(`**[SMBG]**\`${jobs.SMBG_N}\`.`, `**Pays** \`$${jobs.SMBG_P1}\`-\`$${jobs.SMBG_P2}\`.
            Requires \`${jobs.SMBG_EXP}\` job experience.`, true)

            .addField(`**[BC]**\`${jobs.BC_N}\`.`, `Pays \`$${jobs.BC_P1}\`-\`$${jobs.BC_P2}\`
            Requires \`${jobs.BC_EXP}\` job experience.`, true)

            .addField(`**[BT]**\`${jobs.BT_N}\`.`, `**Pays** \`$${jobs.BT_P1}\`-\`$${jobs.BT_P2}\`.
            Requires \`${jobs.BT_EXP}\` job experience.`, true)

            .addField(`**[DJ]**\`${jobs.DJ_N}\`.`, `**Pays** \`$${jobs.DJ_P1}\`-\`$${jobs.DJ_P2}\`.
            Requires \`${jobs.DJ_EXP}\` job experience.`, true)

            .setFooter({ text: `Your current job is ${userProfile.job}.` })
            .setColor("GREEN")
            .setTimestamp();

        if (args[0] == "ENA") return message.channel.send({ embeds: [jobsEmbed] });
        else if (args[0] == "SMBG") {
            if (userProfile.exp < jobs.SMBG_EXP) {
                return message.reply({ content: `You need ${jobs.SMBG_EXP - userProfile.exp} more experience to apply!` });
            } else if (userProfile.exp >= jobs.SMBG_EXP) {
                userProfile.job = jobs.SMBG_N;
                await userProfile.save();
                message.channel.send({ content: `Congratulations! You have successfully changed your job to \`${jobs.SMBG_N}\`!\nI really hope you had an immense amount of fun somehow grinding to this point!` });
            };
        } else if (args[0] == "BC") {
            if (userProfile.exp < jobs.BC_EXP) {
                return message.reply({ content: `You need ${jobs.BC_EXP - userProfile.exp} more experience to apply!` });
            } else if (userProfile.exp >= jobs.BC_EXP) {
                userProfile.job = jobs.BC_N;
                await userProfile.save();
                message.channel.send({ content: `You have successfully changed your job to \`${jobs.BC_N}\`!` });
            };
        } else if (args[0] == "BT") {
            if (userProfile.exp < jobs.BT_EXP) {
                return message.reply({ content: `You need ${jobs.BT_EXP - userProfile.exp} more experience to apply!` });
            } else if (userProfile.exp >= jobs.BT_EXP) {
                userProfile.job = jobs.BT_N;
                await userProfile.save();
                message.channel.send({ content: `You have successfully changed your job to \`${jobs.BT_N}\`!` });
            };
        } else if (args[0] == "DJ") {
            userProfile.job = jobs.DJ_N;
            await userProfile.save();
            message.channel.send({ content: `You have successfully changed your job to \`${jobs.DJ_N}\`!` });
        }
    },
};
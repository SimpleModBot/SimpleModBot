const jobs = require("../../../utils/json/jobs.json");

module.exports = {
    name: "work",
    cooldown: 9000,
    async execute(message, args, data, client) {
        let userProfile = await client.data.getBalanceDB(message.author.id);
        if (!userProfile) return message.channel.send({ content: "You have no Bot Wallet, please use the `balance`/`bal` command to create one." });
        if (!userProfile.job) userProfile.job = "none";
        if (!userProfile.exp) userProfile.exp = 0;
        await userProfile.save();

        let moneys = 0;
        let xps = 0;

        if (userProfile.job == "none") return message.channel.send({ content: "You don't have a job. Please get a job from the \`jobs\` command." });
        else if (userProfile.job == jobs.SMBG_N) {
            moneys = Math.floor(Math.random() * jobs.SMBG_P2) + jobs.SMBG_P2;
            xps = jobs.SMBG_PEXP;
            userProfile.balance = userProfile.balance + moneys;
            userProfile.exp = userProfile.exp + xps;
            message.channel.send({ content: `You gained $${moneys} from working!` });

        } else if (userProfile.job == jobs.BC_N) {
            moneys = Math.floor(Math.random() * jobs.BC_P2) + jobs.BC_P2;
            xps = jobs.BC_PEXP;
            userProfile.balance = userProfile.balance + moneys;
            userProfile.exp = userProfile.exp + xps;
            message.channel.send({ content: `You gained $${moneys} from working!` });

        } else if (userProfile.job == jobs.BT_N) {
            moneys = Math.floor(Math.random() * jobs.BT_P2) + jobs.BT_P2;
            xps = jobs.BT_PEXP;
            userProfile.balance = userProfile.balance + moneys;
            userProfile.exp = userProfile.exp + xps;
            message.channel.send({ content: `You gained $${moneys} from working!` });

        } else if (userProfile.job == jobs.DJ_N) {
            moneys = Math.floor(Math.random() * jobs.DJ_P2) + jobs.DJ_P2;
            xps = jobs.DJ_PEXP;
            userProfile.balance = userProfile.balance + moneys;
            userProfile.exp = userProfile.exp + xps;
            message.channel.send({ content: `You gained $${moneys} from working!` });

        }
        await userProfile.save();
    },
};
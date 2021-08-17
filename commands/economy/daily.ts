module.exports = {
    name: "daily",
    cooldown: 86400,
    async execute(message, args, data, client) {
        const moneys = Math.floor(Math.random() * 15000) + 5000;
        const balance = await client.data.getBalanceDB(message.author.id);
        if (!balance) return message.channel.send({ content: "You need to create a wallet. You can do this by using the `balance`/`bal` command." });
        balance.balance = balance.balance + moneys;
        await balance.save();
        message.reply({ content: `You have collected \`$${moneys}\` from your daily cash!` });
    },
};
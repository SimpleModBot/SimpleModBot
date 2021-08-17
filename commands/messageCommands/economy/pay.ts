const Balance = require('../../../database/models/balanceSchema.ts');
const mongoose = require("mongoose");

module.exports = {
    name: "pay",
    async execute(message, args, data, client) {
        const Member = message.member.id;
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mentionedMember) return message.channel.send({ content: "Please mention a user to pay or give me a valid user ID from this server." });
        if (mentionedMember.user.id === Member) return message.channel.send({ content: "You can not pay yourself as there is no point, and there is a glitch when doing so :)" });
        if (args[1] == "ENA") return message.channel.send({ content: "Please say how much you would like to pay them." });
        const pay = parseInt(args[1]);

        let balanceProfile1 = await Balance.findOne({ userID: Member });
        if (!balanceProfile1) {
            balanceProfile1 = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: Member,
                balance: 0,
            });
            await balanceProfile1.save().catch(err => console.log(err));
        };
        let balanceProfile2 = await Balance.findOne({ userID: mentionedMember.user.id });
        if (!balanceProfile2) {
            balanceProfile2 = await new Balance({
                _id: mongoose.Types.ObjectId(),
                userID: mentionedMember.user.id,
                balance: 0,
            });
            await balanceProfile2.save().catch(err => console.log(err));
        };

        try {
            if (balanceProfile1.balance < pay) return message.channel.send({ content: "You do not have enough money to give the user this amount." });
            await Balance.findOneAndUpdate({ userID: Member }, { balance: balanceProfile1.balance - pay });
            await Balance.findOneAndUpdate({ userID: mentionedMember.user.id }, { balance: balanceProfile2.balance + pay });

            message.channel.send({ content: `Successfully gave ${mentionedMember.user.tag} $${pay}!` });
        } catch (err) {
            message.channel.send({ content: "The number stated for pay is invalid." });
        }
    },
};
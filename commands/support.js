

module.exports = {
    name: 'support',
    description: 'Gives a link to the support/community server',
    async execute(message, args, client) {

        message.channel.send("To receive direct support join the support/community server: https://discord.gg/26NtPVvNCU");
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};
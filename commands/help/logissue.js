

module.exports = {
    name: 'logissue',
    aliases: ['log'],
    description: 'Sends a message to the console.',
    async execute(message, args, client) {

        console.log(message.content);
        message.channel.send("I have sent a bug report into the console. Please do not flood the console or I will blacklist you.");
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};
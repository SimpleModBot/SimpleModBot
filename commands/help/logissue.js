

module.exports = {
    name: 'logissue',
    aliases: ['log'],
    description: 'Sends a message to the console.',
    async execute(message, args, client) {
        const consoleMessage = args.join(" ");
        console.log(`[${message.author.id}] sent: `+ consoleMessage);
        message.channel.send("I have succesfully sent your message to the console. Please do not flood it or you will be blacklisted.");
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};
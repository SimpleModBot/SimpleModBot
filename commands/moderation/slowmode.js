

module.exports = {
    name: 'slowmode',
    aliases: ['slow'],
    description: 'Changes the slowmode for the selected channel(s).',
    async execute(message, args, client) {

        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You dont have permission to use this Command.");
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I need the permission `MANAGE_CHANNELS` to do this.");

        const value = Number(args[0]);

        if (!args[0]) return message.channel.send("You need to say a number for how many seconds you want the slowmode to be.");
        if (!value || value < 5 || value > 21600) return message.channel.send("You need to say a number from 5-21600 in seconds.");
        try {
            await message.channel.setRateLimitPerUser(value);
            message.channel.send(`The channels slowmode has been set to ${value} seconds for ${message.channel}!`);
        } catch (err) {
            const errorChannel = await client.channels.cache.get("832744410998767666");
            const errorMessage = new Discord.MessageEmbed()
                .setTitle("An error has occured!")
                .setDescription(err)
                .setTimestamp()
                .setColor("#ff0a0a");
            errorChannel.send(errorMessage);
            message.channel.send("There was an error while setting the slowmode.");
        }
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};
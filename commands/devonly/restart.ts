module.exports = {
    name: "restart",
    aliases: ["res"],
    DMU: true,
    devOnly: true,
    async execute(message, args, data, client) {
        var spawn = require('child_process').spawn;

        await message.channel.send({ content: "Restarting bot.." });
        if (process.env.process_restarting) {
            delete process.env.process_restarting;
            return;
        }

        spawn(process.argv[0], process.argv.slice(1), {
            env: { process_restarting: 1 },
            stdio: 'ignore',
            detached: true
        }).unref();

        await message.reply({ content: "I have successfully restarted!" });
        process.exit();
    },
};
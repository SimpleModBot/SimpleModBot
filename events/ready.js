const timestamp = require('console-timestamp');
const now = new Date();
const number = 478921;
const fs = require('fs');
const ascii = require('ascii-table');
let table = new ascii("Commands");
table.setHeading('Commands', 'Status');

module.exports = {
    name: 'ready',
    async execute(client) {
        try {
            fs.readdirSync('./commands/').forEach(dir => {
                const commands = fs.readdirSync(`./commands/${dir}`).filter(files => files.endsWith('.js'));
                for (let files of commands) {
                    let get = require(`../commands/${dir}/${files}`);
                    if (get.name) {
                        table.addRow(files, 'Success Loading')
                    } else {
                        table.addRow(files, 'Failed To Load');
                        continue;
                    }
                }
            })
            console.log(table.toString());

            let serverIn = await client.guilds.cache.size;
            let serverMembers = await client.users.cache.size;
            console.log('[hh:mm:ss] '.timestamp + client.user.tag + " has logged in.");

            const statuses = [
                `for if anyone wants a //hug`,
                `For //help`,
                `For //support`,
                `${serverIn} servers.`,
                `${serverMembers} members.`
            ];
            let index = 0;
            setInterval(() => {
                if (index === statuses.length) index = 0;
                const status = statuses[index];
                client.user.setPresence({
                    activity: {
                        name: `${status}`,
                        type: "WATCHING",
                    }, status: "online",
                }).catch(console.error);
                index++;
            }, 15000);
        } catch (err) {
            const errorChannel = await client.channels.cache.get("832744410998767666");
            const errorMessage = new Discord.MessageEmbed()
                .setTitle("An error has occured!")
                .setDescription(err)
                .setTimestamp()
                .setColor("#ff0a0a");
            errorChannel.send(errorMessage);
            message.channel.send("I was unable to kick the mentioned member.");
        }
    },
};
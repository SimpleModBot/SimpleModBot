const fetch = require("node-fetch");

module.exports = {
    name: "youtubetogether",
    aliases: ["ytt"],
    execute(message, args, data, client) {
        const { channel } = message.member.voice;
        if (!channel) return message.reply("You need to join a Voice Channel")
        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${data.config.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(invite => {
                if (!invite.code) return message.reply({ content: "Could not start game." })
                message.channel.send({ content: `Click on the Link to start the GAME:\n> https://discord.com/invite/${invite.code}` })
            });
    },
};
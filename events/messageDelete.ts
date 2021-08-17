module.exports = {
    name: 'messageDelete',
    async execute(message, client) {
        let snipes = client.snipes.get(message.channel.id) || [];
        if (snipes.length > 9) snipes = snipes.slice(0, 8);

        snipes.unshift({
            msg: message,
            image: message.attachments.first()?.proxyURL || null,
            time: Date.now(),
        });

        client.snipes.set(message.channel.id, snipes);
    },
};
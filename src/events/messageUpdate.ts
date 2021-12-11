const mongis = require('../database/mongoose.ts');

module.exports = {
    name: 'messageUpdate',
    async execute(message1, message2, client) {
        await mongis.init();
        client.emit('antiInviteMessageUpdate', message1, message2, client);

        let snipes = client.editsnipes.get(message1.channel.id) || [];
        if (snipes.length > 9) snipes = snipes.slice(0, 8);

        snipes.unshift({
            msg1: message1,
            msg2: message2,
            image: message1.attachments.first()?.proxyURL || null,
            time: Date.now(),
        });

        client.editsnipes.set(message1.channel.id, snipes);
    },
};
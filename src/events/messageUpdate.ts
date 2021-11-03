const mongis = require('../database/mongoose.ts');

module.exports = {
    name: 'messageUpdate',
    async execute(message1, message2, client) {
        await mongis.init();
        client.emit('antiInviteMessageUpdate', message1, message2, client);
    },
};
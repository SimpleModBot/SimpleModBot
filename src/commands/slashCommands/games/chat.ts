const Discord = require('discord.js');

module.exports = {
    name: 'chat',
    description: 'Chat with an AI!',
    userPermissions: ['SEND_MESSAGES'],
    botPermissions: ['SEND_MESSAGES'],
    options: [
        {
            name: 'message',
            description: 'What you would like to say.',
            type: 'STRING',
            required: true,
            default: 'Hello!',
        },
    ],
    async execute(interaction, args, client) {
        const [message] = args;

        async function chatBot(message, input) {
            if (!message) throw new ReferenceError('simplemodbot => "message" is not defined');
            if (!input) throw new ReferenceError('simplemodbot => "input" is not defined');

            const fetch = require("node-fetch");
            try {
                fetch(`https://api.monkedev.com/fun/chat?msg=${encodeURIComponent(input)}&uid=${message.member.id}`)
                    .then((res) => res.json())
                    .then(async (json) => {
                        return message.reply({ embeds: [new Discord.MessageEmbed().setDescription(json.response).setColor('GREY')], allowedMentions: { everyone: false } });
                    });
            } catch (err) {
                console.log(err);
            };
        };

        chatBot(interaction, message);
    },
};
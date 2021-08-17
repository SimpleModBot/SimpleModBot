module.exports = {
    name: "uselessbuttonbutton",
    buttonActivated: true,
    execute(message, args, data, client) {
        message.channel.send({ content: "Wow, you clicked the useless button.. How do you feel?" });
    },
};
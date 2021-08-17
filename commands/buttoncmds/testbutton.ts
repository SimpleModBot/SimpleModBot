module.exports = {
    name: "testbutton",
    buttonActivated: true,
    async execute(message, args, data, client) {
        message.channel.send({ content: "You have activated a button, cool!" });
    },
};
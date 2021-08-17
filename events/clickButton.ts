module.exports = {
    name: "clickButton",
    async execute(button, client) {
        if (button.id === "testbutton") {
            client.commands.get("testbutton").execute(button, client);
            button.defer();
        } else if (button.id === "uselessbutton") {
            client.commands.get("uselessbuttonbutton").execute(button, client);
            button.defer();
        } else if (button.id === "fyou") {
            button.reply.send(`You idiot ${button.clicker.member}, I told you not to click it!`);
        }
    },
};
module.exports = {
    async figlets() {
        const figlet = require("figlet");
        const rgb = require("lolcatjs");

        const SMB = figlet.textSync("SimpleModBot", {
            font: 'broadway',
            horizontalLayout: 'fitted',
            verticalLayout: 'fitted',
            width: 500,
            whitespaceBreak: true
        });

        rgb.fromString(SMB);
        //acrobatic
        //avatar
        //broadway
        //cosmike
        //poison
        //https://gist.github.com/LunaCodeGirl/6707775
    },
};
module.exports = {
    name: "blobchain",
    cooldown: 5,
    execute(message, args, data, client) {
        let messageToSend = "<a:blobchain:832059060533854208>";
        const blobNumber = Math.floor(Math.random() * 6) + 1;
        if (blobNumber == '1') messageToSend = "<a:blobchain:832059060533854208>";
        if (blobNumber == '2') messageToSend = "<a:blobchain:832059060533854208><a:blobchain:832059060533854208>";
        if (blobNumber == '3') messageToSend = "<a:blobchain:832059060533854208><a:blobchain:832059060533854208><a:blobchain:832059060533854208>";
        if (blobNumber == '4') messageToSend = "<a:blobchain:832059060533854208><a:blobchain:832059060533854208><a:blobchain:832059060533854208><a:blobchain:832059060533854208>";
        if (blobNumber == '5') messageToSend = "<a:blobchain:832059060533854208><a:blobchain:832059060533854208><a:blobchain:832059060533854208><a:blobchain:832059060533854208><a:blobchain:832059060533854208>";
        if (blobNumber == '6') messageToSend = "<a:blobchain:832059060533854208><a:blobchain:832059060533854208><a:blobchain:832059060533854208><a:blobchain:832059060533854208><a:blobchain:832059060533854208><a:blobchain:832059060533854208>";
        if (blobNumber == '7') messageToSend = "<a:blobchain:832059060533854208><a:blobchain:832059060533854208><a:blobchain:832059060533854208><a:blobchain:832059060533854208><a:blobchain:832059060533854208><a:blobchain:832059060533854208><a:blobchain:832059060533854208>";
        message.channel.send({ content:messageToSend});

        if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};
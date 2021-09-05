const Discord = require('discord.js');
const got = require('got');

module.exports = {
    name: "waifu",
    description: "Sends a random anime waifu from reddit",
    async execute(message, args, data, client) {
        const channel = message.channel.nsfw
        if (!channel) return message.reply({ content: `Make sure this channel is marked NSFW before using this command!` });

        const embed = new Discord.MessageEmbed()
        got('https://reddit.com/r/animewaifus/random.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let Url = `https://reddit.com${permalink}`;
            let Image = content[0].data.children[0].data.url;
            let Title = content[0].data.children[0].data.title;
            let Upvotes = content[0].data.children[0].data.ups;
            let Downvotes = content[0].data.children[0].data.downs;
            let NumComments = content[0].data.children[0].data.num_comments;
            embed.setTitle(`${Title}`)
            embed.setURL(`${Url}`)
            embed.setImage(Image)
            embed.setColor('RANDOM')
            embed.setFooter(`👍 ${Upvotes} 👎 ${Downvotes} 💬 ${NumComments}`)

            message.channel.send({ embeds: [embed] });
        })
    },
};
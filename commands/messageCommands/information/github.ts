const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch");

module.exports = {
    name: "github",
    aliases: [""],
    description: `Github User Account Information!`,
    async execute(message, args, data, client) {
        try {
            if (args[0] == 'ENA') return message.channel.send(`Please give me a username!`)

            fetch(`https://api.github.com/users/${args.join('-')}`)
                .then(res => res.json()).then(body => {
                    if (body.message) return message.channel.send(`User not found. Please give me a valid username!`);
                    let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;

                    const embed = new MessageEmbed()
                        .setAuthor(`${login} Information!`, avatar_url)
                        .setColor(`#211F1F`)
                        .setThumbnail(`${avatar_url}`)
                        .addField(`Username`, `${login}`, true)
                        .addField(`ID`, `${id}`, true)
                        .addField(`Bio`, `${bio || "No bio."}`, true)
                        .addField(`Public Repositories`, `${public_repos || "None."}`, true)
                        .addField(`Followers`, `${followers}`, true)
                        .addField(`Following`, `${following}`, true)
                        .addField(`Location`, `${location || "No Location"}`)
                        .addField(`Account Created`, moment.utc(created_at).format("dddd, MMMM, Do YYYY"))
                        .setColor('GREY')
                        .setFooter(`Requested by: ${message.author.username}`);

                    message.channel.send({ embeds: [embed] });

                })

        } catch (error) {
            return message.channel.send({ content: `Something Went Wrong Try Again Later!` })
        }
    },
};
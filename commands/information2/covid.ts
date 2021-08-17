const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "covid",
    DMU: true,
    async execute(message, args, data, client) {
        let countries = args.join(" ");
        if (!countries) return message.channel.send({ content: `Please Provide a Country, or Say "${client.prefix}covid all"` });

        if (args[0] === "all") {
            fetch(`https://covid19.mathdro.id/api`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`🌎Worldwide COVID-19 Stats🌎`)
                        .addField('Confirmed Cases', confirmed)
                        .addField('Recovered', recovered)
                        .addField('Deaths', deaths)

                    message.channel.send({ embeds: [embed] })
                })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
                .then(response => response.json())
                .then(data => {
                    let confirmed = data.confirmed.value.toLocaleString()
                    let recovered = data.recovered.value.toLocaleString()
                    let deaths = data.deaths.value.toLocaleString()

                    const embed = new Discord.MessageEmbed()
                        .setTitle(`COVID-19 Stats for **${countries}**`)
                        .addField('Confirmed Cases', confirmed)
                        .addField('Recovered', recovered)
                        .addField('Deaths', deaths)
                        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setTimestamp()

                    message.channel.send({ embeds: [embed] })
                }).catch(e => {
                    return message.channel.send({ content: `Invalid Country.` })
                })
        }
    },
};
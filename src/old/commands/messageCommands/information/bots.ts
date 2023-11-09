const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "bots",
    description: "See all bots in the server.",
    async execute(message, args, data, client) {
        let members = message.guild.members.cache.filter(u => u.user.bot).map((u) => `${u.user.tag} (\`${u.id}\`)`)
        const total_members = members.length
        members = total_members > 10 ? members.slice(0, 10).join("\n") : members.join("\n")
        if (members.length <= 0) {
            members = "No Bots"
        }

        const embed = new MessageEmbed()
            .setDescription(`There is a total of **${total_members}** bots in **${message.guild.name}**`)
            .addFields({ name: "**Discord Bots**:", value: `${total_members > 10 ? `${members}\nand ${total_members - 10} more.` : members}` })
            .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: client.user.displayAvatarURL() })
            .setColor("GREY")

        return message.reply({ embeds: [embed] })
    },
};
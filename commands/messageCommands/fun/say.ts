const Discord = require("discord.js");

module.exports = {
  name: 'say',
  description: 'Says a message in a nice embed.',
  async execute(message, args, data, client) {
    if (args[0] == "ENA") return message.channel.send({ content: "Please give me something to say!" });
    const messageToSay = args.join(" ");
    if (messageToSay.length > 2048) return message.channel.send({ content: "This message is too big for me to say!" });

    const sayEmbed = new Discord.MessageEmbed()
      .setDescription(`${messageToSay}\u200b`)
      .setFooter(message.author.tag, message.author.displayAvatarURL())
      .setColor("#4daf8")
      .setTimestamp();

    try {
      message.channel.send({embeds:[sayEmbed]});
    } catch (err) {
      message.channel.send({ content: "I am unable to send that message." });
      Promise.reject(new err);
    }

    if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
      message.delete();
    }
  }
};
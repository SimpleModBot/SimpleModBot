const Discord = require("discord.js");

module.exports = {
  name: 'say',
  description: 'Says a message in a nice embed.',
  async execute(message, args, client) {
    const messageToSay = args.join(" ");
    if (messageToSay.length > 280) return message.channel.send("This message is too big for me to say!");
    const sayEmbed = new Discord.MessageEmbed()
      .setTitle(`${messageToSay}`)
      .setFooter(message.author.tag, message.author.displayAvatarURL())
      .setColor("#4daf8")
      .setTimestamp();
    try {
      message.channel.send(sayEmbed);
    } catch (err) {
      console.log(err);
      message.channel.send("I am unable to send that message.");
    }
    if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      message.delete();
    }
  }
};
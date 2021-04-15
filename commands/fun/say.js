const Discord = require("discord.js");

module.exports = {
  name: 'say',
  cooldown: 3,
  description: 'Says a message in a nice embed.',
  execute(message, args, client) {
    const messageToSay = args.join(" ");
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
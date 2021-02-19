const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'fun', []);
  }

  run(client, message, args) {
    const messageToSay = args.join(" ");
    const sayEmbed = new Discord.MessageEmbed()
    .setTitle(`${messageToSay}`)
    .setFooter(message.author.tag ,message.author.displayAvatarURL())
    .setColor("#4daf8")
    .setTimestamp();
    try {
      message.channel.send(sayEmbed);
    } catch (err) {
      console.log(err);
      message.channel.send('I am unable to send that message.");')
    }
    message.delete();
  }
}
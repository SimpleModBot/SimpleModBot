const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class ServersCommand extends BaseCommand {
  constructor() {
    super('servers', 'information', []);
  }

  async run(client, message, args) {
    let serverIn = await client.guilds.cache.size;
    const serverEmbed = new Discord.MessageEmbed()
    .setTitle(`Number of Servers I'm in:`)
    .setDescription(`${serverIn}`)
    .setFooter(message.author.tag ,message.author.displayAvatarURL())
    .setColor("#4daf8")
    .setTimestamp();
    try {
      message.channel.send(serverEmbed);
    } catch (err) {
      console.log(err);
      message.channel.send('I am unable to send the embed counter.");')
    }
    client.user.setPresence({
      activity: {
        name: `${serverIn} servers. //help`,
        type: "WATCHING"
      }, status: 'online'
    })
      .catch(console.error);

    if (message.guild.me.hasPermission("MANAGE_MESSAGES")) { message.delete() };
  }
}
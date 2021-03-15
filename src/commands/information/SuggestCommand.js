const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");

module.exports = class SuggestCommand extends BaseCommand {
  constructor() {
    super("suggest", "information", ["suggestion"]);
  }

  async run(client, message, args) {
    let suggestion = args.join(" ");
    if (!args[0])
      return message.channel.send("You must state something to suggest.");
    const embed = new Discord.MessageEmbed()
      .setTitle(`Suggestion:`)
      .addField(`${suggestion}`, `This was suggested by ${message.author.tag}`);

    message.channel
      .send(embed)
      .then((sentMessage) => sentMessage.react("👍"))
      .then((reaction) => reaction.message.react("👎"));
    if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      message.delete();
    }
  }
};

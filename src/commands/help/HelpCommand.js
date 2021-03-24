const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super("help", "information", []);
  }

  run(client, message, args) {
    const sectionEmbed = new Discord.MessageEmbed()
      .setTitle("Bot Help Sections")
      .setDescription("Use //help sectionName to access another section.\nSections: \nfun \nhelp \ninformation \nmoderation")
      .addField("Fun Commands", "Commands that all users can use that are for fun.")
      .addField("Help Commands", "Commands That are used for help with this bot.")
      .addField("Information Commands", "Commands that return some information.")
      .addField("Moderation Commands", "Commands that are for moderation within a server.").setFooter(client.user.tag, client.user.displayAvatarURL());

    const infoEmbed = new Discord.MessageEmbed()
      .setTitle("Information Commands.")
      .addField("`Calculate` Commands", "Allows you to calculate math problems with `+, -, x, or /`\nAliases: `Calc`")
      .addField("`Ping` Command", "Gives the bots ping from you to the bot back to you.")
      .addField("`Servers` Command", "Shows a more accurate and nicer counter of the bots server count.")
      .addField("`Social` Command", "Displays social media in an embed and bot invite.")
      .addField("`Suggest` Command", "Displays your message as a suggestion for whatever channel your in.")
      .addField("`Uptime` Commands", "Shows how long the bot has been online for.\nAliases: `up`")
      .addField("`Vote` Command", "Creates a poll in the current channel for people to vote on something.")
      .addField("`website` Commands", "Sends a link to the official website.\nAliases: `web`");

    const funEmbed = new Discord.MessageEmbed()
      .setTitle("`Fun` Commands.")
      .addField("`Avatar` Command", "Returns a users avatar.")
      .addField("`hug` Command", "Gives you or the mentioned member a hug :)")
      .addField("`Meme` Command", "Returns a Meme to the channel.")
      .addField("`Nickname` Commands", "Changes a members nickname in a server\nAliases: `Nick`")
      .addField("`RockPaperScissors` Commands", "Plays a game of rock paper scissors with the user!\nAliases: `rps`")
      .addField("`Say` Command", "Make the bot say a message to the channel.");

    const moderationEmbed = new Discord.MessageEmbed()
      .setTitle("Moderation Commands.")
      .addField("`Ban` Command", "Bans a member from the server")
      .addField("`Kick` Command", "Kicks a member from the server")
      .addField("`Mute` Command `WIP`", "Mutes a member in the server")
      .addField("`Nuke` Command", "Clones a channel and deletes the old one.")
      .addField("`Purge` Command", "Purges messages within a channel")
      .addField("`Slowmode` Command", "Changes slowmode of current channel")
      .addField("`Unban` Command", "Unbans a member from the server")
      .addField("`Unmute` Command `WIP`", "Unmutes a member in a server")
      .addField("`warn` Command", "Warns a user and gives them a role to track their warnings.");

    const helpEmbed = new Discord.MessageEmbed()
      .setTitle("Help Commands.")
      .addField("`help` Command", "Gives you the list of commands you can use")
      .addField("`LogIssue` Commands", "Sends your message into the log so you can report issues that I dont see in testing.\nAliases: `Log`")
      .addField("`Support` Command", "Sends a link to the server where you can get support");

    if (!args[0]) return message.channel.send(sectionEmbed);
    if (args[0] == "information") return message.channel.send(infoEmbed);
    else if (args[0] == "fun") return message.channel.send(funEmbed);
    else if (args[0] == "moderation") return message.channel.send(moderationEmbed);
    else if (args[0] == "help") return message.channel.send(helpEmbed);

    if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {message.delete();}
  }
};

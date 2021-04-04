const Discord = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Sends a list of all the commands',
    async execute(message, args, client) {

        const sectionsEmbed = new Discord.MessageEmbed()
            .setTitle("Bot Help Sections")
            .setDescription("Use //help (sectionName) to access another section.\nSections: \n**database** \n**devonly** \n**fun** \n**help** \n**information** \n**moderation**")
            .addField("Database Commands", "Commands that interact with the database.")
            .addField("DevOnly Commands", "Commands that are only for developers.")
            .addField("Fun Commands", "Commands that all users can use that are for fun.")
            .addField("Help Commands", "Commands That are used for help with this bot.")
            .addField("Information Commands", "Commands that return some information.")
            .addField("Moderation Commands", "Commands that are for moderation within a server.").setFooter(client.user.tag, client.user.displayAvatarURL());
        
        const databaseEmbed = new Discord.MessageEmbed()
            .setTitle("`Database` Commands")
            .addField("`edit`", "Edits the mentioned users xp or level.")
            .addField("`leaderboard`", "Shows the servers leaderboard.\n**Aliases:** leaders")
            .addField("`level`", "shows you or the mentioned users current level in the server.");
        
        const devOnlyEmbed = new Discord.MessageEmbed()
            .setTitle("`Developer Only` Commands.")
            .addField("`blacklist`", "Blacklists a user form interacting with the bot");
        
        const funEmbed = new Discord.MessageEmbed()
            .setTitle("`Fun` Commands.")
            .addField("`avatar`", "Returns a users avatar.")
            .addField("`hug`", "Gives you or the mentioned member a hug :)")
            .addField("`meme`", "Returns a Meme to the channel.")
            .addField("`rockpaperscissors`", "Plays a game of rock paper scissors with the user!\n**Aliases:** rps")
            .addField("`Say`", "Make the bot say a message to the channel.");

        const helpEmbed = new Discord.MessageEmbed()
            .setTitle("`Help` Commands.")
            .addField("`help`", "Gives you the list of commands you can use.")
            .addField("`logissue`", "Sends your message into the log so you can report issues that I dont see in testing.\n**Aliases:** log")
            .addField("`support`", "Sends a link to the server where you can get support.");

        const infoEmbed = new Discord.MessageEmbed()
            .setTitle("`Information` Commands.")
            .addField("`calculate`", "Allows you to calculate simple math problems with `+, -, x, or /`\n**Aliases:** calc")
            .addField("`ping`", "Gives the bots ping from you to the bot back to you.")
            .addField("`servers`", "Shows a more accurate and nicer counter of the bots server count.")
            .addField("`social`", "Displays social media in an embed and bot invite.")
            .addField("`suggest`", "Displays your message as a suggestion for whatever channel your in.")
            .addField("`uptime`", "Shows how long the bot has been online for.\n**Aliases:** up")
            .addField("`version`", "Shows the bots current version and whats new.\n**Aliases:** ver")
            .addField("`vote`", "Creates a poll in the current channel for people to vote on something.")
            .addField("`website`", "Sends a link to the official website.\n**Aliases:** web");

        const moderationEmbed = new Discord.MessageEmbed()
            .setTitle("`Moderation` Commands.")
            .addField("`ban`", "Bans a member from the server.")
            .addField("`kick`", "Kicks a member from the server.")
            .addField("`mute` `WIP`", "Mutes a member in the server.")
            .addField("`nickname`", "Changes a members nickname in a server.\n**Aliases:** nick")
            .addField("`nuke`", "Clones a channel and deletes the old one.\n**Aliases:** bomb")
            .addField("`purge`", "Purges messages within a channel.")
            .addField("`slowmode`", "Changes slowmode of current channel\n**Aliases:** slow")
            .addField("`unban`", "Unbans a member from the server.")
            .addField("`unmute` `WIP`", "Unmutes a member in a server.")
            .addField("`warn`", "Warns a user and gives them a role to track their warnings.");

        if (!args[0]) return message.channel.send(sectionsEmbed);
        if (args[0] == "information") return message.channel.send(infoEmbed);
        else if (args[0] == "fun") return message.channel.send(funEmbed);
        else if (args[0] == "moderation") return message.channel.send(moderationEmbed);
        else if (args[0] == "help") return message.channel.send(helpEmbed);
        else if (args[0] == "devonly") return message.channel.send(devOnlyEmbed);
        else if (args[0] == "database") return message.channel.send(databaseEmbed);

        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};
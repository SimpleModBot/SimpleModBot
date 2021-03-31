const Discord = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Sends a list of all the commands',
    async execute(message, args, client) {

        const sectionEmbed = new Discord.MessageEmbed()
            .setTitle("Bot Help Sections")
            .setDescription("Use //help (sectionName) to access another section.\nSections: \n**database** \n**devonly** \n**fun** \n**help** \n**information** \n**moderation**")
            .addField("Database Commands", "Commands that interact with the database.")
            .addField("DevOnly Commands", "Commands that are only for developers.")
            .addField("Fun Commands", "Commands that all users can use that are for fun.")
            .addField("Help Commands", "Commands That are used for help with this bot.")
            .addField("Information Commands", "Commands that return some information.")
            .addField("Moderation Commands", "Commands that are for moderation within a server.").setFooter(client.user.tag, client.user.displayAvatarURL());

        const infoEmbed = new Discord.MessageEmbed()
            .setTitle("Information Commands.")
            .addField("`Calc`", "Allows you to calculate simple math problems with `+, -, x, or /`")
            .addField("`Ping`", "Gives the bots ping from you to the bot back to you.")
            .addField("`Servers`", "Shows a more accurate and nicer counter of the bots server count.")
            .addField("`Social`", "Displays social media in an embed and bot invite.")
            .addField("`Suggest`", "Displays your message as a suggestion for whatever channel your in.")
            .addField("`Uptime`", "Shows how long the bot has been online for.")
            .addField("`Vote`", "Creates a poll in the current channel for people to vote on something.")
            .addField("`Website`", "Sends a link to the official website.");

        const funEmbed = new Discord.MessageEmbed()
            .setTitle("`Fun` Commands.")
            .addField("`Avatar`", "Returns a users avatar.")
            .addField("`Hug`", "Gives you or the mentioned member a hug :)")
            .addField("`Meme`", "Returns a Meme to the channel.")
            .addField("`Nickname`", "Changes a members nickname in a server.")
            .addField("`RockPaperScissors`", "Plays a game of rock paper scissors with the user!")
            .addField("`Say`", "Make the bot say a message to the channel.");

        const moderationEmbed = new Discord.MessageEmbed()
            .setTitle("Moderation Commands.")
            .addField("`Ban`", "Bans a member from the server.")
            .addField("`Kick`", "Kicks a member from the server.")
            .addField("`Mute` `WIP`", "Mutes a member in the server.")
            .addField("`Nuke`", "Clones a channel and deletes the old one.")
            .addField("`Purge`", "Purges messages within a channel.")
            .addField("`Slowmode`", "Changes slowmode of current channel")
            .addField("`Unban`", "Unbans a member from the server.")
            .addField("`Unmute` `WIP`", "Unmutes a member in a server.")
            .addField("`Warn`", "Warns a user and gives them a role to track their warnings.");

        const helpEmbed = new Discord.MessageEmbed()
            .setTitle("Help Commands.")
            .addField("`help`", "Gives you the list of commands you can use.")
            .addField("`Log`", "Sends your message into the log so you can report issues that I dont see in testing.")
            .addField("`Support`", "Sends a link to the server where you can get support.");

        const devOnlyEmbed = new Discord.MessageEmbed()
            .setTitle("Developer Only Commands.")
            .addField("`Blacklist`", "Blacklists a user form interacting with the bot");
        
        const databaseEmbed = new Discord.MessageEmbed()
            .setTitle("Database Commands")
            .addField("`Level`", "shows you or the mentioned users current level in the server.")
            .addField("`Edit`", "Edits the mentioned users xp or level.")
            .addField("`Leaderboard`", "Shows the servers leaderboard.")
            .addField("`Blacklist`", "Blacklists a user from interacting with the bot.\nWarnings: `DevOnly command! do not attempt to use unless you are a dev!`");

        if (!args[0]) return message.channel.send(sectionEmbed);
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
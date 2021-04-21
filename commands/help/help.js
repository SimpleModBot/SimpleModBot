const Discord = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Sends a list of all the commands',
    async execute(message, args, client) {

        const sectionsEmbed = new Discord.MessageEmbed()
            .setTitle("Bot Help Pages")
            .setDescription("Use //help (sectionName) to access another section.")
            .addField("`database` Commands", "Commands that interact with the database.")
            .addField("`devOnly` Commands", "Commands that are only for developers.")
            .addField("`fun` Commands", "Commands that all users can use that are for fun.")
            .addField("`help` Commands", "Commands That are used for help with this bot.")
            .addField("`information` Commands", "Commands that return some information.")
            .addField("`moderation` Commands", "Commands that are for moderation within a server.")
            .setColor("#5b0aff")
            .setFooter(client.user.tag, client.user.displayAvatarURL({ dynamic: true }));

        const databaseEmbed = new Discord.MessageEmbed()
            .setTitle("`Database` Commands")
            .addField("`afk`", "Makes the user AFK until they send a message\n**Aliases:** away")
            .addField("`edit`", "Edits the mentioned users xp or level.")
            .addField("`leaderboard`", "Shows the servers leaderboard.\n**Aliases:** leaders")
            .addField("`level`", "shows you or the mentioned users current level in the server.")
            .setColor("#0afaff");

        const devOnlyEmbed = new Discord.MessageEmbed()
            .setTitle("`Developer Only` Commands.")
            .addField("`blacklist`", "Blacklists a user form interacting with the bot")
            .addField("`reload`", "Reloads a command\n**Aliases:** re")
            .setColor("#000000");

<<<<<<< HEAD
        const emojiEmbed = new Discord.MessageEmbed()
            .setTitle("`Emoji` Commands.")
            .addField("`4k`", "Sends an emoji of a 4K graphics plate.")
            .addField("`announce`", "Sends an emoji of a megaphone + your message.")
            .addField("`blobchain`", "Sends a blobchain of 1-7 randomly.")
            .addField("`catblush`", "Sends an emoji of a cat blushing.")
            .addField("`dogwave`", "Sends an emoji of a dog waving.")
            .addField("`duck`", "Sends an emoji of a duck.")
            .addField("`eyeshake`", "Sends an emoji of eyes shaking,")
            .addField("`gay`", "Sends an emoji of the text GAY + a down arrow.")
            .addField("`kek`", "Sends an emoji of a laughing face or `kek`.")
            .addField("`nou`", "Sends an emoji of a rainbow reverse card.")
            .addField("`pingblob`", "Sends an emoji of a blob holding a ping.")
            .addField("`popcat`", "Sends an emoji of popcat.")
            .addField("`rgbdance`", "Sends an emoji of a rainbow dance.")
            .addField("`this`", "Sends an emoji with an arrow pointing up.")
            .addField("`wheeze`", "Sends a laughing emoji.")
            .setColor("#ff4df2");
        
        const eventEmbed = new Discord.MessageEmbed()
            .setTitle("`Event`s")
            .addField("`message`", "Does something whenever a user sends a message.")
            .addField("`ready`", "Does something whenever the bot comes online.")
            .setColor("RANDOM");
        
=======
>>>>>>> parent of 95f60a0 (much)
        const funEmbed = new Discord.MessageEmbed()
            .setTitle("`Fun` Commands.")
            .addField("`avatar`", "Returns a users avatar.")
            .addField("`duck`", "Returns an emoji of a duck.")
            .addField("`hug`", "Gives you or the mentioned member a hug :)")
            .addField("`meme`", "Returns a Meme to the channel.")
            .addField("`rockpaperscissors`", "Plays a game of rock paper scissors with the user!\n**Aliases:** rps")
            .addField("`say`", "Make the bot say a message to the channel.")
            .addField("`this`", "Returns an emoji with an arrow pointing up.")
            .setColor("#2eff0a");

        const helpEmbed = new Discord.MessageEmbed()
            .setTitle("`Help` Commands.")
            .addField("`help`", "Gives you the list of commands you can use.")
            .addField("`logissue`", "Sends your message into the log so you can report issues that I dont see in testing.\n**Aliases:** log")
            .addField("`support`", "Sends a link to the server where you can get support.")
            .setColor("#ff820a");

        const infoEmbed = new Discord.MessageEmbed()
            .setTitle("`Information` Commands.")
            .addField("`calculate`", "Allows you to calculate simple math problems with `+, -, x, or /`\n**Aliases:** calc")
            .addField("`invite`", "Show a link to the bots invite page.\n**Aliases:** inv")
            .addField("`ping`", "Gives the bots ping from you to the bot back to you.")
            .addField("`servers`", "Shows the amount of servers the bot is in, the amount of members the bot has, and the amount of members in this server.\n**Aliases:** members\nservermembers")
            .addField("`social`", "Displays social media in an embed and bot invite.")
            .addField("`suggest`", "Displays your message as a suggestion for whatever channel your in.")
            .addField("`uptime`", "Shows how long the bot has been online for.\n**Aliases:** up")
            .addField("`version`", "Shows the bots current version and whats new.\n**Aliases:** ver")
            .addField("`vote`", "Creates a poll in the current channel for people to vote on something.\n**Aliases:** poll")
            .addField("`website`", "Sends a link to the official website.\n**Aliases:** web")
            .setColor("#000000");

        const moderationEmbed = new Discord.MessageEmbed()
            .setTitle("`Moderation` Commands.")
            .addField("`ban`", "Bans a member from the server.")
            .addField("`kick`", "Kicks a member from the server.")
            .addField("`mute`", "Mutes a member in the server.")
            .addField("`nickname`", "Changes a members nickname in a server.\n**Aliases:** nick")
            .addField("`nuke`", "Clones a channel and deletes the old one.\n**Aliases:** bomb")
            .addField("`purge`", "Purges messages within a channel.")
            .addField("`slowmode`", "Changes slowmode of current channel\n**Aliases:** slow")
            .addField("`unban`", "Unbans a member from the server.")
            .addField("`unmute`", "Unmutes a member in a server.")
            .addField("`warn`", "Warns a user and gives them a role to track their warnings.")
            .setColor("#ffef0a");

        const secretsEmbed = new Discord.MessageEmbed()
            .setTitle("`Secrets` of the bot...")
            .setDescription("How did you find this? This has been abandoned for a long time..")
            .addField("`geo`", "If a message contains `geo` anywhere surrounded by whatever.. It will say a message, BUT.. Only if you are in the creators Guild.. https://discord.gg/26NtPVvNCU")
            .addField("`hamburger`", "If a user uses the command `//burger` the bot will say something..")
            .addField("**Message Destruction**", "This message will automatically delete itself in 20 seconds to preserve the secrets.")
            .setColor("#ff0a0a");

        if (!args[0]) return message.channel.send(sectionsEmbed);
<<<<<<< HEAD
        if (args[0] == "database") return message.channel.send(databaseEmbed);
        else if (args[0] == "devonly") return message.channel.send(devOnlyEmbed);
        else if (args[0] == "emoji") return message.channel.send(emojiEmbed);
        else if (args[0] == "event") return message.channel.send(eventEmbed);
=======
        if (args[0] == "information") return message.channel.send(infoEmbed);
>>>>>>> parent of 95f60a0 (much)
        else if (args[0] == "fun") return message.channel.send(funEmbed);
        else if (args[0] == "moderation") return message.channel.send(moderationEmbed);
        else if (args[0] == "help") return message.channel.send(helpEmbed);
        else if (args[0] == "devonly") return message.channel.send(devOnlyEmbed);
        else if (args[0] == "database") return message.channel.send(databaseEmbed);
        else if (args[0] == "secrets") {
            message.channel.send("I didn't think anyone would find this.. yet here we are..")
                .then((msg) => { msg.delete({ timeout: 3000 }) });
            setTimeout(() => {
                message.channel.send("Anyway.. I'll give you my secrets, hold on..")
                    .then((msg) => { msg.delete({ timeout: 5000 }); })
            }, 2500)
            setTimeout(() => {
                message.channel.send(secretsEmbed)
                    .then((msg) => { msg.delete({ timeout: 20000 }); })
            }, 10000);
        };

        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete();
        }
    },
};
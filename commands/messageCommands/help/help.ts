const Discord = require("discord.js");
const { MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: 'help',
    cooldown: 30,
    DMU: true,
    description: 'Sends a list of all the commands',
    async execute(message, args, data, client) {
        const infoEmbed = new Discord.MessageEmbed()
            .setTitle("Help Information")
            .setDescription("This page will show all information that I feel will be needed for some people through the pages.")
            .addField("At the bottom of this message there will be two buttons.", "If you click the buttons you will be sent to a new page.")
            .addField("Some commands have an `alias`/`aliases` tag.", "An alias is another way to execute the same command but with a different word making it easier or more comfortable to use")
            .addField("Some commands have a `DMU` tag.", "The DMU tag means you can use it in DMS instead of a server if you want.\n**Currently not working due to changes in DJSV13!**")
            .setFooter("Please note that this bot is not perfect and has many issues but is constantly in developement! Thank you for choosing SMB!")
            .setTimestamp()
            .setColor("GREY");

        const databaseEmbed = new Discord.MessageEmbed()
            .setTitle("`Database` Commands")
            .addField("`cc-create`", "Creates a custom command.", true)
            .addField("`cc-delete`", "Deletes a custom command.\n**Aliases:** `cc-remove`", true)
            .addField("`cc-list`", "Shows all the servers custom commands.", true)
            .addField("`config`", "Changes the servers database config.", true)
            .addField("`edit`", "Edits the mentioned users xp or level.", true)
            .addField("`leaderboard`", "Shows the servers leaderboard.\n**Aliases:** `leaders`", true)
            .addField("`level`", "shows you or the mentioned users current level in the server.", true)
            .setColor("#0afaff");

        const devOnlyEmbed = new Discord.MessageEmbed()
            .setTitle("`Developer Only` Commands.")
            .addField("`blacklist`", "Blacklists a user from interacting with the bot.\n**DMU:** `true`", true)
            .addField("`dev-embed`", "Creates an embed if you are a developer.\n**Aliases:** `de`", true)
            .addField("`dev-partnerembed`", "Creates a partnership embed if you are a developer.\n**Aliases:** `dpe`", true)
            .addField("`dev-rulesembed`", "Creates a rules embed if you are a developer.\n**Aliases:** `dre`", true)
            .addField("`eco-edit`", "Edits the mentioned users economy cash.\n**Aliases:** `ee`", true)
            .addField("`emit`", "Fakes an event for testing.", true)
            .addField("`eval`", "Evaluates given code.\n**Aliases:** `e`\n**DMU:** `true`", true)
            .addField("`leaveserver`", "Leaves the server when given a valid ID.\n**Aliases:** `leaveguild`, `ls`\n**DMU:** `true`", true)
            .addField("`reload`", "Reloads a command.\n**Aliases:** `re`\n**DMU:** `true`", true)
            .addField("`restart`", "Restarts the bot, mainly to reload events.\n**Aliases:** `res`\n**DMU:** `true`", true)
            .addField("`serverlist`", "Logs all the clients servers to the console.\n**Aliases:** `sl`\n**DMU:** `true`", true)
            .addField("`shutdown`", "Shuts down the bot.\n**Aliases:** `sd`\n**DMU:** `true`", true)
            .addField("`test`", "For testing a command that is probably not going to exist if it fails.", true)
            .addField("`xp-edit`", "Edits the mentioned users job experience.", true)
            .setColor("GREY");

        const economyEmbed = new Discord.MessageEmbed()
            .setTitle("`Economy` Commands. **WIP**")
            .addField("`balance`", "Shows your or a mentioned users balance.", true)
            .addField("`beg`", "Makes you beg for money.\n**Success Chance:** about %40-%60", true)
            .addField("`buy`", "Buys an item from the shop using an item ID and amount.", true)
            .addField("`daily`", "Claims your daily cash award.", true)
            .addField("`inventory`", "Shows you your current item inventory.\n**Aliases:** `inv`", true)
            .addField("`jobs`", "Shows a list of all the current jobs and allows you to apply for one.", true)
            .addField("`pay`", "Pays the mentioned user the amount you say if you have the money.", true)
            .addField("`shop`", "Shows the page of the shop you want to see.", true)
            .addField("`work`", "Works if you have a job.", true)
            .setFooter("If you discover any errors or are having issues with these or any other commands please use the \"logissue\"/\"log\" command.")
            .setColor("GREEN");

        const emojiEmbed = new Discord.MessageEmbed()
            .setTitle("`Emoji` Commands.")
            .addField("`4k`", "Sends an emoji of a 4K graphics plate.", true)
            .addField("`announce`", "Sends an emoji of a megaphone + your message.", true)
            .addField("`blobchain`", "Sends a blobchain of 1-7 randomly.", true)
            .addField("`catblush`", "Sends an emoji of a cat blushing.", true)
            .addField("`dogwave`", "Sends an emoji of a dog waving.", true)
            .addField("`duck`", "Sends an emoji of a duck.", true)
            .addField("`emojify`", "Turns your text into emojis.", true)
            .addField("`emojisteal`", "Steals the emojis you put in your message.", true)
            .addField("`eyeshake`", "Sends an emoji of eyes shaking,", true)
            .addField("`gay`", "Sends an emoji of the text GAY + a down arrow.", true)
            .addField("`kek`", "Sends an emoji of a laughing face or `kek`.", true)
            .addField("`nou`", "Sends an emoji of a rainbow reverse card.", true)
            .addField("`pingblob`", "Sends an emoji of a blob holding a ping.", true)
            .addField("`popcat`", "Sends an emoji of popcat.", true)
            .addField("`rgbdance`", "Sends an emoji of a rainbow dance.", true)
            .addField("`this`", "Sends an emoji with an arrow pointing up.", true)
            .addField("`wheeze`", "Sends a laughing emoji.", true)
            .setColor("#ff4df2");

        const eventEmbed = new Discord.MessageEmbed()
            .setTitle("`Event`s")
            .addField("`clickButton`", "Does something when someone clicks a button.", true)
            .addField("`guildCreate`", "When the bot joins a server it does something.", true)
            .addField("`guildDelete`", "When the bot leaves a server it does something.", true)
            .addField("`guildMemberAdd`", "Does an action when a member joins a server it's in.", true)
            .addField("`messageCreate`", "Does something whenever a user sends a message.", true)
            .addField("`messageDelete`", "Does something when a user deletes a message.", true)
            .addField("`ready`", "Does something whenever the bot comes online.", true)
            .setColor("GREY");

        const funEmbed = new Discord.MessageEmbed()
            .setTitle("`Fun` Commands.")
            .addField("`ascii`", "Makes ascii text.\n**DMU:** `true`", true)
            .addField("`dontclick`", "Don't click the button..", true)
            .addField("`flip`", "Flips your message.\n**DMU:** `true`", true)
            .addField("`gayrate`", "Sends an embed saying how gay you or the mentioned member is.\n**Aliases:** `howgay`", true)
            .addField("`hug`", "Gives you or the mentioned member a hug :)", true)
            .addField("`pp`", "Returns the mentioned users \"pp size\"\n**Aliases**: ppsize", true)
            .addField("`say`", "Make the bot say a message to the channel.", true)
            .addField("`simprate`", "Returns a simprate for the mentioned user.\n**Aliases**: howsimp", true)
            .addField("`sudo`", "Sends a message \"as the mentioned user\".", true)
            .addField("`uselessbutton`", "Sends a useless button.\n**Aliases:** `ub`", true)
            .setColor("#2eff0a");

        const gamesEmbed = new Discord.MessageEmbed()
            .setTitle("`Game` Commands.")
            .addField("`8ball`", "Asks the magic 8-ball your question.\n**Aliases:** `8`, `ball`", true)
            .addField("`chat`", "Interacts with the chat bot via the command.\n**Aliases:** `talk`", true)
            .addField("`fishing`", "Sends an invite for a game of fishing if in a VC.", true)
            .addField("`rockpaperscissors`", "Plays a game of rock paper scissors with the user!\n**Aliases:** `rps`", true)
            .addField("`shuffle`", "Plays a game where you have to unshuffle the word it gives you.", true)
            .addField("`tictactoe`", "Plays a game of tic tac toe with the mentioned user.\n**Aliases:** `ttt`", true)
            .addField("`youtubetogether`", "Sends an invite for a youtube together game if in a VC.\n**Aliases:** `ytt`", true)
            .setColor("RANDOM");

        const helpEmbed = new Discord.MessageEmbed()
            .setTitle("`Help` Commands.")
            .addField("`help`", "Gives you the list of commands you can use.", true)
            .addField("`logissue`", "Sends your message into the log so you can report issues that I dont see in testing.\n**Aliases:** `log`\n**DMU:** `true`", true)
            .addField("`support`", "Sends a link to the server where you can get support.\n**DMU:** `true`", true)
            .setColor("#ff820a");

        const information1Embed = new Discord.MessageEmbed()
            .setTitle("`Information` 1 Commands.")
            .addField("`calculator`", "A calculator using `discord-buttons`.\n**Aliases:** `calc`\n**DMU:** `true`", true)
            .addField("`google`", "Searches google for your message content.\n**Aliases:** `search`", true)
            .addField("`invite`", "Show a link to the bots invite page.\n**Aliases:** `inv`\n**DMU:** `true`", true)
            .addField("`ping`", "Gives the bots ping from you to the bot back to you.\n**DMU:** `true`", true)
            .addField("`social`", "Displays social media in an embed and bot invite.\n**DMU:** `true`", true)
            .addField("`suggest`", "Displays your message as a suggestion for whatever channel your in.", true)
            .addField("`uptime`", "Shows how long the bot has been online for.\n**Aliases:** `up`", true)
            .addField("`website`", "Sends a link to the official website.\n**Aliases:** `web`\n**DMU:** `true`", true)
            .setColor("GREY");

        const information2Embed = new Discord.MessageEmbed()
            .setTitle("`information` 2 Commands.")
            .addField("`botinfo`", "Returns information about the bots client.\n**Aliases:** clientinfo", true)
            .addField("`covid`", "Returns information about the provided country for covid.\n**DMU:** `true`", true)
            .addField("`docs`", "Returns a search query in discord.js docs.\n**Aliases:** `d`", true)
            .addField("`serverinfo`", "Returns information for the server.", true)
            .addField("`servers`", "Shows the amount of servers the bot is in, the amount of members the bot has, and the amount of members in this server.\n**Aliases:** members\nservermembers", true)
            .addField("`systeminfo`", "Returns information for the bots host system.\n**Aliases:** `system`", true)
            .addField("`weather`", "Searches the weather for the location stated.", true)
            .addField("`whois`", "Returns information about you or the mentioned user.\n**Aliases:** `userinfo`", true)
            .setColor("GREY");

        const moderationEmbed = new Discord.MessageEmbed()
            .setTitle("`Moderation` Commands.")
            .addField("`ban`", "Bans a member from the server.", true)
            .addField("`kick`", "Kicks a member from the server.", true)
            .addField("`nickname`", "Changes a members nickname in a server.\n**Aliases:** `nick`", true)
            .addField("`nuke`", "Clones a channel and deletes the old one.\n**Aliases:** `bomb`", true)
            .addField("`purge`", "Purges messages within a channel.", true)
            .addField("`slowmode`", "Changes slowmode of current channel\n**Aliases:** `slow`", true)
            .addField("`unban`", "Unbans a member from the server.", true)
            .addField("`verify`", "Gives the user a member role if the server has one set.", true)
            .setColor("#ffef0a");

        const embedEmbed = new Discord.MessageEmbed()
            .setTitle("`embed` Commands.")
            .setDescription("Only usable as the owner of the server.", true)
            .addField("`partnerembed`", "Creates a partnership embed with a username and an ad in that order.\n**Aliases:** `pe`", true)
            .addField("`rulesembed`", "Creates a rules embed for the server.", true)
            .setColor("RANDOM");

        const imageEmbed = new Discord.MessageEmbed()
            .setTitle("`image` Commands.")
            .addField("`avatar`", "Returns a users avatar.", true)
            .addField("`blur`", "Blurs the mentioned users avatar.", true)
            .addField("`bonk`", "Bonks the mentioned user.", true)
            .addField("`delete`", "Shows the mentioned user in a delete file screen.", true)
            .addField("`meme`", "Sends a meme from certain subreddits.", true)
            .addField("`slap`", "Slaps a mentioned user.", true)
            .addField("`webss`", "Sends a screenshot of a website.\n**Aliases:** wss", true)
            .setColor("GREEN");

        const nsfwEmbed = new Discord.MessageEmbed()
            .setTitle('`nsfw` Commands.')
            .setDescription('Only usable in a channel marked as NSFW!')
            .addField("`waifu`", "Sends a random waifu image from reddit.", true)
            .setColor('RED');

        const randomEmbed = new Discord.MessageEmbed()
            .setTitle('`random` Commands.')
            .addField("`No Commands :)`", "Yeah, theres no commands here.. Come back later maybe?", true)
            .setColor("RANDOM");

        let position = 0;
        const pages = [infoEmbed, databaseEmbed, devOnlyEmbed, economyEmbed, emojiEmbed, eventEmbed, funEmbed, gamesEmbed, helpEmbed,
            information1Embed, information2Embed, moderationEmbed, embedEmbed, imageEmbed, nsfwEmbed, randomEmbed];

        const previous = new MessageButton()
            .setLabel("")
            .setStyle("SECONDARY")
            .setEmoji("◀️")
            .setCustomId("previous");

        const next = new MessageButton()
            .setLabel("")
            .setStyle("SECONDARY")
            .setEmoji("▶️")
            .setCustomId("next");

        const paginationbuttons = new MessageActionRow()
            .addComponents(previous, next);

        const endedP = new MessageButton()
            .setLabel("")
            .setStyle("SECONDARY")
            .setEmoji("◀️")
            .setCustomId("previous")
            .setDisabled();

        const endedN = new MessageButton()
            .setLabel("")
            .setStyle("SECONDARY")
            .setEmoji("▶️")
            .setCustomId("previous")
            .setDisabled();

        const endedbuttons = new MessageActionRow()
            .addComponents(endedP, endedN);

        function checkPos() {
            previous.setDisabled(position === 0 ? true : false);
            next.setDisabled(position === Object.keys(pages).length - 1 ? true : false);
        };

        checkPos();
        const pagination = await message.channel.send({
            embeds: [pages[position]],
            components: [paginationbuttons]
        });

        const collector = pagination.componentCollector(
            {
                componentType: "BUTTON",
                time: 60000
            });

        collector.on("collect", async (button) => {
            if (button.user.id === message.author.id) {
                if (button.customId === "previous" && position > 0) position = position - 1;
                if (button.customId === "next" && position < pages.length - 1) position = position + 1;
                checkPos();
                await pagination.edit({
                    content: "\u200b",
                    embeds: [pages[position]],
                    components: [paginationbuttons]
                });
                await button.deferUpdate();
            } else {
                button.reply({ content: `Hey, ${button.user.username}, these buttons aren't for you to use!`, ephemeral: true });
            };
        });

        collector.on("end", async (collected) => {
            await pagination.edit(`Timed out.`, {
                content: "\u200b",
                embeds: [pages[position]],
                components: [endedbuttons]
            });
        });
        
        if (message.channel.type !== 'dm') {
            if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
                message.delete();
            };
        };
    },
};
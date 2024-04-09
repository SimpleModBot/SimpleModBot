import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionsBitField } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("bans a user")
        .addUserOption(o => o
            .setName("user")
            .setDescription("the user to be banned")
            .setRequired(true))
        .addStringOption(o => o
            .setName("reason")
            .setDescription("reason why the user is banned"))
        ,

        async exec(interaction: ChatInputCommandInteraction) {
            const user = interaction.options.getUser("user");
            const reason = interaction.options.getString("reason") ?? "No reason provided";

            // gotta check >~<
            if(!interaction.inGuild()) {
                interaction.reply({ content: "You must be in a guild to use this command." });
            } else if(interaction.guild?.members.cache.get(user!.id) === undefined) {
                interaction.reply({ content: "This user is not in the guild!", ephemeral: true });
            } else if(!interaction.memberPermissions.has(PermissionsBitField.Flags.BanMembers)) {
                interaction.reply({ content: "You don't have the required permissions to use this command!", ephemeral: true });
            } else if(!interaction.guild.members.cache.get(user!.id)!.bannable) {
                interaction.reply({ content: "I can't ban that member!", ephemeral: true });
            } else {
                interaction.guild.members.cache.get(user!.id)!.ban({ reason: reason });

                interaction.reply({ embeds: [
                    new EmbedBuilder()
                        .setTitle(`Banned ${user!.username}`)
                        .setDescription(`Reason: ${reason}`)
                        .setTimestamp()
                        .setColor("Red")
                    ] });
            }
        }
}
import { SlashCommandBuilder } from "discord.js";

export default interface Command {
    permissions?: string[];
    devOnly?: boolean;
    data: SlashCommandBuilder;
    exec(...args: any): any;
}
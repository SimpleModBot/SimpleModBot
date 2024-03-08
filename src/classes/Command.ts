import { SlashCommandBuilder } from "discord.js";

export default interface Command {
    devOnly?: boolean;
    data: SlashCommandBuilder;
    exec(...args: any): any;
}
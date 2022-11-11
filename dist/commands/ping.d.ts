import { SlashCommandBuilder } from '@discordjs/builders';
import type { CommandInteraction } from 'discord.js';
export declare const getData: SlashCommandBuilder;
export default class PingCommand {
    constructor(interaction: CommandInteraction);
    protected interaction: CommandInteraction;
    execute(): Promise<void>;
}
//# sourceMappingURL=ping.d.ts.map
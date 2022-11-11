import { SlashCommandBuilder } from '@discordjs/builders';
import type { CommandInteraction } from 'discord.js';
import GiveawayService from '../services/giveawayService';
export declare const getData: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
export default class CreateCommand {
    constructor(interaction: CommandInteraction);
    protected interaction: CommandInteraction;
    protected giveawayService: GiveawayService;
    execute(): Promise<void>;
}
//# sourceMappingURL=create.d.ts.map
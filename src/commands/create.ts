import {SlashCommandBuilder} from '@discordjs/builders'
import type {CommandInteraction} from 'discord.js'
import GiveawayService from '../services/giveawayService';
import type {Giveaway} from "../models/Giveaway";

export const getData = new SlashCommandBuilder()
    .setName('create')
    .setDescription('Creates a giveaway')
    .addStringOption(option => option.setName('duration').setDescription("How long the giveaway will last. ex 1h, 1d, 1w").setRequired(true))
    .addIntegerOption(option => option.setName('winners').setDescription("How many people can win.").setRequired(true))
    .addStringOption(option => option.setName('prize').setDescription("What the prize is").setRequired(true))


export default class CreateCommand {

    constructor(interaction: CommandInteraction) {
        this.interaction = interaction;
        this.giveawayService = new GiveawayService();
    }

    protected interaction: CommandInteraction;
    protected giveawayService: GiveawayService;

    public async execute(): Promise<void> {
        const duration = this.interaction.options.getString('duration');
        const winners = this.interaction.options.getInteger('winners');
        const prize = this.interaction.options.getString('prize');
        console.log(duration, winners, prize);
        const message = await this.interaction.channel?.send("This is some fancy giveaway message that is pretty");
        if (message && this.interaction.guildId) {
            const giveaway: Giveaway = {
                stillRunning: true,
                messageId: message.id,
                guildId: this.interaction.guildId,
                description: prize ?? '',
                possibleNumberOfWinners: winners ?? 0
            }
            await this.giveawayService.createGiveaway(giveaway);
        }


        // await this.interaction.reply("Haven't made it that far m8");
    }
}

